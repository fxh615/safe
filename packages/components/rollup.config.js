import nodeResolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import clear from 'rollup-plugin-clear';
import progress from 'rollup-plugin-progress';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';




const isProd = process.env.NODE_ENV === 'production';

const formats = {
  commonjs: {
    format: 'cjs',
    file: pkg.main,
    sourcemap: true,
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'moment': 'moment',
      '@ant-design/icons': 'icons'
    },
  },
  esm: {
    format: 'esm',
    file: pkg.module,
    sourcemap: true,
    exports: 'named',
  },
  umd: {
    format: 'umd',
    file: pkg.browser,
    name: pkg.name,
    sourcemap: true,
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'moment': 'moment',
      '@ant-design/icons': 'icons'
    },
  },
};

const config = {
  input: './src/index.ts',
  inlineDynamicImports: true,
  output: [formats.esm, formats.commonjs],
  external: [
    'react',
    'react-dom',
    'react-router-dom',
    'moment',
    '@ant-design/icons',
  ],
  plugins: [
    clear({
      targets: ['lib'],
    }),
    progress({
      clearLine: false,
    }),
    replace({
      __VERSION__: pkg.version,
    }),
    nodeResolver(),
    commonjs(),
    typescript(),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use : [
        'sass',
        ['less', { javascriptEnabled: true }]
      ],
    }),
    json(),
    nodePolyfills(),
    copy({
      targets: [
        {
          src: 'src/style/**/*',
          dest: 'es/style/',
        }
      ],
    }),
  ],
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**',
  },
};

if (isProd) {
  const file = formats.umd.file;

  config.output.push({
    ...formats.umd,
    file,
    plugins: [terser()],
  });
}

export default config;
