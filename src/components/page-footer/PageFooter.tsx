import IconFacebook from '../icons/socials/IconFacebook';
import IconGithub from '../icons/socials/IconGithub';
import IconInstagram from '../icons/socials/IconInstagram';
import IconLinkedin from '../icons/socials/IconLinkedin';
import IconTwitter from '../icons/socials/IconTwitter';
import './PageFooter.scss';

export default function PageFooter() {
  return (
    <footer className="footer">
      <span>find me in:</span>
      <nav>
        <li><a href="https://www.linkedin.com/in/marcovignatidev/" target='blank'><IconLinkedin /></a></li>
        <li className='un'><a href="https://twitter.com/marcovignatidev" target='blank'><IconTwitter /></a></li>
        <li className='un'><a href="/"><IconFacebook /></a></li>
        <li className='un'><a className="instagram" href="https://www.instagram.com/vignati.dev/" target='blank'><IconInstagram /></a></li>
        <li><a className="github" href="https://github.com/MarcoVignati" target='blank'><IconGithub /><p>@marcovignati</p></a></li>
      </nav>
    </footer>
  )
}