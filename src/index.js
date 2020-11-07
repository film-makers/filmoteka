import './sass/styles.scss';
import axios from 'axios';
import refs from './js/refs';
import filmCard from './templates/film-card.hbs';
import genres from './modules/genres';
//import { renderSync } from 'node-sass';

const API_KEY = 'bb0a149304db2d054e912403b986db46';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = API_KEY;

const movies = axios.get(`/trending/movies/week?api_key=${API_KEY}`);

movies.then(({ data: { results } }) => {
  const mappedResults = results.map(item => ({
    ...item,
    first_air_date: item.first_air_date
      ? item.first_air_date.slice(0, 4)
      : 'No data',
  }));

  console.log(mappedResults);

  const finalResults = mappedResults.map(item => ({
    ...item,
    genre_ids: item.genre_ids
      .map(number => {
        // console.log(number);
        const genre = genres.find(genre => genre.id === number);
        console.log(genre);

        return genre?.name;
      })
      .join(', '),
  }));

  console.log(finalResults);

  const cards = filmCard(finalResults);
  console.log(finalResults);

  refs.container.insertAdjacentHTML('beforeend', cards);
});
