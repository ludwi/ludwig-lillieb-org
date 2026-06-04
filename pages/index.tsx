import Head from 'next/head';
import { CV } from '../src/components/CV';
import { content, SITE_URL, PORTRAIT_PATH } from '../src/constants';

const TITLE = `${content.fullName} — ${content.role}`;
const DESCRIPTION = `${content.fullName}, ${content.role} i ${content.location}. ${content.tagline}`;
const IMAGE_URL = `${SITE_URL}${PORTRAIT_PATH}`;
const IMAGE_ALT = `Porträtt av ${content.fullName}`;

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content={content.fullName} />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="canonical" href={SITE_URL} />

        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={IMAGE_URL} />
        <meta property="og:image:alt" content={IMAGE_ALT} />
        <meta property="og:site_name" content={content.fullName} />
        <meta property="og:locale" content="sv_SE" />
        <meta property="profile:first_name" content={content.firstName} />
        <meta property="profile:last_name" content={content.lastName} />
      </Head>

      <a href="#main" className="skip-link">Hoppa till innehåll</a>

      <main id="main">
        <CV />
      </main>
    </>
  );
}
