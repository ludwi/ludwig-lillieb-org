import { content } from '../../constants';
import type { CertificatePeriod } from '../../constants';
import { SectionHeader } from './SectionHeader';
import s from './CV.module.scss';

const yearOf = (s: string): string => s.match(/\d{4}/)?.[0] ?? s;

const yearSpan = (p: CertificatePeriod): string => {
  const from = yearOf(p.from);
  if (!p.to) return from;
  const to = yearOf(p.to);
  return from === to ? from : `${from} – ${to}`;
};

const sortKey = (p: CertificatePeriod): number =>
  parseInt(yearOf(p.to ?? p.from), 10);

export function Certificates() {
  const sorted = [...content.certificates].sort(
    (a, b) => sortKey(b.periods[0]) - sortKey(a.periods[0])
  );

  return (
    <section className={s.section} aria-labelledby="certificates-heading">
      <SectionHeader title="Certifikat" id="certificates-heading" />
      <ol>
        {sorted.map((cert) => (
          <li key={cert.name} className={s.educationEntry}>
            <div className={s.certPeriods}>
              {cert.periods.map((p, i) => (
                <span key={i}>{yearSpan(p)}</span>
              ))}
            </div>
            <div>
              <h3 className={s.educationDegree}>{cert.name}</h3>
              <p className={s.educationSchool}>{cert.issuer}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
