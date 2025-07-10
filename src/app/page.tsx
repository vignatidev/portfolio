import GameBoard from '@/components/candy-crush/GameBoard';
import './page.scss';

import Logo from '@/components/icons/logo';

export default function Home() {
  return (
    <section className="page_home">
      <div>
        <div>
          <p>Hi all. I am</p>
          <Logo />
          <h2 className='text-subheadline'>&gt; Full Stack developer</h2>
        </div>
        <div className="home_description candy_related">
          <p className='lable'>// match three to score points</p>
          <p className='lable'>// you can also see it on my Github page</p>
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
