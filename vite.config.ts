import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { content, SITE_URL, PORTRAIT_PATH } from './src/constants';

const TITLE = `${content.fullName} — ${content.role}`;
const DESCRIPTION = `${content.fullName}, ${content.role} i ${content.location}. ${content.tagline}`;
const IMAGE_URL = `${SITE_URL}${PORTRAIT_PATH}`;
const IMAGE_ALT = `Porträtt av ${content.fullName}`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: content.fullName,
  givenName: content.firstName,
  familyName: content.lastName,
  jobTitle: content.role,
  description: content.tagline,
  url: SITE_URL,
  image: IMAGE_URL,
  address: {
    '@type': 'PostalAddress',
    addressLocality: content.address.city,
    addressCountry: content.address.countryCode
  },
  knowsAbout: [...content.skills],
  alumniOf: content.education.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.school
  })),
  sameAs: content.socials.map((s) => s.url)
};

const escapeHtml = (str: string): string =>
  str.replace(/[&<>"']/g, (c) =>
    c === '&' ? '&amp;'
      : c === '<' ? '&lt;'
      : c === '>' ? '&gt;'
      : c === '"' ? '&quot;'
      : '&#39;'
  );

const buildHead = (): string => `
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(TITLE)}</title>
    <meta name="description" content="${escapeHtml(DESCRIPTION)}" />
    <meta name="author" content="${escapeHtml(content.fullName)}" />
    <meta name="theme-color" content="#0a0a0a" />
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    <link rel="canonical" href="${SITE_URL}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content="${escapeHtml(TITLE)}" />
    <meta property="og:description" content="${escapeHtml(DESCRIPTION)}" />
    <meta property="og:type" content="profile" />
    <meta property="og:url" content="${SITE_URL}" />
    <meta property="og:image" content="${IMAGE_URL}" />
    <meta property="og:image:alt" content="${escapeHtml(IMAGE_ALT)}" />
    <meta property="og:image:width" content="960" />
    <meta property="og:image:height" content="1000" />
    <meta property="og:image:type" content="image/webp" />
    <meta property="og:site_name" content="${escapeHtml(content.fullName)}" />
    <meta property="og:locale" content="sv_SE" />
    <meta property="profile:first_name" content="${escapeHtml(content.firstName)}" />
    <meta property="profile:last_name" content="${escapeHtml(content.lastName)}" />
    <link rel="preload" as="font" href="/fonts/firacode-latin.woff2" type="font/woff2" crossorigin />
    <link rel="preload" as="image" href="${PORTRAIT_PATH}" fetchpriority="high" />
    <script type="application/ld+json">${JSON.stringify(personSchema)}</script>`;

const hashClassName = (filename: string, name: string): string => {
  const hash = createHash('md5')
    .update(`${filename}\x00${name}`)
    .digest('base64')
    .replace(/[+/=]/g, '')
    .slice(0, 7);
  return `_${hash}`;
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'inject-head',
      transformIndexHtml(html) {
        return html.replace('<!--head-->', buildHead());
      }
    }
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    minify: 'esbuild',
    target: 'es2020'
  },
  css: {
    modules: {
      generateScopedName: (name, filename) => hashClassName(filename, name)
    }
  }
});
