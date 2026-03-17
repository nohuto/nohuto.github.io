import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOCS_SITE_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(DOCS_SITE_DIR, 'src', 'content', 'docs');

const DOC_REPO_ORDER = [
  'win-config',
  'regkit',
  'win-registry',
  'nvapi-cli',
  'app-tools',
  'game-tools',
];

const WIN_CONFIG_REPO_URL = trimRepoUrl(
  process.env.WIN_CONFIG_REPO_URL || 'https://github.com/nohuto/win-config'
);
const WIN_REGISTRY_REPO_URL = trimRepoUrl(
  process.env.WIN_REGISTRY_REPO_URL || 'https://github.com/nohuto/win-registry'
);
const NVAPI_CLI_REPO_URL = trimRepoUrl(
  process.env.NVAPI_CLI_REPO_URL || 'https://github.com/nohuto/nvapi-cli'
);
const REGKIT_REPO_URL = trimRepoUrl(
  process.env.REGKIT_REPO_URL || 'https://github.com/nohuto/regkit'
);
const APP_TOOLS_REPO_URL = trimRepoUrl(
  process.env.APP_TOOLS_REPO_URL || 'https://github.com/nohuto/app-tools'
);
const GAME_TOOLS_REPO_URL = trimRepoUrl(
  process.env.GAME_TOOLS_REPO_URL || 'https://github.com/nohuto/game-tools'
);

const CATEGORY_LABELS = {
  affinities: 'Affinities',
  cleanup: 'Cleanup',
  misc: 'Misc',
  network: 'Network',
  nvidia: 'NVIDIA',
  peripheral: 'Peripheral',
  policies: 'Policies',
  power: 'Power',
  privacy: 'Privacy',
  security: 'Security',
  system: 'System',
  visibility: 'Visibility',
};

const CATEGORY_ORDER = [
  'system',
  'visibility',
  'peripheral',
  'power',
  'privacy',
  'network',
  'nvidia',
  'cleanup',
  'misc',
  'policies',
  'security',
  'affinities',
];

const entries = [];
const winConfigAnchorRoutes = new Map();
const winConfigFirstOptionRoutes = new Map();
let firstWinConfigRoute = '';
const winRegistryAnchorRoutes = new Map();
const winRegistryGuideRoutes = new Map();
let firstWinRegistrySectionRoute = '';
let firstWinRegistryGuideRoute = '';
const repoContexts = new Map();

for (const repoName of ['nvapi-cli', 'regkit', 'app-tools', 'game-tools']) {
  repoContexts.set(repoName, createRepoContext());
}

main();

function main() {
  const winConfigDir = resolveRepoDirectory('win-config', WIN_CONFIG_REPO_URL);
  const winRegistryDir = resolveRepoDirectory('win-registry', WIN_REGISTRY_REPO_URL);
  const nvapiCliDir = resolveRepoDirectory('nvapi-cli', NVAPI_CLI_REPO_URL);
  const regkitDir = resolveRepoDirectory('regkit', REGKIT_REPO_URL);
  const appToolsDir = resolveRepoDirectory('app-tools', APP_TOOLS_REPO_URL);
  const gameToolsDir = resolveRepoDirectory('game-tools', GAME_TOOLS_REPO_URL);

  assertDirectory(winConfigDir, 'win-config');
  assertDirectory(winRegistryDir, 'win-registry');
  assertDirectory(nvapiCliDir, 'nvapi-cli');
  assertDirectory(regkitDir, 'regkit');
  assertDirectory(appToolsDir, 'app-tools');
  assertDirectory(gameToolsDir, 'game-tools');

  resetContentDir();
  generateRootOverview();

  const winConfigStats = generateWinConfig(winConfigDir);
  const winRegistryStats = generateWinRegistry(winRegistryDir);
  const nvapiCliStats = generateNvapiCli(nvapiCliDir);
  const regkitStats = generateRegkit(regkitDir);
  const appToolsStats = generateAppTools(appToolsDir);
  const gameToolsStats = generateGameTools(gameToolsDir);
  const sectionIndexPages = generateSectionIndexes();

  rewriteGeneratedLinks();
  writeEntries();

  console.log(
    `[sync-docs] Generated ${entries.length} pages (` +
      `win-config options: ${winConfigStats.optionPages}, ` +
      `win-registry sections: ${winRegistryStats.sectionPages}, ` +
      `win-registry guides: ${winRegistryStats.guidePages}, ` +
      `nvapi-cli sections: ${nvapiCliStats.sectionPages}, ` +
      `nvapi-cli docs: ${nvapiCliStats.docPages}, ` +
      `regkit sections: ${regkitStats.sectionPages}, ` +
      `app-tools sections: ${appToolsStats.sectionPages}, ` +
      `app-tools docs: ${appToolsStats.docPages}, ` +
      `game-tools sections: ${gameToolsStats.sectionPages}, ` +
      `game-tools docs: ${gameToolsStats.docPages}, ` +
      `section indexes: ${sectionIndexPages}).`
  );
}

function generateRootOverview() {
  const repoNames = [...DOC_REPO_ORDER];

  addEntry({
    relativePath: 'index.md',
    route: '/docs/',
    title: 'Overview',
    description:
      `Documentation generated from ${repoNames.join(', ')}.`,
    editUrl: false,
    sidebarHidden: true,
    body: ['- [directory](/docs/directory/)', ...repoNames.map((repoName) => `- [${repoName}](/docs/${repoName}/)`)].join(
      '\n'
    ),
  });
}

