// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightCodeblockFullscreen from 'starlight-codeblock-fullscreen';
import starlightImageZoom from 'starlight-image-zoom';
import starlightViewModes from 'starlight-view-modes';
import starlightLinksValidator from 'starlight-links-validator';
import { CATEGORY_LABELS } from './docs-constants.mjs';

const sidebarRepos = ['win-config', 'regkit', 'app-guides'];
const noverseDocsLabels = {
  name: 'noverse-docs-labels',
  hooks: {
    'config:setup'() {},
    'i18n:setup'({ injectTranslations }) {
      injectTranslations({
        en: {
          'tableOfContents.onThisPage': 'Table of Content',
        },
      });
    },
  },
};
const winConfigSidebarCategories = [
  'system',
  'visibility',
  'peripheral',
  'power',
  'privacy',
  'network',
  'security',
  'nvidia',
  'misc',
  'policies',
  'affinities',
];

function createSidebarRepoEntry(repoName) {
  if (repoName === 'win-config') {
    return {
      label: repoName,
      collapsed: true,
      items: winConfigSidebarCategories.map((category) => ({
        label: CATEGORY_LABELS[category] || category,
        collapsed: true,
        autogenerate: { directory: `win-config/${category}`, collapsed: true },
      })),
    };
  }

  if (repoName === 'regkit') {
    return {
      label: repoName,
      collapsed: true,
      items: [
        { label: 'Overview', slug: 'regkit/overview' },
        {
          label: 'Guides',
          collapsed: true,
          autogenerate: { directory: 'regkit/guides', collapsed: true },
        },
      ],
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
        noverseDocsLabels,
        starlightThemeRapide(),
        starlightViewModes({
          zenModeSettings: {
            displayOptions: {
              showHeader: false,
              showSidebar: false,
              showTableOfContents: false,
              showFooter: false,
            },
          },
        }),
        starlightScrollToTop({
          borderRadius: '0',
          svgPath: 'M7 14l5-5 5 5 M7 19l5-5 5 5',
          svgStrokeWidth: 1.8,
        }),
        starlightCodeblockFullscreen(),
        starlightImageZoom(),
        starlightLinksValidator({
          exclude: ['https://www.noverse.dev/bin-diff'],
          failOnError: false,
          sameSitePolicy: 'validate',
        }),
      ],
      title: 'Noverse Docs',
      description:
        'Generated docs from win-config, regkit, and app-guides.',
      favicon: '/logo.png',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/nohuto' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.noverse.dev' },
      ],
      components: {
        Header: './src/components/starlight/Header.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Search: './src/components/starlight/Search.astro',
        Sidebar: './src/components/starlight/Sidebar.astro',
        MobileMenuFooter: './src/components/starlight/MobileMenuFooter.astro',
        ThemeProvider: './src/components/starlight/ThemeProvider.astro',
        ThemeSelect: './src/components/starlight/ThemeSelect.astro',
      },
      customCss: ['./src/styles/rapide-overrides.css', './src/styles/doc-themes.css'],
      expressiveCode: {
        styleOverrides: {
          borderRadius: 'var(--nv-ui-radius)',
          frames: {
            editorTabBorderRadius: 'var(--nv-ui-radius)',
          },
          textMarkers: {
            inlineMarkerBorderRadius: 'var(--nv-ui-radius)',
          },
        },
      },
      sidebar: sidebarRepos.map((repoName) => createSidebarRepoEntry(repoName)),
    }),
  ],
});

