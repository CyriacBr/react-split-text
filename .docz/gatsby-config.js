const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'React Split Text',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: true,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: 'docs/source/**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'React Split Text',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3001,
        p: 3000,
        separator: '-',
        paths: {
          root: '/mnt/0CC5166B0CC5166B/Work/react-split-text',
          templates:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/node_modules/docz-core/dist/templates',
          docz: '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz',
          cache: '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/.cache',
          app: '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app',
          appPackageJson:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/package.json',
          appTsConfig:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/tsconfig.json',
          gatsbyConfig:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/gatsby-config.js',
          gatsbyBrowser:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/gatsby-browser.js',
          gatsbyNode:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/gatsby-node.js',
          gatsbySSR:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/gatsby-ssr.js',
          importsJs:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app/imports.js',
          rootJs:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app/root.jsx',
          indexJs:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app/index.jsx',
          indexHtml:
            '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app/index.html',
          db: '/mnt/0CC5166B0CC5166B/Work/react-split-text/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
