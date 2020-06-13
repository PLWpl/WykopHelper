import {terser} from 'rollup-plugin-terser';
import { eslint } from "rollup-plugin-eslint";
import banner from 'rollup-plugin-banner'

export default {
  input: 'src/index.js',
  plugins: [
    eslint({
      fix: true,
    })
  ],
  output: [
    {
      file: 'output/bundle.js',
      format: 'cjs'
    },
    {
      file: 'output/bundle.min.js',
      format: 'iife',
      name: 'miniVersion',
      plugins: [terser()]
    },
    {
      file: 'output/whhelper.js',
      format: 'iife',
      name: 'outputVersion',
      plugins: [
        terser(),
        banner('==/UserScript=='),
        banner('@grant        none'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie.'),
        banner('@downloadURL  http://plw.usermd.net/whhelper.js'),
        banner('@updateURL    http://plw.usermd.net/whhelper.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         Wykopowe trole - DEV'),
        banner('==UserScript=='),
      ]
    }
  ]
};