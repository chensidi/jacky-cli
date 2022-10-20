const reactDeps = {
  "eslint": "^8.24.0",
  'eslint-config-standard': '^17.0.0',
  'eslint-plugin-import': '^2.25.2',
  'eslint-plugin-n': '^15.0.0',
  'eslint-plugin-promise': '^6.0.0',
  'eslint-plugin-react': '^7.31.8',
}

const vueDeps = {
  "eslint": "^8.24.0",
  'eslint-config-standard': '^17.0.0',
  'eslint-plugin-import': '^2.25.2',
  'eslint-plugin-n': '^15.0.0',
  'eslint-plugin-promise': '^6.0.0',
  'eslint-plugin-vue': '^9.5.1',
}

const jsDeps = {
  "eslint": "^8.24.0",
  'eslint-config-standard': '^17.0.0',
  'eslint-plugin-import': '^2.25.2',
  'eslint-plugin-n': '^15.0.0',
  'eslint-plugin-promise': '^6.0.0',
}

const deps = [jsDeps, reactDeps, vueDeps]

const config = ['eslint-react.js', 'eslint-vue.js']

module.exports = {
  config,
  deps
}