const {readdirSync, readFileSync} = require('fs')
const {basename, join} = require('path')

module.exports = {
  createConfig
}

/** @type {import('@docusaurus/types').DocusaurusConfig} */
function createConfig (options) {
  const {
    rootPath,
    title,
  } = options

  const {
    description,
    homepage,
    repository,
  } = JSON.parse(readFileSync(join(rootPath, '../package.json')))

  const githubUrl = `https://github.com/${repository}`
  const [organizationName, projectName] = repository.split('/')

  const [firstApiPath] = readdirSync(join(rootPath, '../docs/api')).sort()
  const firstApiEntry = basename(firstApiPath, '.mdx')

  return {
    title,
    tagline: description,
    url: homepage,
    baseUrl: `/${projectName}/`,
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    favicon: 'img/favicon.ico',
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
        items: [
          {
            to: `api/${firstApiEntry}`,
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
                to: `api/${firstApiEntry}`,
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
            customCss: join(rootPath, 'src/custom.css'),
          },
          docs: {
            path: '../docs',
            routeBasePath: '/',
            sidebarPath: './sidebars.js',
            editUrl: `${githubUrl}/edit/main/website/`,
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
              to: `/api/${firstApiEntry}`,
            },
          ],
        },
      ],
    ],
  }
}
