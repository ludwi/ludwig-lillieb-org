import { Hero } from './Hero';
import { Aside } from './Aside';
import { About } from './About';
import { Experience } from './Experience';
import { Education } from './Education';
import { Certificates } from './Certificates';
import { Skills } from './Skills';
import { Personal } from './Personal';
import s from './CV.module.scss';

export function CV() {
  return (
    <div className={s.shell}>
      <article className={s.page}>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Certificates />
        <Skills />
        <Personal />
      </article>
      <Aside />
    </div>
  );
}
