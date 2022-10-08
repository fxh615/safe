const path = require('path');
const fs = require('fs');
const { version } = require('./package');

module.exports = {
  title: "石原子前端组件库",
  // components: ['src/**/[a-z]*.tsx'],
  components: ['src/*/index.{tsx,ts}', 'src/pros/*/index.{tsx,ts}'],
  ignore: [
    '**/*.spec.jsx',
    '**/*.spec.tsx',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/interface.ts',
    '**/*.interface.ts',
    'src/index.ts',
    'src/styleguide/**',
    'src/themes/**',
    'src/tests/**',
    'src/__tests__/**',
    'src/_util/**',
  ],
  styleguideDir: "docs",
  skipComponentsWithoutExample: true,
  usageMode: 'expand',
  version,
  // resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  // propsParser: require("react-docgen-typescript").withCustomConfig('./tsconfig.json').parse,
  moduleAliases: {
    '@safe/components': path.resolve(__dirname, 'src'),
    '@/tabs': path.resolve(__dirname, 'src/tabs'),
    '@/grid': path.resolve(__dirname, 'src/grid'),
    '@/config-provider': path.resolve(__dirname, 'src/config-provider'),
    '@/avatar': path.resolve(__dirname, 'src/avatar'),
    '@/statistic': path.resolve(__dirname, 'src/statistic'),
    '@/badge': path.resolve(__dirname, 'src/badge'),
    '@/tooltip': path.resolve(__dirname, 'src/tooltip'),
    '@/cascader': path.resolve(__dirname, 'src/cascader'),
    '@/checkbox': path.resolve(__dirname, 'src/checkbox'),
    '@/space': path.resolve(__dirname, 'src/space'),
    '@/spin': path.resolve(__dirname, 'src/spin'),
    '@/input': path.resolve(__dirname, 'src/input'),
    '@/popover': path.resolve(__dirname, 'src/popover'),
    '@/date-picker': path.resolve(__dirname, 'src/date-picker'),
    '@/input-number': path.resolve(__dirname, 'src/input-number'),
    '@/image': path.resolve(__dirname, 'src/image'),
    '@/progress': path.resolve(__dirname, 'src/progress'),
    '@/radio': path.resolve(__dirname, 'src/radio'),
    '@/rate': path.resolve(__dirname, 'src/rate'),
    '@/select': path.resolve(__dirname, 'src/select'),
    '@/layout': path.resolve(__dirname, 'src/layout'),
    '@/switch': path.resolve(__dirname, 'src/switch'),
    '@/time-picker': path.resolve(__dirname, 'src/time-picker'),
    '@/tree-select': path.resolve(__dirname, 'src/tree-select'),
    '@/form': path.resolve(__dirname, 'src/form'),
    '@/button': path.resolve(__dirname, 'src/button'),
    '@/upload': path.resolve(__dirname, 'src/upload'),
    '@/drawer': path.resolve(__dirname, 'src/drawer'),
    '@/modal': path.resolve(__dirname, 'src/modal'),
    '@/divider': path.resolve(__dirname, 'src/divider'),
    '@/steps': path.resolve(__dirname, 'src/steps'),
    '@/alert': path.resolve(__dirname, 'src/alert'),
    '@/tree': path.resolve(__dirname, 'src/tree'),
    '@/dropdown': path.resolve(__dirname, 'src/dropdown'),
    '@/menu': path.resolve(__dirname, 'src/menu'),
    '@/table': path.resolve(__dirname, 'src/table'),
    '@/result': path.resolve(__dirname, 'src/result'),
    '@/typography': path.resolve(__dirname, 'src/typography'),
    '@/message': path.resolve(__dirname, 'src/message'),
    '@/popconfirm': path.resolve(__dirname, 'src/popconfirm'),
    '@/empty': path.resolve(__dirname, 'src/empty'),
    '@/pros/utils': path.resolve(__dirname, 'src/pros/utils'),
    '@/pros/card': path.resolve(__dirname, 'src/pros/card'),
    '@/pros/form': path.resolve(__dirname, 'src/pros/form'),
    '@/pros/table': path.resolve(__dirname, 'src/pros/table'),
    '@/pros/fields': path.resolve(__dirname, 'src/pros/fields'),
    '@/pros/provider': path.resolve(__dirname, 'src/pros/provider'),
    '@/themes': path.resolve(__dirname, 'src/themes'),
    '@/breadcrumb': path.resolve(__dirname, 'src/breadcrumb'),
    '@/list': path.resolve(__dirname, 'src/list'),
    '@/affix': path.resolve(__dirname, 'src/affix'),
    '@/page-header': path.resolve(__dirname, 'src/page-header'),
    '@/skeleton': path.resolve(__dirname, 'src/skeleton')
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/ThemeWrapper')
  },
  updateExample(props, exampleFilePath) {
    const { settings, lang } = props;
    if (settings && typeof settings.file === 'string') {
      const filepath = path.resolve(exampleFilePath, settings.file)
      settings.static = true;
      delete settings.file;
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        lang,
        settings: { padded: true}
      }
    }
    return props
  },
  webpackConfig: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.less$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                   javascriptEnabled: true
                }
              }
            }
          ],
        },
      ]
    }
  },
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: './var.css',
        }
      ],
    },
    favicon: 'https://assets-cdn.github.com/favicon.ico'
  },
}
