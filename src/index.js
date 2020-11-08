import './sass/styles.scss';
import refs from './js/refs';

import filmCard from './templates/templateMain.hbs';
import genres from './modules/genres';

import debounce from  'lodash.debounce';

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
  pageChanger.findSpecificMovie.bind(pageChanger),
);

refs.inputFinder.addEventListener('input', debounce((e) => {
  let query = e.target.value;
  console.log(e.target.value);
  pageChanger.findMovieQuery(query);


}, 500));

refs.siteLogo.addEventListener('click', () => {
  window.location.reload();
});

refs.linkLibrary.addEventListener('click', () => {
  refs.header.classList.remove('site-home');
  refs.header.classList.remove('site-film');
  refs.header.classList.add('site-myLibrary');
  refs.inputHeader.classList.add('is-hidden');
  refs.btnHeader.classList.remove('is-hidden');
})

refs.linkHome.addEventListener('click', () => {
  refs.header.classList.add('site-home');
  refs.header.classList.remove('site-film');
  refs.header.classList.remove('site-myLibrary');
  refs.inputHeader.classList.remove('is-hidden');
  refs.btnHeader.classList.add('is-hidden');
})