function trimRepoUrl(url) {
  return url.replace(/\/+$/, '');
}

function assertDirectory(dirPath, label) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    throw new Error(`Missing repository path for ${label}: ${dirPath}`);
  }
}

function resetContentDir() {
  fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

function generateWinConfig(winConfigDir) {
  const descFiles = findDescFiles(winConfigDir);
  const sorted = sortCategories(descFiles);

  let optionPages = 0;

  for (const { category, filePath } of sorted) {
    const categoryLabel = CATEGORY_LABELS[category] || toTitleCase(category);

    const raw = readText(filePath);
    const sections = splitByHeadingLevel(raw, 1).filter((section) => section.heading);

    if (sections.length === 0) {
      continue;
    }

    const sectionSlugSet = new Set();
    const githubAnchorCounts = new Map();

    for (let index = 0; index < sections.length; index += 1) {
      const section = sections[index];
      const routeSlug = uniqueSlug(slugify(section.heading), sectionSlugSet);
      const route = `/docs/win-config/${category}/${routeSlug}/`;
      const githubAnchor = uniqueGitHubAnchor(section.heading, githubAnchorCounts);
      const title = normalizeWinConfigTitle(section.heading);

      if (index === 0) {
        winConfigFirstOptionRoutes.set(category, route);
        if (!firstWinConfigRoute) {
          firstWinConfigRoute = route;
        }
      }

      winConfigAnchorRoutes.set(`${category}|${githubAnchor}`, route);
      optionPages += 1;

      addEntry({
        relativePath: `win-config/${category}/${routeSlug}.md`,
        route,
        title,
        description: `${categoryLabel} option documentation from win-config.`,
        editUrl: `${WIN_CONFIG_REPO_URL}/blob/main/${category}/desc.md#${githubAnchor}`,
        sidebarOrder: index + 1,
        body: section.lines.join('\n').trim(),
      });
    }
  }

  return { optionPages };
}

function generateWinRegistry(winRegistryDir) {
  const readmePath = path.join(winRegistryDir, 'README.md');
  const guideDir = path.join(winRegistryDir, 'guide');
  const readmeFileOrder = buildReadmeMarkdownFileOrder(winRegistryDir);

  const sectionCount = generateWinRegistrySections(readmePath);
  const guideCount = generateWinRegistryGuides(guideDir, readmeFileOrder);

  return { sectionPages: sectionCount, guidePages: guideCount };
}

function generateNvapiCli(repoDir) {
  const sectionPages = generateReadmeSections({
    repoKey: 'nvapi-cli',
    repoDir,
    repoUrl: NVAPI_CLI_REPO_URL,
    sectionLevel: 2,
    outputDirectory: 'nvapi-cli/sections',
    routeDirectory: '/docs/nvapi-cli/sections/',
  });

  const docPages = generateRepoMarkdownDirectory({
    repoKey: 'nvapi-cli',
    repoDir,
    repoUrl: NVAPI_CLI_REPO_URL,
    sourceDirectory: 'docs',
    outputDirectory: 'nvapi-cli/docs',
    routeDirectory: '/docs/nvapi-cli/docs/',
  });

  return { sectionPages, docPages };
}

function generateRegkit(repoDir) {
  const sectionPages = generateReadmeSections({
    repoKey: 'regkit',
    repoDir,
    repoUrl: REGKIT_REPO_URL,
    sectionLevel: 2,
    outputDirectory: 'regkit/sections',
    routeDirectory: '/docs/regkit/sections/',
  });

  return { sectionPages };
}

function generateAppTools(repoDir) {
  const sectionPages = generateReadmeSections({
    repoKey: 'app-tools',
    repoDir,
    repoUrl: APP_TOOLS_REPO_URL,
    sectionLevel: 2,
    outputDirectory: 'app-tools/sections',
    routeDirectory: '/docs/app-tools/sections/',
  });

  const docPages = generateRepoMarkdownFromRoot({
    repoKey: 'app-tools',
    repoDir,
    repoUrl: APP_TOOLS_REPO_URL,
    outputDirectory: 'app-tools/docs',
    routeDirectory: '/docs/app-tools/docs/',
    collapseSingleDescLeaf: true,
  });

  return { sectionPages, docPages };
}

function generateGameTools(repoDir) {
  const sectionPages = generateReadmeSections({
    repoKey: 'game-tools',
    repoDir,
    repoUrl: GAME_TOOLS_REPO_URL,
    sectionLevel: 2,
    outputDirectory: 'game-tools/sections',
    routeDirectory: '/docs/game-tools/sections/',
  });

  const docPages = generateRepoMarkdownFromRoot({
    repoKey: 'game-tools',
    repoDir,
    repoUrl: GAME_TOOLS_REPO_URL,
    outputDirectory: 'game-tools/docs',
    routeDirectory: '/docs/game-tools/docs/',
    collapseSingleDescLeaf: true,
  });

  return { sectionPages, docPages };
}

function resolveRepoDirectory(repoName, repoUrl) {
  const candidatePaths = [
    path.resolve(DOCS_SITE_DIR, '..', repoName),
    path.resolve(DOCS_SITE_DIR, '..', 'sources', repoName),
    path.resolve(DOCS_SITE_DIR, '..', '..', repoName),
    path.resolve(DOCS_SITE_DIR, '..', '..', '..', repoName),
    path.resolve(DOCS_SITE_DIR, '..', '_tmp_repos', repoName),
    path.resolve(DOCS_SITE_DIR, '..', '..', '_tmp_repos', repoName),
    path.resolve(DOCS_SITE_DIR, '..', '..', '..', '_tmp_repos', repoName),
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) return candidate;
  }

  const cacheDir = path.join(DOCS_SITE_DIR, '.cache', 'repos', repoName);
  if (fs.existsSync(cacheDir) && fs.statSync(cacheDir).isDirectory()) return cacheDir;

  try {
    const normalizedRepoUrl = (repoUrl || '').replace(/\/+$/, '');
    if (!normalizedRepoUrl) return '';

    fs.mkdirSync(path.dirname(cacheDir), { recursive: true });
    const cloneUrl = normalizedRepoUrl.endsWith('.git') ? normalizedRepoUrl : `${normalizedRepoUrl}.git`;
    execFileSync('git', ['clone', '--depth', '1', cloneUrl, cacheDir], {
      stdio: 'pipe',
      cwd: DOCS_SITE_DIR,
    });
    return cacheDir;
  } catch {
    return '';
  }
}

