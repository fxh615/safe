import path from 'path';
import { babel } from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from '@rollup/plugin-commonjs';
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import svgr from '@svgr/rollup';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';

const resolveFile = function(filePath) {
  return path.join(__dirname, '.', filePath)
}

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
// const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './node_modules/antd/es/style/variable.less'), 'utf8'), {
//   resolveVariables: true, stripPrefix: true
// });


export default {
  input: resolveFile('src/index.tsx'),
  output: {
    file: "public/index.js",
    format: "iife",
    sourcemap: true,
    globals: {
    }
  },
  plugins: [

    builtins(),
    // 告诉 Rollup 如何查找模块
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".svg"],
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'development' ),
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    // 将CommonJS 模块转换成es6模块
    commonjs(),
    json(),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use : [
        'sass',
        ['less', { javascriptEnabled: true }]
      ],
    }),
    image({
      include: ['**/*.png']
    }),
    svgr({
      icon: true,
      typescript: true,
      dimensions: true,
      expandProps: "start",
      ref: true
    }),
    serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    livereload({ watch: "public" })
  ]
}
