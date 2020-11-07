import axios from 'axios';
import genres from '../modules/genres';
import filmCard from '../templates/film-card.hbs';
import refs from '../js/refs';

const API_KEY = 'bb0a149304db2d054e912403b986db46';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class {
  constructor() {
    this.page = 1;
    this.key = API_KEY;
  }

  clearPage() {
    refs.container.innerHTML = '';
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

  updateMarkup(finalResults) {
    const cards = filmCard(finalResults);

    refs.container.insertAdjacentHTML('afterbegin', cards);
  }
}