function generateReadmeSections({
  repoKey,
  repoDir,
  repoUrl,
  sectionLevel,
  outputDirectory,
  routeDirectory,
}) {
  const context = ensureRepoContext(repoKey);
  const readmePath = path.join(repoDir, 'README.md');
  if (!fs.existsSync(readmePath)) return 0;
  const raw = readText(readmePath);
  const sections = splitByHeadingLevel(raw, sectionLevel);
  const headingCounts = new Map();
  const routeSlugSet = new Set();
  const titleMatch = raw.match(/^#\s+(.+)$/m);
  const readmeTitle = titleMatch ? titleMatch[1].trim() : toTitleCase(repoKey);

  let sectionPages = 0;

  for (const section of sections) {
    const isOverview = section.heading === null;
    const heading = isOverview ? 'Overview' : section.heading;
    const body = isOverview
      ? stripFirstH1(section.lines.join('\n')).trim()
      : section.lines.join('\n').trim();

    if (!body && isOverview) {
      continue;
    }

    const anchor = isOverview ? '' : uniqueGitHubAnchor(heading, headingCounts);
    const routeSlug = isOverview ? 'overview' : uniqueSlug(slugify(heading), routeSlugSet);
    const route = `${routeDirectory}${routeSlug}/`;

    if (!context.firstRoute) {
      context.firstRoute = route;
    }
    if (anchor) {
      context.anchorRoutes.set(anchor, route);
    }

    addEntry({
      relativePath: `${outputDirectory}/${routeSlug}.md`,
      route,
      title: heading,
      description:
        heading === 'Overview'
          ? `${readmeTitle} overview generated from README.`
          : `Generated from ${repoKey} README section: ${heading}.`,
      editUrl: anchor ? `${repoUrl}/blob/main/README.md#${anchor}` : `${repoUrl}/blob/main/README.md`,
      sidebarOrder: sectionPages + 1,
      body,
    });

    sectionPages += 1;
  }

  return sectionPages;
}

function generateRepoMarkdownDirectory({
  repoKey,
  repoDir,
  repoUrl,
  sourceDirectory,
  outputDirectory,
  routeDirectory,
}) {
  const context = ensureRepoContext(repoKey);
  const sourceDirPath = path.join(repoDir, sourceDirectory);
  if (!fs.existsSync(sourceDirPath)) return 0;

  const readmeFileOrder = buildReadmeMarkdownFileOrder(repoDir);
  const markdownFiles = sortMarkdownFilesBySourceOrder(
    listMarkdownFiles(sourceDirPath),
    readmeFileOrder,
    sourceDirectory
  );
  let generated = 0;

  for (const fileRelativePath of markdownFiles) {
    const raw = readText(path.join(sourceDirPath, fileRelativePath));
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1].trim()
      : toTitleCase(path.posix.basename(fileRelativePath, '.md'));
    const body = stripFirstH1(raw).trim();

    const normalizedRelativePath = fileRelativePath.replace(/\\/g, '/');
    const routeSlug = normalizedRelativePath
      .replace(/\.md$/i, '')
      .split('/')
      .map((segment) => slugify(segment))
      .join('/');
    const route = `${routeDirectory}${routeSlug}/`;
    const relativePath = `${outputDirectory}/${routeSlug}.md`;

    if (!context.firstRoute) {
      context.firstRoute = route;
    }
    context.fileRoutes.set(`${sourceDirectory}/${normalizedRelativePath}`.toLowerCase(), route);

    addEntry({
      relativePath,
      route,
      title,
      description: `Generated from ${repoKey} file: ${sourceDirectory}/${normalizedRelativePath}.`,
      editUrl: `${repoUrl}/blob/main/${sourceDirectory}/${normalizedRelativePath}`,
      sidebarOrder: generated + 1,
      body,
    });

    generated += 1;
  }

  return generated;
}

