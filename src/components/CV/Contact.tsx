import { content } from '../../constants';
import { decode } from '../../utils/obfuscate';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

function formatSwedishPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('46') && digits.length === 11) {
    const n = digits.slice(2);
    return `+46 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`;
  }
  if (digits.startsWith('0') && digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
  }
  return raw;
}

const email = decode(content.email);
const phone = decode(content.phone);
const phoneDisplay = formatSwedishPhone(phone);
const telHref = `tel:${phone.replace(/\s/g, '')}`;
const mailHref = `mailto:${email}`;

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function Contact() {
  return (
    <section className={s.section} aria-labelledby="contact-heading">
      <SectionHeader title="Kontakt" id="contact-heading" />
      <address className={s.contactList}>
        <a href={mailHref} className={s.contactItem} aria-label={`E-post: ${email}`}>
          <MailIcon />
          <span>{email}</span>
        </a>
        <a href={telHref} className={s.contactItem} aria-label={`Telefon: ${phoneDisplay}`}>
          <PhoneIcon />
          <span>{phoneDisplay}</span>
        </a>
      </address>
    </section>
  );
}
