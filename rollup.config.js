import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  external: [ 'react', 'prop-types', 'downshift' ],
  output: {
    file: 'dist/DownshiftPelias.js',
    format: 'umd',
    name: 'DownshiftPelias',
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
      downshift: 'Downshift'
    },
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
}