function generateRepoMarkdownFromRoot({
  repoKey,
  repoDir,
  repoUrl,
  outputDirectory,
  routeDirectory,
  collapseSingleDescLeaf = false,
}) {
  const context = ensureRepoContext(repoKey);
  const readmeFileOrder = buildReadmeMarkdownFileOrder(repoDir);
  const markdownFiles = sortMarkdownFilesBySourceOrder(listMarkdownFiles(repoDir), readmeFileOrder);
  const collapseDescLeaf =
    collapseSingleDescLeaf || repoKey === 'app-tools' || repoKey === 'game-tools';
  let generated = 0;

  for (const fileRelativePath of markdownFiles) {
    const normalizedRelativePath = fileRelativePath.replace(/\\/g, '/');
    const normalizedLower = normalizedRelativePath.toLowerCase();

    // README is parsed separately into sections. Skip repo meta/docs noise.
    if (normalizedLower === 'readme.md') continue;
    if (normalizedLower.startsWith('.github/')) continue;

    const raw = readText(path.join(repoDir, normalizedRelativePath));
    if (!raw.trim()) continue;

    const isDescLeaf = normalizedLower.endsWith('/desc.md');
    const descDirectory = path.posix.dirname(normalizedRelativePath);
    const collapsedDescTitle =
      collapseDescLeaf && isDescLeaf && descDirectory !== '.'
        ? toTitleCase(path.posix.basename(descDirectory))
        : '';
    const titleMatch = raw.match(/^(?:\uFEFF)?#\s+(.+)$/m);
    const title = collapsedDescTitle
      || (titleMatch ? titleMatch[1].trim() : toTitleCase(path.posix.basename(normalizedRelativePath, '.md')));
    const strippedBody = stripFirstH1(raw).trim();
    const body = strippedBody || raw.trim();

    const routeInput = collapseDescLeaf && isDescLeaf && descDirectory !== '.'
      ? descDirectory
      : normalizedRelativePath.replace(/\.md$/i, '');
    const routeSlug = routeInput
      .split('/')
      .map((segment) => slugify(segment))
      .join('/');
    const route = `${routeDirectory}${routeSlug}/`;
    const relativePath = `${outputDirectory}/${routeSlug}.md`;

    if (!context.firstRoute) {
      context.firstRoute = route;
    }
    context.fileRoutes.set(normalizedLower, route);

    addEntry({
      relativePath,
      route,
      title,
      description: `Generated from ${repoKey} file: ${normalizedRelativePath}.`,
      editUrl: `${repoUrl}/blob/main/${normalizedRelativePath}`,
      sidebarOrder: generated + 1,
      body,
    });

    generated += 1;
  }

  return generated;
}

function generateSectionIndexes() {
  const existingPaths = new Set(entries.map((entry) => entry.relativePath));
  const allDirectories = collectGeneratedDirectories(entries);
  const sortedDirectories = [...allDirectories].sort((a, b) => {
    const depthDiff = a.split('/').length - b.split('/').length;
    if (depthDiff !== 0) return depthDiff;
    return a.localeCompare(b);
  });

  let generated = 0;

  for (const directory of sortedDirectories) {
    const indexPath = `${directory}/index.md`;
    if (existingPaths.has(indexPath)) continue;

    const children = getDirectoryChildren(directory, allDirectories);
    if (children.length === 0) continue;

    const route = `/docs/${directory}/`;
    const title = 'Overview';
    const directoryLabel = getDirectoryLabel(directory);
    const body = buildDirectoryListingMarkdown(children);

    addEntry({
      relativePath: indexPath,
      route,
      title,
      description: `Auto-generated overview for ${directoryLabel}.`,
      editUrl: false,
      sidebarOrder: getDirectorySidebarOrder(directory),
      sidebarHidden: true,
      body,
    });

    existingPaths.add(indexPath);
    generated += 1;

    if (directory === 'win-config') {
      firstWinConfigRoute = route;
    }

    const winConfigCategoryMatch = directory.match(/^win-config\/([^/]+)$/);
    if (winConfigCategoryMatch) {
      winConfigFirstOptionRoutes.set(winConfigCategoryMatch[1], route);
    }

    if (directory === 'win-registry') {
      firstWinRegistrySectionRoute = route;
      if (!firstWinRegistryGuideRoute) {
        firstWinRegistryGuideRoute = route;
      }
    }
  }

  return generated;
}

function generateWinRegistrySections(readmePath) {
  const raw = readText(readmePath);
  const groups = splitWinRegistrySections(raw);

  let sidebarOrder = 1;
  let sectionPages = 0;

  for (const group of groups) {
    const groupRoute = `/docs/win-registry/sections/${group.slug}/`;
    if (!firstWinRegistrySectionRoute) {
      firstWinRegistrySectionRoute = groupRoute;
    }

    if (group.anchor) {
      winRegistryAnchorRoutes.set(group.anchor, groupRoute);
    }

    addEntry({
      relativePath: `win-registry/sections/${group.slug}/index.md`,
      route: groupRoute,
      title: group.title,
      description: `Generated from win-registry README section: ${group.title}.`,
      editUrl: group.anchor
        ? `${WIN_REGISTRY_REPO_URL}/blob/main/README.md#${group.anchor}`
        : `${WIN_REGISTRY_REPO_URL}/blob/main/README.md`,
      sidebarOrder,
      body: group.body,
    });

    sidebarOrder += 1;
    sectionPages += 1;

    const childSlugSet = new Set();
    for (const section of group.sections) {
      const sectionSlug = uniqueSlug(slugify(section.heading), childSlugSet);
      const sectionRoute = `${groupRoute}${sectionSlug}/`;

      if (section.anchor) {
        winRegistryAnchorRoutes.set(section.anchor, sectionRoute);
      }

      addEntry({
        relativePath: `win-registry/sections/${group.slug}/${sectionSlug}.md`,
        route: sectionRoute,
        title: section.heading,
        description: `Generated from win-registry README section: ${section.heading}.`,
        editUrl: section.anchor
          ? `${WIN_REGISTRY_REPO_URL}/blob/main/README.md#${section.anchor}`
          : `${WIN_REGISTRY_REPO_URL}/blob/main/README.md`,
        sidebarOrder,
        body: section.body,
      });

      sidebarOrder += 1;
      sectionPages += 1;
    }
  }

  return sectionPages;
}

function splitWinRegistrySections(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const headingRegex = /^(#{1,2})\s+(.+?)\s*$/;
  const headingCounts = new Map();
  const headingEntries = [];

  let inFence = false;
  let fenceChar = '';
  let current = null;

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceChar = marker;
      } else if (marker === fenceChar) {
        inFence = false;
        fenceChar = '';
      }
    }

    const headingMatch = !inFence ? line.match(headingRegex) : null;
    if (headingMatch) {
      const level = headingMatch[1].length;
      const heading = headingMatch[2].trim();
      const anchor = uniqueGitHubAnchor(heading, headingCounts);

      if (current) {
        headingEntries.push(current);
      }

      current = { level, heading, anchor, lines: [] };
      continue;
    }

    if (!current) continue;
    current.lines.push(line);
  }

  if (current) {
    headingEntries.push(current);
  }

  const groups = [];
  const groupSlugSet = new Set();
  let currentGroup = null;

  for (const entry of headingEntries) {
    if (entry.level === 1) {
      const isFirstGroup = groups.length === 0;
      const groupTitle = isFirstGroup ? 'Overview' : entry.heading;
      const baseSlug = isFirstGroup ? 'overview' : slugify(entry.heading);
      const groupSlug = uniqueSlug(baseSlug, groupSlugSet);

      currentGroup = {
        title: groupTitle,
        slug: groupSlug,
        anchor: entry.anchor,
        body: entry.lines.join('\n').trim(),
        sections: [],
      };
      groups.push(currentGroup);
      continue;
    }

    if (!currentGroup) {
      currentGroup = {
        title: 'Overview',
        slug: uniqueSlug('overview', groupSlugSet),
        anchor: '',
        body: '',
        sections: [],
      };
      groups.push(currentGroup);
    }

    currentGroup.sections.push({
      heading: entry.heading,
      anchor: entry.anchor,
      body: entry.lines.join('\n').trim(),
    });
  }

  return groups;
}

