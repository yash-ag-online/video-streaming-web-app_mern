// build.ts
import { build } from 'esbuild';

await build({
  entryPoints: ['src/app.ts'],
  outfile: 'dist/app.js',
  bundle: true,
  platform: 'node',
  target: 'es2022',
  format: 'esm',
  sourcemap: true,
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
});
