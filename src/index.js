import './sass/styles.scss';
import axios from 'axios';
import refs from './js/refs';
import filmCard from './templates/templateMain.hbs';
import genres from './modules/genres';
import templateItem from './templates/templateItem.hbs';

const API_KEY = 'bb0a149304db2d054e912403b986db46';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const movies = axios.get(`/trending/movies/week?api_key=${API_KEY}`);
movies.then(({data}) => console.log(data))
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

  refs.list.insertAdjacentHTML('beforeend', cards);
});


refs.list.addEventListener('click', (e) => {
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
  
})