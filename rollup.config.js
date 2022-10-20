const { preserveShebangs } = require('rollup-plugin-preserve-shebangs');
import { nodeResolve } from '@rollup/plugin-node-resolve'
const commonjs = require('rollup-plugin-commonjs')
import json from '@rollup/plugin-json'
import { terser } from "rollup-plugin-terser"
export default {
  input: 'cli/index.js',
  output: {
    dir: 'build',
    format: 'cjs',
  },
  external: ['commander', 'inquirer', 'ejs'],
  plugins: [
    preserveShebangs(),
    json(),
    nodeResolve(),
    commonjs(),
    terser()
  ],
}