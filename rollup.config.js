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
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.min.js',
      format: 'iife',
      name: 'miniVersion',
      plugins: [terser()]
    },
    {
      file: 'dist/whhelper.user.js',
      format: 'iife',
      name: 'distVersion',
      plugins: [
        terser(),
        banner('==/UserScript=='),
        banner('@grant        none'),
        banner('@require      https://cdn.jsdelivr.net/npm/sweetalert2@10'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie. Pełna, niezminifikowana wersja kodu dostępna na githubie - PLWpl/WykopHelper'),
        banner('@downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper.user.js'),
        banner('@updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper.user.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         WykopHelper'),
        banner('==UserScript=='),
      ]
    },
    {
      file: 'dist/whhelper-dev.user.js',
      format: 'iife',
      name: 'distVersionDEV',
      plugins: [
        banner('==/UserScript=='),
        banner('@grant        none'),
        banner('@require      https://cdn.jsdelivr.net/npm/sweetalert2@10'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie.'),
        banner('@downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js'),
        banner('@updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         WykopHelper - DEV'),
        banner('==UserScript=='),
      ]
    },
    {
      file: 'dist/whhelper-dev.js',
      format: 'iife',
      name: 'distVersionDEV',
      plugins: [
        banner('==/UserScript=='),
        banner('@grant        none'),
        banner('@require      https://cdn.jsdelivr.net/npm/sweetalert2@10'),
        banner('@match        https://www.wykop.pl/*'),
        banner('@author       <%= pkg.author %>'),
        banner('@description  Zestaw narzędzi pomocnych na wykopie.'),
        banner('@downloadURL  https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js'),
        banner('@updateURL    https://cdn.jsdelivr.net/gh/plwpl/WykopHelper/dist/whhelper-dev.user.js'),
        banner('@version      <%= pkg.version %>'),
        banner('@name         WykopHelper - DEV ALPHA'),
        banner('==UserScript=='),
      ]
    }
  ]
};