// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightCodeblockFullscreen from 'starlight-codeblock-fullscreen';
import starlightImageZoom from 'starlight-image-zoom';
import starlightViewModes from 'starlight-view-modes';
import starlightLinksValidator from 'starlight-links-validator';

const sidebarRepos = ['win-config', 'regkit', 'nvapi-cli', 'app-tools', 'game-tools'];
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
        starlightViewModes({
          zenModeSettings: {
            displayOptions: {
              showHeader: false,
              showSidebar: false,
              showTableOfContents: true,
              showFooter: true,
            },
          },
        }),
        starlightScrollToTop({
          borderRadius: '0',
          threshold: 320,
          svgPath: 'M7 14l5-5 5 5 M7 19l5-5 5 5',
          svgStrokeWidth: 1.8,
        }),
        starlightCodeblockFullscreen(),
        starlightImageZoom(),
        starlightLinksValidator({
          exclude: ['https://www.noverse.dev/bin-diff.html'],
          failOnError: false,
          sameSitePolicy: 'validate',
        }),
      ],
      title: 'Noverse Docs',
      description:
        'Generated docs from win-config, regkit, nvapi-cli, app-tools, and game-tools.',
      favicon: '/logo.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nohuto' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/E2ybG4j9jU' },
      ],
      components: {
        Header: './src/components/starlight/Header.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Search: './src/components/starlight/Search.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        ThemeProvider: './src/components/starlight/ThemeProvider.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
      },
      customCss: ['./src/styles/rapide-overrides.css', './src/styles/doc-themes.css'],
      sidebar: sidebarRepos.map((repoName) => createSidebarRepoEntry(repoName)),
    }),
  ],
});

