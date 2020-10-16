
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import * as pkg from './package.json'


const deps = Object.keys(pkg.dependencies)
// .filter(k => k !== 'fufu')


const compilerOptions = {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
      globals: deps
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  external: deps,
  plugins: [
    resolve(),
    typescript({
      typescript: require('typescript'),
      check: true,
      useTsconfigDeclarationDir: true
    })
  ]
}

export default compilerOptions