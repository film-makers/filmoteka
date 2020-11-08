import './sass/styles.scss';
import refs from './js/refs';
import PageChanger from './modules/pageChanger';

const pageChanger = new PageChanger();

pageChanger.findMovies().then(maxPage => {
  console.log(maxPage);
  pageChanger.updateButtons(maxPage);
});

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

refs.list.addEventListener(
  'click',
  pageChanger.findSpecificMovie.bind(pageChanger),
);
