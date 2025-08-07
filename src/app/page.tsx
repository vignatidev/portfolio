'use client';

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i18n";
import GameBoard from '@/components/candy-crush/GameBoard';
import './page.scss';

import Logo from '@/components/icons/logo';

export default function Home() {

  const { language } = useLanguage(); 

  return (
    <section className="page_home">
      <div>
        <div>
          <p>{translations[language].ola_p1}</p>
          <Logo />
          <h2 className='text-subheadline'>&gt; Full Stack developer</h2>
        </div>
        <div className="home_description candy_related">
          <p className='lable'>{translations[language].ola_p2}</p>
          <p className='lable'>{translations[language].ola_p3}</p>
          <p className='code-snippet'>const githubLink = “<a href='https://github.com/VignatiDev/candy-crush' target="_blank">github.com/VignatiDev/candy-crush</a>”</p>
        </div>
      </div>
      <div className='gameboard_wrapper candy_related'>
        <div className='board-wrapper'>
          <GameBoard />
        </div>
      </div>
    </section>
  )
}
