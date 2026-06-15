export const SITE_URL = 'https://ludwig.lillieb.org';
export const PORTRAIT_PATH = '/ludwig_lillieborg.webp';
export const LOCALE = 'sv-SE';

export interface Address {
  city: string;
  countryCode: string;
}

export interface JobEntry {
  title: string;
  company: string;
  period: string;
  location?: string;
  paragraphs: readonly string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface CertificatePeriod {
  from: string;
  to?: string;
}

export interface CertificateEntry {
  name: string;
  issuer: string;
  periods: readonly CertificatePeriod[];
}

export interface Skill {
  name: string;
  years: number;
}

export type SocialPlatform = 'linkedin' | 'github';

export interface Social {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface Content {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  tagline: string;
  location: string;
  address: Address;
  email: string;
  phone: string;
  about: readonly string[];
  experience: readonly JobEntry[];
  education: readonly EducationEntry[];
  certificates: readonly CertificateEntry[];
  skills: readonly Skill[];
  socials: readonly Social[];
  personal: readonly string[];
}

export const content: Content = {
  firstName: 'Ludwig',
  lastName: 'Lillieborg',
  fullName: 'Ludwig Lillieborg',

  role: 'Senior fullstack-utvecklare',
  tagline: 'Jag är en erfaren utvecklare med drygt 15 års yrkeserfarenhet med spetskompetens inom React, .NET och AI-driven webbutveckling.',
  location: 'Stockholm, Sverige',
  address: {
    city: 'Stockholm',
    countryCode: 'SE'
  },

  email: 'bHVkd2lnQGxpbGxpZWIub3Jn',
  phone: 'KzQ2NzM1MTE2NTcy',

  about: [
    'Min styrka ligger i kombinationen av djup teknisk bredd och förmågan att leda projekt i mål. Jag tar ett naturligt ägandeskap för helheten – systemdesign, prestanda och slutanvändarens upplevelse.',
    'Genom ett genuint engagemang för kompetensutveckling bidrar jag aktivt till att lyfta både mig själv och mina kollegor.'
  ],

  experience: [
    {
      title: 'Senior fullstack-utvecklare',
      company: 'Fröjd',
      period: 'Oktober 2017 — nu',
      location: 'Stockholm',
      paragraphs: [
        'Ansvarig utvecklare för fler av bolagets största kundkonton i tvärfunktionella team med 3-4 andra utvecklare, analytiker, projektledare och UX-designers. Byggt och förvaltat ett flertal webbplatser i .NET, Node.js och Python.',
        'Lett en framgångsrik migrering av komplex Optimizely-sajt omfattande 60+ sidtyper och 100+ blocktyper från .NET Framework till .NET 8.',
        'Utvecklat flera AI-tjänster för att effektivisera redaktionella processer, inklusive verktyg för automatiserad innehålls- och ljudproduktion.'
      ]
    },
    {
      title: 'Systemutvecklare',
      company: 'Cloud Nine',
      period: 'Augusti 2014 — September 2017',
      location: 'Stockholm',
      paragraphs: [
        'Drev nyutveckling och långsiktig förvaltning av e-handelslösningar, intranät och publika webbplatser byggda i Litium, Umbraco och Optimizely.'
      ]
    },
    {
      title: 'Systemutvecklare',
      company: 'Circuit',
      period: 'Oktober 2012 — Augusti 2014',
      location: 'Stockholm',
      paragraphs: [
        'Hanterade löpande förvaltning och support för en bred kundbas, vilket innebar snabb problemidentifiering och implementation av fullstack-lösningar under hög variation.'
      ]
    }
  ],

  education: [
    {
      degree: 'Applikationsutveckling',
      school: 'Lernia Yrkeshögskola',
      period: '2010 — 2012',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  ],

  certificates: [
    {
      name: 'Optimizely Certified Developer',
      issuer: 'Optimizely',
      periods: [
        { from: 'April 2026', to: 'April 2028' },
        { from: 'Juni 2015', to: 'Juni 2017' },
        { from: 'Juni 2013', to: 'Juni 2015' }
      ]
    },
    {
      name: 'Litium Certified Developer',
      issuer: 'Litium',
      periods: [
        { from: 'April 2017' }
      ]
    },
    {
      name: 'Programming in C#',
      issuer: 'Microsoft',
      periods: [
        { from: 'Maj 2016' }
      ]
    }
  ],

  personal: [
    'När jag inte kodar – eller skriver Claude-promptar numera – hittar man mig oftast i trädgården. Ledig tid tillbringas helst med familjen, varvat med ett stort intresse för musik och tv-spel.'
  ],

  socials: [
    { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ludwiglillieborg/' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/ludwi' }
  ],

  skills: [
    { name: '.NET', years: 15 },
    { name: 'JavaScript', years: 15 },
    { name: 'CSS', years: 15 },
    { name: 'HTML', years: 15 },
    { name: 'Optimizely', years: 15 },
    { name: 'SQL', years: 15 },
    { name: 'SEO', years: 10 },
    { name: 'Git', years: 10 },
    { name: 'React', years: 10 }, 
    { name: 'DevOps', years: 10 },
    { name: 'Tillgänglighet', years: 10 },
    { name: 'Next.js', years: 5 },
    { name: 'AI', years: 2 }
  ]
};
