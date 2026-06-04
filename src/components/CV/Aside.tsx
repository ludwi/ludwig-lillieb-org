import { content } from '../../constants';
import { Contact } from './Contact';
import { Socials } from './Socials';
import s from './CV.module.scss';

export function Aside() {
  return (
    <aside className={s.aside}>
      <img
        src="/ludwig_lillieborg.webp"
        alt={`Porträtt av ${content.fullName}`}
        width={128}
        height={128}
        className={s.asideAvatar}
      />
      <Contact />
      <Socials />
    </aside>
  );
}
