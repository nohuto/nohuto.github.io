import fs from 'node:fs/promises';
import path from 'node:path';

export interface DirectoryRepo {
  repo: string;
  repoName: string;
  title: string;
  description: string;
  docsUrl: string;
  repoUrl: string;
  topics: string[];
}

export interface DocsDirectoryData {
  repos: DirectoryRepo[];
}

const DOCS_SITE_DIR = process.cwd();
const PROJECTS_HTML_PATH = path.resolve(DOCS_SITE_DIR, '..', 'projects.html');
const REPOS_JSON_PATH = path.resolve(DOCS_SITE_DIR, '..', 'main', 'data', 'repos.json');
const DOC_REPO_ORDER = ['win-config', 'regkit', 'win-registry', 'nvapi-cli', 'app-tools', 'game-tools'] as const;
const DOC_REPOS = new Set<string>(DOC_REPO_ORDER);
const DOC_REPO_RANK = new Map<string, number>(DOC_REPO_ORDER.map((repo, index) => [repo, index]));

interface ParsedProjectCard {
  repo: string;
  repoName: string;
  title: string;
  repoUrl: string;
  topics: string[];
}

export async function getDocsDirectoryData(): Promise<DocsDirectoryData> {
  const [projectsHtml, repoDescriptions] = await Promise.all([
    fs.readFile(PROJECTS_HTML_PATH, 'utf8'),
    readRepoDescriptions(),
  ]);

  const projectCards = parseProjectCards(projectsHtml)
    .filter((card) => DOC_REPOS.has(card.repoName))
    .sort((a, b) => (DOC_REPO_RANK.get(a.repoName) ?? Number.MAX_SAFE_INTEGER) - (DOC_REPO_RANK.get(b.repoName) ?? Number.MAX_SAFE_INTEGER));
  const repos = projectCards.map((card) => ({
    repo: card.repo,
    repoName: card.repoName,
    title: card.title || toTitleCase(card.repoName),
    description: repoDescriptions[card.repo] || 'No description available.',
    docsUrl: `/docs/${card.repoName}/`,
    repoUrl: card.repoUrl || `https://github.com/${card.repo}`,
    topics: card.topics.length ? card.topics : ['Uncategorized'],
  }));

  return { repos };
}

async function readRepoDescriptions(): Promise<Record<string, string>> {
  try {
    const raw = await fs.readFile(REPOS_JSON_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).map(([repo, description]) => [String(repo), String(description || '')])
    );
  } catch {
    return {};
  }
}

function parseProjectCards(html: string): ParsedProjectCard[] {
  const cards: ParsedProjectCard[] = [];
  const articleRegex = /<article\b[^>]*class="[^"]*\bproject-card\b[^"]*"[^>]*>[\s\S]*?<\/article>/gi;

  let articleMatch: RegExpExecArray | null;
  while ((articleMatch = articleRegex.exec(html)) !== null) {
    const cardHtml = articleMatch[0];
    const repo = extractAttribute(cardHtml, 'data-repo');
    const title = extractText(cardHtml, /<h3\b[^>]*class="[^"]*\bproject-title\b[^"]*"[^>]*>([\s\S]*?)<\/h3>/i);
    const repoUrl = extractAttribute(cardHtml, 'href');
    const tagsRaw = extractAttribute(cardHtml, 'data-tags');

    if (!repo || !title) continue;

    const repoName = repo.split('/').pop()?.trim();
    if (!repoName) continue;

    cards.push({
      repo,
      repoName,
      title: decodeHtmlEntities(title).trim(),
      repoUrl: repoUrl || `https://github.com/${repo}`,
      topics: parseTopics(tagsRaw),
    });
  }

  return cards;
}

function extractAttribute(html: string, attrName: string): string {
  const escaped = attrName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}="([^"]*)"`, 'i');
  const match = html.match(regex);
  return decodeHtmlEntities((match?.[1] || '').trim());
}

function extractText(html: string, regex: RegExp): string {
  const match = html.match(regex);
  return stripTags(match?.[1] || '');
}

function parseTopics(rawTags: string): string[] {
  return rawTags
    .split(',')
    .map((tag) => decodeHtmlEntities(tag).trim())
    .filter(Boolean);
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, '');
}

function decodeHtmlEntities(value: string): string {
  if (!value) return value;

  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
