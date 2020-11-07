import './sass/styles.scss';
import axios from 'axios';
import refs from './js/refs';
import filmCard from './templates/film-card.hbs';
import genres from './modules/genres';

const API_KEY = 'bb0a149304db2d054e912403b986db46';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const movies = axios.get(`/trending/movies/week?api_key=${API_KEY}`);

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

  const cards = filmCard(finalResults);

  refs.container.insertAdjacentHTML('beforeend', cards);
});
