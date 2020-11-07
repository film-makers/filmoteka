import axios from 'axios';
import genres from '../modules/genres';
import filmCard from '../templates/templateMain.hbs';
import refs from '../js/refs';

import templateItem from '../templates/templateItem.hbs';

const API_KEY = 'bb0a149304db2d054e912403b986db46';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class {
  constructor() {
    this.page = 1;
    this.key = API_KEY;
  }

  clearPage() {
    refs.list.innerHTML = '';
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  onArrowRightClick() {
    this.clearPage();
    this.incrementPage();
    this.findMovies();
    this.updateButtons();
  }

  onArrowLeftClick() {
    this.clearPage();
    this.decrementPage();
    this.findMovies();
    this.updateButtons();
  }

  onPageButtonsClick(event) {
    this.clearPage();
    this.page = Number(event.target.textContent);
    this.findMovies();
    this.updateButtons();
  }

  updateButtons() {
    refs.pageButtons.bpPage.innerHTML = this.page - 2;
    refs.pageButtons.pPage.innerHTML = this.page - 1;
    refs.pageButtons.currentPage.innerHTML = this.page;
    refs.pageButtons.nPage.innerHTML = this.page + 1;
    refs.pageButtons.anPage.innerHTML = this.page + 2;
  }

  findMovies() {
    const movies = axios.get(
      `/trending/movies/week?api_key=${this.key}&page=${this.page}`,
    );
    movies.then(({ data }) => console.log(data));

    movies.then(({ data: { results } }) => {
      const mappedResults = results.map(item => ({
        ...item,
        first_air_date: item.first_air_date
          ? item.first_air_date.slice(0, 4)
          : 'No data',
      }));

      const finalResults = mappedResults.map(item => ({
        ...item,
        genre_ids: item.genre_ids
          .map(number => {
            const genre = genres.find(genre => genre.id === number);

            return genre?.name;
          })
          .join(', '),
      }));

      this.updateMarkup(finalResults);
    });
  }

  findSpecificMovie(e) {
  const id = +e.target.id;
  console.log(id);

  if (e.target.nodeName === 'IMG') {
    const movies = axios.get(`/movie/${id}?api_key=${API_KEY}`);
    movies.then(({data}) => {
      console.log(data),
      refs.main.innerHTML = `${templateItem(data)}`;
    })
    return;
  }
  
  else {
    console.log('нехуй клацать');
  }
  
  }

  updateMarkup(finalResults) {
    const cards = filmCard(finalResults);

    refs.list.insertAdjacentHTML('afterbegin', cards);
  }
}
