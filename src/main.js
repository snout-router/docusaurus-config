const {readdirSync, readFileSync} = require('fs')
const {basename, resolve} = require('path')
const {linkDocblocks, transpileCodeblocks} = require('remark-typescript-tools')

module.exports = {
  createConfig
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
function createConfig (options) {
  const {
    primaryApiEntry,
    rootPath,
    title,
  } = options

  const {
    description,
    homepage,
    name,
    repository,
  } = JSON.parse(readFileSync(resolve(rootPath, '../package.json')))

  const githubUrl = `https://github.com/${repository}`
  const [organizationName, projectName] = repository.split('/')

  return {
    title,
    tagline: description,
    url: homepage,
    baseUrl: `/${projectName}/`,
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
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title,
        logo: {
          alt: 'An isometric pig snout',
          src: 'img/snout.svg',
        },
        items: [
          {
            to: `api/${primaryApiEntry}`,
            label: 'API reference',
            position: 'right',
          },
          {
            href: homepage,
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
          {
            title: 'Docs',
            items: [
              {
                label: 'API reference',
                to: `api/${primaryApiEntry}`,
              },
            ],
          },
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
    ],
    plugins: [
      [
        '@docusaurus/plugin-client-redirects',
        {
          redirects: [
            {
              from: '/api',
              to: `/api/${primaryApiEntry}`,
            },
          ],
        },
      ],
    ],
  }
}
