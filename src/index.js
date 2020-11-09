import './sass/styles.scss';
import refs from './js/refs';

import filmCard from './templates/templateMain.hbs';
import genres from './modules/genres';

import teamdata from './js/team';

import templateLibrary from './templates/templateLibrary.hbs';
import debounce from 'lodash.debounce';

import PageChanger from './modules/pageChanger';
import team from './templates/team.hbs'

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
  refs.btnHeadWatch.classList.add('active');
  refs.btnHeadQue.classList.remove('active');


  const getLocalStorage = localStorage.getItem('watched');
  const parsedLocalFilm = JSON.parse(getLocalStorage);



  refs.main.innerHTML = `${templateLibrary(parsedLocalFilm)}`;
  const list = document.querySelector('.films__list');
  list.addEventListener('click',
  pageChanger.findSpecificMovie.bind(pageChanger),
);
});

refs.linkHome.addEventListener('click', () => {
  refs.header.classList.add('site-home');
  refs.header.classList.remove('site-film');
  refs.header.classList.remove('site-myLibrary');
  refs.inputHeader.classList.remove('is-hidden');
  refs.btnHeader.classList.add('is-hidden');
});


refs.teamList.addEventListener('click', ()=> {
  refs.menuLinks.classList.add('is-hidden');
  refs.inputHeader.classList.add('is-hidden');
  refs.main.innerHTML = `${team(teamdata)}`;
})

refs.btnHeadQue.addEventListener('click', () => {
  refs.btnHeadWatch.classList.remove('active');
  refs.btnHeadQue.classList.add('active');

  const getLocalStorage = localStorage.getItem('queue');
  const parsedLocalFilm = JSON.parse(getLocalStorage);

  refs.main.innerHTML = `${templateLibrary(parsedLocalFilm)}`;
  const list = document.querySelector('.films__list');
  list.addEventListener('click',
  pageChanger.findSpecificMovie.bind(pageChanger),
);

})

refs.btnHeadWatch.addEventListener('click', () => {
  refs.btnHeadWatch.classList.add('active');
  refs.btnHeadQue.classList.remove('active');

  const getLocalStorage = localStorage.getItem('watched');
  const parsedLocalFilm = JSON.parse(getLocalStorage);

  refs.main.innerHTML = `${templateLibrary(parsedLocalFilm)}`;
  const list = document.querySelector('.films__list');
  list.addEventListener('click',
  pageChanger.findSpecificMovie.bind(pageChanger),
);
})


refs.backToTop.addEventListener('click', () => {
  scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})