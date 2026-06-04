import { build } from 'vite';
import { readFile, writeFile, rm, readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = process.cwd();
const ssrDir = resolve(root, '.ssr');
const docsDir = resolve(root, 'docs');
const assetsDir = resolve(docsDir, 'assets');
const indexPath = resolve(docsDir, 'index.html');

await build();

await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: '.ssr',
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } }
  }
});

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.mjs')).href);
const appHtml = render().replace(/<link[^>]*>/g, '');

let template = await readFile(indexPath, 'utf-8');

const assetFiles = await readdir(assetsDir);
const cssFile = assetFiles.find((f) => f.endsWith('.css'));
if (cssFile) {
  const cssPath = resolve(assetsDir, cssFile);
  const cssContent = await readFile(cssPath, 'utf-8');
  template = template.replace(
    /<link[^>]*rel="stylesheet"[^>]*href="[^"]*\.css"[^>]*\/?>/,
    `<style>${cssContent}</style>`
  );
  await rm(cssPath);
}

template = template.replace('<!--app-->', appHtml);
await writeFile(indexPath, template);

await rm(ssrDir, { recursive: true, force: true });

console.log('✓ Prerendered + inlined CSS into docs/index.html');
