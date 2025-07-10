import IconGithub from '../icons/socials/IconGithub';
import IconLinkedin from '../icons/socials/IconLinkedin';
import './PageFooter.scss';

export default function PageFooter() {
  return (
    <footer className="footer">
      <span>find me in:</span>
      <nav>
        <li><a className="linkedin" href="https://www.linkedin.com/in/marco-vignati-330505368/" target='blank'><IconLinkedin /></a></li>
        <li><a className="github" href="https://github.com/VignatiDev" target='blank'><IconGithub /><p>@vignatidev</p></a></li>
      </nav>
    </footer>
  )
}