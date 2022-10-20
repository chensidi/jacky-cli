const { build } = require('esbuild')

build({
  entryPoints: ['./cli/template/*'],
  outdir: 'dist',
  format: 'cjs'
})