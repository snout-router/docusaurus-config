const {readFileSync} = require('fs')
const {resolve} = require('path')
const {linkDocblocks, transpileCodeblocks} = require('remark-typescript-tools')

module.exports = {
  createConfig
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
function createConfig (options) {
  const {
    footerLinks = [],
    navbarItems = [],
    redirects = [],
    rootPath,
    title,
  } = options

  const {
    description,
    homepage,
    name,
    repository,
  } = JSON.parse(readFileSync(resolve(rootPath, '../package.json')))

  const orgUrl = new URL(homepage)
  const baseUrl = orgUrl.pathname.endsWith('/') ? orgUrl.pathname : `${orgUrl.pathname}/`
  orgUrl.pathname = '/'
  const orgUrlNoSlash = orgUrl.toString().slice(0, -1)

  const githubUrl = `https://github.com/${repository}`
  const [organizationName, projectName] = repository.split('/')

  return {
    title,
    tagline: description,
    url: orgUrlNoSlash,
    baseUrl,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    organizationName,
    projectName,
    i18n: {
      defaultLocale: 'en',
      locales: ['en'],
      localeConfigs: {
        en: {
          label: 'English',
          direction: 'ltr',
        },
      },
    },
    themeConfig: {
      metadata: [
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'Snout Router'},

        {property: 'og:image', content: `${orgUrl}open-graph.png`},
        {property: 'og:image:type', content: 'image/png'},
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'},
        {property: 'og:image:alt', content: 'A repeating pattern of isometric pig snouts'},

        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@SnoutRouter'},

        {name: 'twitter:image', content: `${orgUrl}twitter-card.png`},
        {name: 'twitter:image:alt', content: 'A repeating pattern of isometric pig snouts'},

        {name: 'theme-color', media: '(prefers-color-scheme: dark)', content: 'hsl(350, 100%, 85%)'},
        {name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'hsl(350, 100%, 85%)'},
      ],
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title,
        logo: {
          alt: 'An isometric pig snout',
          src: `${orgUrl}/snout.svg`,
        },
        items: [
          ...navbarItems,
          {
            href: orgUrlNoSlash,
            label: 'Snout',
            position: 'right',
          },
          {
            href: githubUrl,
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          ...footerLinks,
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/snout-router',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/SnoutRouter',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: githubUrl,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Erin Millard`,
      },
    },
    presets: [
      [
        '@docusaurus/preset-classic',
        {
          blog: false,
          theme: {
            customCss: resolve(rootPath, 'src/custom.css'),
          },
          docs: {
            path: '../docs',
            routeBasePath: '/',
            sidebarPath: './sidebars.js',
            editUrl: `${githubUrl}/edit/main/website/`,
            remarkPlugins: [
              [
                linkDocblocks,
                {
                  extractorSettings: {
                    tsconfig: resolve(__dirname, 'tsconfig.json'),
                    basedir: resolve(rootPath, '..'),
                    rootFiles: [
                      'index.ts',
                    ],
                  },
                },
              ],
              [
                transpileCodeblocks,
                {
                  compilerSettings: {
                    tsconfig: resolve(__dirname, 'tsconfig.json'),
                    externalResolutions: {
                      [name]: {
                        resolvedPath: resolve(rootPath, '../src'),
                        packageId: {
                          name,
                          subModuleName: 'index.ts',
                          version: '0.0.0',
                        },
                      },
                    },
                  },
                },
              ],
            ],
          },
        },
      ],

      require.resolve('./preset.js'),
    ],
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects,
        },
      ],
    ],
  }
}
