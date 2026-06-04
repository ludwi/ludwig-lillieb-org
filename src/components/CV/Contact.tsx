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
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a1 1 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66a1 1 0 0 0 .24-1.02c-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99Z" />
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