function generateWinRegistryGuides(guideDir, readmeFileOrder) {
  if (!fs.existsSync(guideDir)) return 0;

  const guideFiles = sortMarkdownFilesBySourceOrder(
    fs.readdirSync(guideDir).filter((name) => name.toLowerCase().endsWith('.md')),
    readmeFileOrder,
    'guide'
  );

  let guidePages = 0;

  for (const fileName of guideFiles) {
    const filePath = path.join(guideDir, fileName);
    const raw = readText(filePath);
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : toTitleCase(fileName.replace(/\.md$/i, ''));
    const body = stripFirstH1(raw).trim();

    const slug = slugify(fileName.replace(/\.md$/i, ''));
    const route = `/docs/win-registry/guides/${slug}/`;
    if (!firstWinRegistryGuideRoute) {
      firstWinRegistryGuideRoute = route;
    }

    winRegistryGuideRoutes.set(fileName.toLowerCase(), route);

    addEntry({
      relativePath: `win-registry/guides/${slug}.md`,
      route,
      title,
      description: `Generated from win-registry guide: ${fileName}.`,
      editUrl: `${WIN_REGISTRY_REPO_URL}/blob/main/guide/${fileName}`,
      sidebarOrder: guidePages + 1,
      body,
    });

    guidePages += 1;
  }

  return guidePages;
}

function rewriteGeneratedLinks() {
  for (const entry of entries) {
    entry.body = rewriteMarkdownLinks(entry.body);
  }
}

function collectGeneratedDirectories(allEntries) {
  const directories = new Set();

  for (const entry of allEntries) {
    let dir = path.posix.dirname(entry.relativePath);
    while (dir && dir !== '.') {
      directories.add(dir);
      dir = path.posix.dirname(dir);
    }
  }

  return directories;
}

function getDirectoryChildren(directory, allDirectories) {
  const directPages = entries
    .filter((entry) => path.posix.dirname(entry.relativePath) === directory)
    .filter((entry) => path.posix.basename(entry.relativePath).toLowerCase() !== 'index.md')
    .map((entry) => ({
      type: 'page',
      label: entry.title,
      href: entry.route,
      order: Number.isInteger(entry.sidebarOrder) ? entry.sidebarOrder : Number.MAX_SAFE_INTEGER,
    }));

  const childDirectoryNames = new Set();
  const prefix = `${directory}/`;
  for (const candidate of allDirectories) {
    if (!candidate.startsWith(prefix)) continue;
    const remainder = candidate.slice(prefix.length);
    if (!remainder || remainder.includes('/')) continue;
    childDirectoryNames.add(remainder);
  }

  const directDirectories = [...childDirectoryNames].map((child) => ({
    type: 'directory',
    segment: child,
    label: getDirectoryLabel(`${directory}/${child}`),
    href: `/docs/${directory}/${child}/`,
    order: getDirectorySidebarOrder(`${directory}/${child}`),
  }));

  const merged = [...directDirectories, ...directPages];
  merged.sort((a, b) => sortDirectoryChild(directory, a, b));
  return merged;
}

