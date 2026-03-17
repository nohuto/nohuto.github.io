// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightCodeblockFullscreen from 'starlight-codeblock-fullscreen';

const sidebarRepos = ['win-config', 'regkit', 'win-registry', 'nvapi-cli', 'app-tools', 'game-tools'];
const winConfigSidebarCategories = [
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

function createSidebarRepoEntry(repoName) {
  if (repoName === 'win-config') {
    return {
      label: repoName,
      collapsed: true,
      items: winConfigSidebarCategories.map((category) => ({
        label: category,
        collapsed: true,
        autogenerate: { directory: `win-config/${category}`, collapsed: true },
      })),
    };
  }

  return {
    label: repoName,
    collapsed: true,
    autogenerate: { directory: repoName, collapsed: true },
  };
}

export default defineConfig({
  site: 'https://www.noverse.dev',
  base: '/docs',
  integrations: [
    starlight({
      plugins: [
        starlightThemeRapide(),
        starlightScrollToTop(),
        starlightCodeblockFullscreen(),
      ],
      title: 'Noverse Docs',
      description:
        'Generated docs from win-config, regkit, win-registry, nvapi-cli, app-tools, and game-tools.',
      favicon: '/logo.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nohuto' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/E2ybG4j9jU' },
      ],
      components: {
        Header: './src/components/starlight/Header.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
      },
      customCss: ['./src/styles/rapide-overrides.css'],
      sidebar: sidebarRepos.map((repoName) => createSidebarRepoEntry(repoName)),
    }),
  ],
});
