import axios from 'axios';
import genres from '../modules/genres';
import filmCard from '../templates/templateMain.hbs';
import refs from '../js/refs';

import templateItem from '../templates/templateItem.hbs';
import templateMainQuery from '../templates/templateMainQuery.hbs';

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { alert } from '@pnotify/core';


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
  refs.inputHeader.classList.add('is-hidden');
  refs.header.classList.remove('site-home');
  refs.header.classList.add('site-film');
  const id = +e.target.id;
  console.log(id);

  if (e.target.nodeName === 'IMG') {
    const movies = axios.get(`/movie/${id}?api_key=${API_KEY}`);
    movies.then(({data}) => {
      console.log(data),
      refs.main.innerHTML = `${templateItem(data)}`;
    })

      .catch(error => {
        alert({
          text: 'Нет премиум-подписки!',
          delay: 1000,
        })
      })

    return;
  }

  else {
    console.log('нехуй клацать');
  }
  }

  findMovieQuery(query) {

    if (query !== '') {
      const moviesQuery = axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);

      moviesQuery.then(({data}) => {
        if(data.total_results !==0 ){
          console.log(data),
        refs.list.innerHTML = `${templateMainQuery(data.results)}`
        refs.errorInput.classList.add('is-hidden');
        }
        if(data.total_results === 0){
          refs.errorInput.classList.remove('is-hidden');
          this.findMovies();
        }


      })

      return;
    }
    this.findMovies();
  }

  updateMarkup(finalResults) {
    const cards = filmCard(finalResults);

    refs.list.insertAdjacentHTML('afterbegin', cards);
  };

  // btnAddToWatch() {
  //   refs.btnWatch.addEventListener('click', () => {
  //     console.log('test')
  //   })
  // }

}