function sortDirectoryChild(parentDirectory, a, b) {
  if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;

  if (a.type === 'directory' && b.type === 'directory') {
    if (a.order !== b.order) return a.order - b.order;

    if (parentDirectory === 'win-config') {
      const aRank = categorySortRank(a.segment);
      const bRank = categorySortRank(b.segment);
      if (aRank !== bRank) return aRank - bRank;
    }

    if (parentDirectory === 'win-registry') {
      const aRank = registrySortRank(a.segment);
      const bRank = registrySortRank(b.segment);
      if (aRank !== bRank) return aRank - bRank;
    }

    return a.label.localeCompare(b.label);
  }

  if (a.order !== b.order) return a.order - b.order;
  return a.label.localeCompare(b.label);
}

function getDirectorySidebarOrder(directory) {
  const explicitOrder = getExplicitDirectorySidebarOrder(directory);
  if (Number.isInteger(explicitOrder)) {
    return explicitOrder;
  }

  const prefix = `${directory}/`;
  let minOrder = Number.MAX_SAFE_INTEGER;

  for (const entry of entries) {
    if (!entry.relativePath.startsWith(prefix)) continue;
    if (path.posix.basename(entry.relativePath).toLowerCase() === 'index.md') continue;
    if (!Number.isInteger(entry.sidebarOrder)) continue;
    if (entry.sidebarOrder < minOrder) minOrder = entry.sidebarOrder;
  }

  return minOrder === Number.MAX_SAFE_INTEGER ? 0 : minOrder;
}

function getExplicitDirectorySidebarOrder(directory) {
  const winConfigCategoryMatch = directory.match(/^win-config\/([^/]+)$/);
  if (winConfigCategoryMatch) {
    const rank = categorySortRank(winConfigCategoryMatch[1]);
    if (rank !== Number.MAX_SAFE_INTEGER) {
      return rank + 1;
    }
  }

  if (directory === 'win-registry/sections') return 1;
  if (directory === 'win-registry/guides') return 2;

  return null;
}

function categorySortRank(segment) {
  const rank = CATEGORY_ORDER.indexOf(segment);
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
}

function registrySortRank(segment) {
  if (segment === 'sections') return 0;
  if (segment === 'guides') return 1;
  return Number.MAX_SAFE_INTEGER;
}

function getDirectoryLabel(directory) {
  const segment = directory.split('/').pop() || directory;

  if (segment === 'win-config') return 'win-config';
  if (segment === 'win-registry') return 'win-registry';
  if (segment === 'nvapi-cli') return 'nvapi-cli';
  if (segment === 'regkit') return 'regkit';
  if (segment === 'app-tools') return 'app-tools';
  if (segment === 'game-tools') return 'game-tools';
  if (segment === 'sections') return 'Sections';
  if (segment === 'guides') return 'Guides';
  if (segment === 'docs') return 'Docs';
  if (CATEGORY_LABELS[segment]) return CATEGORY_LABELS[segment];

  return toTitleCase(segment);
}

function buildDirectoryListingMarkdown(children) {
  const lines = [];

  for (const child of children) {
    lines.push(`- [${child.label}](${child.href})`);
  }

  return lines.join('\n');
}

function rewriteMarkdownLinks(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  let inFence = false;
  let fenceChar = '';

  const rewritten = lines.map((line) => {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceChar = marker;
      } else if (marker === fenceChar) {
        inFence = false;
        fenceChar = '';
      }
      return line;
    }

    if (/^\s*>\s*https?:\/\/github\.com\//i.test(line)) {
      return rewriteBareGitHubUrls(line);
    }

    if (inFence) return line;

    const withMarkdownLinks = line.replace(/(\]\()([^\)]+)(\))/g, (_, prefix, rawUrl, suffix) => {
      const rewrittenUrl = rewriteLinkTarget(rawUrl.trim());
      return `${prefix}${rewrittenUrl}${suffix}`;
    });

    return rewriteBareGitHubUrls(withMarkdownLinks);
  });

  return rewritten.join('\n');
}

function rewriteBareGitHubUrls(line) {
  return line.replace(/https?:\/\/github\.com\/[^\s<>()]+/gi, (rawUrl) => {
    return rewriteLinkTarget(rawUrl);
  });
}

function rewriteLinkTarget(rawUrl) {
  if (!/^https?:\/\//i.test(rawUrl)) return rawUrl;

  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return rawUrl;
  }

  if (parsed.hostname.toLowerCase() !== 'github.com') return rawUrl;

  const pathName = parsed.pathname.replace(/\/+$/, '');
  const hash = normalizeAnchor(parsed.hash);

  const winConfigMatch = pathName.match(/^\/[^/]+\/win-config\/blob\/main\/([^/]+)\/desc\.md$/i);
  if (winConfigMatch) {
    const category = winConfigMatch[1].toLowerCase();
    if (hash) {
      const route = winConfigAnchorRoutes.get(`${category}|${hash}`);
      if (route) return route;
      return rawUrl;
    }
    return winConfigFirstOptionRoutes.get(category) || rawUrl;
  }

  const isWinConfigRoot = /^\/[^/]+\/win-config$/i.test(pathName);
  if (isWinConfigRoot) {
    return firstWinConfigRoute || rawUrl;
  }

  const winRegistryGuideMatch = pathName.match(/^\/[^/]+\/win-registry\/blob\/main\/guide\/([^/]+\.md)$/i);
  if (winRegistryGuideMatch) {
    const route = winRegistryGuideRoutes.get(winRegistryGuideMatch[1].toLowerCase());
    return route || rawUrl;
  }

  const isWinRegistryRoot = /^\/[^/]+\/win-registry$/i.test(pathName);
  const isWinRegistryReadme = /^\/[^/]+\/win-registry\/blob\/main\/README\.md$/i.test(pathName);

  if (isWinRegistryRoot || isWinRegistryReadme) {
    if (!hash) {
      return firstWinRegistrySectionRoute || firstWinRegistryGuideRoute || rawUrl;
    }
    const route = winRegistryAnchorRoutes.get(hash);
    return route || rawUrl;
  }

  const extraRepoRoute = rewriteExtraRepoLink(pathName, hash);
  if (extraRepoRoute) {
    return extraRepoRoute;
  }

  return rawUrl;
}

