import {terser} from 'rollup-plugin-terser';
import { eslint } from "rollup-plugin-eslint";

export default {
  input: 'src/index.js',
  plugins: [
    eslint({
      fix: true,
    })
  ],
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    },
    {
      file: 'bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ]
};