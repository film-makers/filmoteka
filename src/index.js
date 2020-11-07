import './sass/styles.scss';
import refs from './js/refs';

import filmCard from './templates/templateMain.hbs';
import genres from './modules/genres';


import PageChanger from './modules/pageChanger';


const pageChanger = new PageChanger();

pageChanger.findMovies();
pageChanger.updateButtons();




refs.arrowRight.addEventListener(
  'click',
  pageChanger.onArrowRightClick.bind(pageChanger),
);

refs.arrowLeft.addEventListener(
  'click',
  pageChanger.onArrowLeftClick.bind(pageChanger),
);

for (const pageButton in refs.pageButtons) {
  refs.pageButtons[pageButton].addEventListener(
    'click',
    pageChanger.onPageButtonsClick.bind(pageChanger),
  );
}

refs.list.addEventListener('click', 
  pageChanger.findSpecificMovie.bind(pageChanger)
)