function rewriteExtraRepoLink(pathName, hash) {
  const repoMatch = pathName.match(/^\/[^/]+\/([^/]+)(?:\/(.+))?$/i);
  if (!repoMatch) return '';

  const repoKey = repoMatch[1].toLowerCase();
  if (repoKey === 'win-config' || repoKey === 'win-registry') return '';

  const context = getRepoContext(repoKey);
  if (!context) return '';

  const remainder = repoMatch[2] || '';
  if (!remainder) {
    if (!hash) return context.firstRoute;
    return context.anchorRoutes.get(hash) || '';
  }

  const readmeMatch = remainder.match(/^blob\/(main|master)\/README\.md$/i);
  if (readmeMatch) {
    if (!hash) return context.firstRoute;
    return context.anchorRoutes.get(hash) || '';
  }

  const blobMarkdownMatch = remainder.match(/^blob\/(main|master)\/(.+\.md)$/i);
  if (blobMarkdownMatch) {
    const fileRoute = context.fileRoutes.get(blobMarkdownMatch[2].toLowerCase());
    if (fileRoute) return hash ? `${fileRoute}#${hash}` : fileRoute;
    if (hash) {
      const anchorRoute = context.anchorRoutes.get(hash);
      if (anchorRoute) return anchorRoute;
    }
  }

  return '';
}

function normalizeAnchor(anchor) {
  if (!anchor) return '';
  let value = anchor.replace(/^#/, '').trim().toLowerCase();
  try {
    value = decodeURIComponent(value);
  } catch {
    // Ignore malformed URI encoding.
  }
  if (value.startsWith('user-content-')) {
    value = value.slice('user-content-'.length);
  }
  return value;
}

function addEntry({ relativePath, route, title, description, editUrl, sidebarOrder, sidebarHidden, body }) {
  entries.push({
    relativePath,
    route,
    title,
    description,
    editUrl,
    sidebarOrder,
    sidebarHidden: Boolean(sidebarHidden),
    body: body || '',
  });
}

function writeEntries() {
  const pathSet = new Set();
  const routeSet = new Set();

  const sorted = [...entries].sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  for (const entry of sorted) {
    if (pathSet.has(entry.relativePath)) {
      throw new Error(`Duplicate generated path: ${entry.relativePath}`);
    }
    if (routeSet.has(entry.route)) {
      throw new Error(`Duplicate generated route: ${entry.route}`);
    }
    pathSet.add(entry.relativePath);
    routeSet.add(entry.route);

    const targetPath = path.join(CONTENT_DIR, entry.relativePath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, buildMarkdown(entry), 'utf8');
  }
}

function buildMarkdown(entry) {
  const lines = [
    '---',
    `title: ${yamlString(entry.title)}`,
    `description: ${yamlString(entry.description)}`,
  ];

  if (entry.editUrl === false) {
    lines.push('editUrl: false');
  } else if (typeof entry.editUrl === 'string' && entry.editUrl.length > 0) {
    lines.push(`editUrl: ${yamlString(entry.editUrl)}`);
  }

  if (entry.sidebarHidden || Number.isInteger(entry.sidebarOrder)) {
    lines.push('sidebar:');
    if (entry.sidebarHidden) {
      lines.push('  hidden: true');
    }
    if (Number.isInteger(entry.sidebarOrder)) {
      lines.push(`  order: ${entry.sidebarOrder}`);
    }
  }

  lines.push('---');
  lines.push('');

  const body = entry.body.trimEnd();
  if (body.length > 0) {
    lines.push(body);
  }

  lines.push('');
  return lines.join('\n');
}

function yamlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function findDescFiles(rootDir) {
  const out = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const dirents = fs.readdirSync(current, { withFileTypes: true });

    for (const dirent of dirents) {
      const fullPath = path.join(current, dirent.name);
      if (dirent.isDirectory()) {
        if (dirent.name === '.git' || dirent.name === 'node_modules') continue;
        stack.push(fullPath);
      } else if (dirent.isFile() && dirent.name.toLowerCase() === 'desc.md') {
        const category = path.basename(path.dirname(fullPath)).toLowerCase();
        out.push({ category, filePath: fullPath });
      }
    }
  }

  return out;
}

