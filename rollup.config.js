import {terser} from 'rollup-plugin-terser';
import { eslint } from "rollup-plugin-eslint";
import banner from 'rollup-plugin-banner';
import ascii from 'rollup-plugin-ascii';

export default {
  input: 'src/index.js',
  plugins: [
    eslint({
      fix: true,
    }),
    ascii()
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
        banner('@require      https://cdn.jsdelivr.net/npm/sweetalert2@9'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie. Pełna, niezminifikowana wersja kodu dostępna na githubie - PLWpl/WykopHelper'),
        banner('@downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@0.5/output/whhelper.js'),
        banner('@updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@0.5/output/whhelper.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         WykopHelper'),
        banner('==UserScript=='),
      ]
    },
    {
      file: 'output/whhelper-dev.js',
      format: 'iife',
      name: 'outputVersionDEV',
      plugins: [
        banner('==/UserScript=='),
        banner('@grant        none'),
        banner('@require      https://cdn.jsdelivr.net/npm/sweetalert2@9'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie.'),
        banner('@downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@0.5/output/whhelper-dev.js'),
        banner('@updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper@0.5/output/whhelper-dev.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         WykopHelper - DEV'),
        banner('==UserScript=='),
      ]
    }
  ]
};