function sortCategories(items) {
  const order = new Map(CATEGORY_ORDER.map((name, index) => [name, index]));

  return [...items].sort((a, b) => {
    const aRank = order.has(a.category) ? order.get(a.category) : Number.MAX_SAFE_INTEGER;
    const bRank = order.has(b.category) ? order.get(b.category) : Number.MAX_SAFE_INTEGER;

    if (aRank !== bRank) return aRank - bRank;
    return a.category.localeCompare(b.category);
  });
}

function splitByHeadingLevel(markdown, level) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  const headingPrefix = '#'.repeat(level);
  const headingRegex = new RegExp(`^${headingPrefix}\\s+(.+?)\\s*$`);

  let inFence = false;
  let fenceChar = '';
  let current = { heading: null, lines: [] };

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) {
        inFence = true;
        fenceChar = marker;
      } else if (marker === fenceChar) {
        inFence = false;
        fenceChar = '';
      }
    }

    const headingMatch = !inFence ? line.match(headingRegex) : null;
    if (headingMatch) {
      if (current.heading !== null || current.lines.length > 0) {
        sections.push(current);
      }

      current = { heading: headingMatch[1].trim(), lines: [] };
      continue;
    }

    current.lines.push(line);
  }

  if (current.heading !== null || current.lines.length > 0) {
    sections.push(current);
  }

  return sections;
}

function uniqueGitHubAnchor(heading, counts) {
  const base = githubAnchorSlug(heading) || 'section';
  const seen = counts.get(base) || 0;
  counts.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen}`;
}

function githubAnchorSlug(input) {
  const stripped = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\- ]/g, '')
    .replace(/ /g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return stripped;
}

function slugify(input) {
  const slug = input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  return slug || 'section';
}

function uniqueSlug(baseSlug, set) {
  let slug = baseSlug || 'section';
  let counter = 2;

  while (set.has(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  set.add(slug);
  return slug;
}

function stripFirstH1(markdown) {
  return markdown.replace(/^(?:\uFEFF)?#\s+.+\n?/m, '').trimStart();
}

function toTitleCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeWinConfigTitle(value) {
  const cleaned = value
    .replace(/^\s*(enable|disable)\s+/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return cleaned || value.trim();
}

function createRepoContext() {
  return {
    firstRoute: '',
    anchorRoutes: new Map(),
    fileRoutes: new Map(),
  };
}

function ensureRepoContext(repoKey) {
  if (!repoContexts.has(repoKey)) {
    repoContexts.set(repoKey, createRepoContext());
  }
  return repoContexts.get(repoKey);
}

function getRepoContext(repoKey) {
  const context = repoContexts.get(repoKey);
  if (!context) return null;

  if (!context.firstRoute && context.anchorRoutes.size === 0 && context.fileRoutes.size === 0) {
    return null;
  }

  return context;
}

function buildReadmeMarkdownFileOrder(repoDir) {
  const readmePath = path.join(repoDir, 'README.md');
  if (!fs.existsSync(readmePath)) return new Map();

  const raw = readText(readmePath);
  const order = new Map();
  const markdownLinkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  let index = 1;
  let match;

  while ((match = markdownLinkRegex.exec(raw)) !== null) {
    const href = match[1].trim().replace(/^<|>$/g, '');
    const targetPath = resolveReadmeMarkdownLink(href);
    if (!targetPath) continue;

    const key = targetPath.toLowerCase();
    if (!order.has(key)) {
      order.set(key, index);
      index += 1;
    }
  }

  return order;
}

function resolveReadmeMarkdownLink(href) {
  if (!href) return '';

  let target = href;

  if (/^https?:\/\//i.test(target)) {
    try {
      const url = new URL(target);
      const blobMatch = url.pathname.match(/\/blob\/[^/]+\/(.+)$/i);
      if (!blobMatch) return '';
      target = decodeURIComponent(blobMatch[1]);
    } catch {
      return '';
    }
  }

  target = target.split('#')[0].split('?')[0].trim();
  if (!target || target.startsWith('/')) return '';

  const normalized = path.posix.normalize(target.replace(/\\/g, '/').replace(/^\.\//, ''));
  if (normalized.startsWith('../') || !normalized.toLowerCase().endsWith('.md')) return '';
  return normalized;
}

function sortMarkdownFilesBySourceOrder(markdownFiles, sourceOrder, sourcePrefix = '') {
  const normalizedPrefix = sourcePrefix ? `${sourcePrefix.replace(/\\/g, '/').replace(/\/+$/, '')}/` : '';

  const rankFor = (fileRelativePath) => {
    const normalizedPath = fileRelativePath.replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase();
    const key = normalizedPrefix ? `${normalizedPrefix}${normalizedPath}` : normalizedPath;
    return sourceOrder.get(key) ?? Number.MAX_SAFE_INTEGER;
  };

  return [...markdownFiles].sort((a, b) => {
    const rankDiff = rankFor(a) - rankFor(b);
    if (rankDiff !== 0) return rankDiff;
    return a.localeCompare(b);
  });
}

function listMarkdownFiles(rootDir) {
  const out = [];
  const stack = [rootDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const dirents = fs.readdirSync(current, { withFileTypes: true });

    for (const dirent of dirents) {
      const fullPath = path.join(current, dirent.name);
      if (dirent.isDirectory()) {
        if (dirent.name === '.git' || dirent.name === 'node_modules') continue;
        stack.push(fullPath);
        continue;
      }

      if (!dirent.isFile() || !dirent.name.toLowerCase().endsWith('.md')) continue;
      const rel = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      out.push(rel);
    }
  }

  return out;
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
}
