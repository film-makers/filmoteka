import axios from 'axios';
import genres from '../modules/genres';
import refs from '../js/refs';

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import { alert } from '@pnotify/core';

import filmCard from '../templates/templateMain.hbs';

import templateItem from '../templates/templateItem.hbs';
import templateMainQuery from '../templates/templateMainQuery.hbs';
import localStorage from '../js/localStorage';

const API_KEY = 'bb0a149304db2d054e912403b986db46';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// refs.spinner.classList.remove("is-hidden")
// refs.spinner.classList.add("is-hidden");


export default class {
  constructor() {
    this.page = 1;
    this.key = API_KEY;
    this.maxPage = 0;
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
    this.updateButtons(this.maxPage);
  }

  onArrowLeftClick() {
    this.clearPage();
    this.decrementPage();
    this.findMovies();
    this.updateButtons(this.maxPage);
  }

  onPageButtonsClick(event) {
    this.clearPage();
    this.page = Number(event.target.textContent);
    this.findMovies();
    this.updateButtons(this.maxPage);
  }

  updateButtons(lastPage) {
    refs.pageButtons.bpPage.innerHTML = this.page - 2;
    refs.pageButtons.pPage.innerHTML = this.page - 1;
    refs.pageButtons.currentPage.innerHTML = this.page;
    refs.pageButtons.nPage.innerHTML = this.page + 1;
    refs.pageButtons.anPage.innerHTML = this.page + 2;

    const buttons = [
      refs.pageButtons.bpPage,
      refs.pageButtons.pPage,
      refs.pageButtons.currentPage,
      refs.pageButtons.nPage,
      refs.pageButtons.anPage,
      refs.dotsRight,
      refs.pageButtons.lpButton,
      refs.arrowRight,
    ];

    if (lastPage < 6) {
      refs.arrowRight.classList.add('hidden');
      refs.pageButtons.lpButton.classList.add('hidden');
      refs.dotsRight.classList.add('hidden');

      for (let i = 6; i > lastPage; i -= 1) {
        buttons[i].classList.add('hidden');
      }

      if (
        refs.pageButtons.currentPage.textContent > 1 &&
        refs.pageButtons.currentPage.textContent < lastPage
      ) {
        refs.pageButtons.nPage.classList.add('hidden');
        if (lastPage !== 5) {
          refs.pageButtons.anPage.classList.add('hidden');
        }
      }

      if (refs.pageButtons.currentPage.textContent == lastPage) {
        if (lastPage !== 5) {
          refs.pageButtons.fpButton.classList.add('hidden');
          refs.dotsLeft.classList.add('hidden');
        }
        refs.pageButtons.nPage.classList.add('hidden');
        refs.pageButtons.bpPage.classList.remove('hidden');
        refs.arrowLeft.classList.remove('hidden');
      }
    }

    if (this.page === 1) {
      refs.pageButtons.bpPage.classList.add('hidden');
      refs.pageButtons.pPage.classList.add('hidden');
      refs.pageButtons.lpButton.classList.remove('hidden');
      refs.arrowRight.classList.remove('hidden');
      if (lastPage > 5) {
        refs.dotsRight.classList.remove('hidden');
      }
      refs.dotsLeft.classList.add('hidden');
      refs.arrowLeft.classList.add('hidden');
      refs.pageButtons.fpButton.classList.add('hidden');
      if (lastPage !== 1) {
        refs.pageButtons.nPage.classList.remove('hidden');
      }
      if (lastPage !== 2 && lastPage !== 1) {
        refs.pageButtons.anPage.classList.remove('hidden');
      }
      if (lastPage === 1) {
        refs.arrowRight.classList.add('hidden');
        refs.pageButtons.lpButton.classList.add('hidden');
      }
      if (lastPage === 4) {
        refs.dotsRight.classList.add('hidden');
      }
    }

    if (this.page === 2) {
      refs.pageButtons.pPage.classList.remove('hidden');
      refs.pageButtons.bpPage.classList.add('hidden');
      refs.arrowLeft.classList.remove('hidden');
      if (lastPage === 5) {
        refs.pageButtons.lpButton.classList.remove('hidden');
        refs.pageButtons.anPage.classList.remove('hidden');
      }
    }

    if (this.page === 3) {
      refs.pageButtons.bpPage.classList.remove('hidden');
      refs.pageButtons.pPage.classList.remove('hidden');
    }

    if (this.page < 4) {
      refs.dotsLeft.classList.add('hidden');
      refs.pageButtons.fpButton.classList.add('hidden');
    }

    if (this.page === 4) {
      if (lastPage > 5) {
        refs.dotsLeft.classList.remove('hidden');
        refs.pageButtons.bpPage.classList.add('hidden');
      }
      refs.pageButtons.fpButton.classList.remove('hidden');

      if (lastPage === 5) {
        refs.dotsLeft.classList.add('hidden');
        refs.pageButtons.anPage.classList.add('hidden');
        refs.pageButtons.bpPage.classList.remove('hidden');
      }

      if (lastPage === 4) {
        refs.pageButtons.anPage.classList.add('hidden');
        refs.pageButtons.pPage.classList.remove('hidden');
      }
    }

    if (this.page >= 5 && this.page <= 995) {
      refs.pageButtons.bpPage.classList.remove('hidden');
    }

    ///////////
    if (this.page === lastPage && lastPage >= 5) {
      refs.pageButtons.anPage.classList.add('hidden');
      refs.pageButtons.nPage.classList.add('hidden');
      refs.pageButtons.lpButton.classList.add('hidden');
      refs.arrowRight.classList.add('hidden');
      refs.dotsRight.classList.add('hidden');
      refs.pageButtons.pPage.classList.remove('hidden');
      refs.pageButtons.bpPage.classList.remove('hidden');
      refs.dotsLeft.classList.remove('hidden');
      refs.arrowLeft.classList.remove('hidden');
      refs.pageButtons.fpButton.classList.remove('hidden');
    }

    if (this.page === lastPage - 1) {
      refs.pageButtons.nPage.classList.add('hidden');
      refs.pageButtons.lpButton.classList.remove('hidden');
      refs.dotsRight.classList.add('hidden');
      refs.arrowRight.classList.remove('hidden');
    }

    if (this.page === lastPage - 2) {
      refs.pageButtons.nPage.classList.remove('hidden');
      refs.pageButtons.lpButton.classList.remove('hidden');
      refs.pageButtons.anPage.classList.add('hidden');
      refs.arrowRight.classList.remove('hidden');
      refs.dotsRight.classList.add('hidden');
    }

    if (this.page === lastPage - 3) {
      refs.pageButtons.nPage.classList.remove('hidden');
    }

    if (this.page === lastPage - 4) {
      refs.pageButtons.anPage.classList.remove('hidden');
      refs.pageButtons.nPage.classList.remove('hidden');
      refs.dotsRight.classList.remove('hidden');
    }

    if (this.page < lastPage - 4 && this.page > 4) {
      refs.dotsLeft.classList.remove('hidden');
      refs.pageButtons.fpButton.classList.remove('hidden');
      refs.arrowLeft.classList.remove('hidden');
      refs.pageButtons.nPage.classList.remove('hidden');
    }

    if (
      refs.pageButtons.nPage.textContent <= lastPage - 2 &&
      refs.pageButtons.anPage.classList.contains('hidden')
    ) {
      refs.dotsRight.classList.remove('hidden');
    }

    if (this.page === lastPage - 1) {
      refs.pageButtons.anPage.classList.add('hidden');
    }

    if (
      !refs.pageButtons.anPage.classList.contains('hidden') &&
      this.page === lastPage - 3 &&
      lastPage < 7
    ) {
      refs.dotsRight.classList.add('hidden');
    }

    if (
      !refs.pageButtons.bpPage.classList.contains('hidden') &&
      Number(refs.pageButtons.bpPage.textContent) === lastPage - 3 &&
      this.page === lastPage - 1 &&
      lastPage !== 4 &&
      lastPage !== 5
    ) {
      refs.dotsLeft.classList.remove('hidden');
    }

    if (
      !refs.pageButtons.bpPage.classList.contains('hidden') &&
      this.page === lastPage - 1 &&
      lastPage !== 4 &&
      lastPage !== 7 &&
      Number(refs.pageButtons.bpPage.textContent) !== lastPage - 3
    ) {
      refs.pageButtons.fpButton.classList.remove('hidden');
      refs.dotsLeft.classList.add('hidden');
    }

    if (this.page > 1 && this.page < lastPage) {
      refs.arrowLeft.classList.remove('hidden');
      refs.arrowRight.classList.remove('hidden');
    }

    if (
      Number(refs.pageButtons.anPage.textContent) === lastPage - 1 &&
      !refs.pageButtons.anPage.classList.contains('hidden')
    ) {
      refs.dotsRight.classList.add('hidden');
    }

    if (
      !refs.pageButtons.bpPage.classList.contains('hidden') &&
      !refs.dotsLeft.classList.contains('hidden')
    ) {
      refs.pageButtons.fpButton.classList.remove('hidden');
    }

    if (
      !refs.pageButtons.bpPage.classList.contains('hidden') &&
      Number(refs.pageButtons.bpPage.textContent) > 2 &&
      lastPage > 6
    ) {
      refs.dotsLeft.classList.remove('hidden');
      refs.pageButtons.fpButton.classList.remove('hidden');
    }
  }

  updateExtremeButtonsText(firstText, secondText) {
    refs.pageButtons.fpButton.textContent = firstText;
    refs.pageButtons.lpButton.textContent = secondText;
  }


  findMovies() {
    refs.spinner.classList.remove("is-hidden")
    let lastPage;

    const movies = axios.get(
      `/trending/movies/week?api_key=${this.key}&page=${this.page}`,
    );

    const lastPageFinder = movies.then(({ data }) => {
      this.updateExtremeButtonsText(1, data.total_pages);
      this.maxPage = data.total_pages;
      lastPage = this.maxPage;
      return lastPage;
    });

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
    }).finally(() => refs.spinner.classList.add("is-hidden"))

    return lastPageFinder;
  }

  findSpecificMovie(e) {
  refs.spinner.classList.remove("is-hidden")
  refs.inputHeader.classList.add('is-hidden');
  refs.header.classList.remove('site-home');
  refs.header.classList.add('site-film');
  const id = +e.target.id;



  if (e.target.nodeName === 'IMG') {
    const movies = axios.get(`/movie/${id}?api_key=${API_KEY}`);


    movies.then(({data}) => {

      console.log(data),
      refs.main.innerHTML = `${templateItem(data)}`;
        localStorage.setToLocalStorage(data);
    }).catch(error => {
      alert({
        text: `Нет содержимого на бэкенде!`,
        delay: 1000
      })}).finally(() => refs.spinner.classList.add("is-hidden"))


    return;
  } else {
    console.log('нехуй клацать');
  }
  }

  findMovieQuery(query) {
    if (query !== '') {
      refs.spinner.classList.remove("is-hidden")
      const moviesQuery = axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);

      moviesQuery.then(({data}) => {
        if(data.total_results !== 0) {
          refs.list.innerHTML = `${templateMainQuery(data.results)}`
          refs.errorInput.classList.add("is-hidden")
        }
        if(data.total_results === 0) {
          refs.errorInput.classList.remove("is-hidden")
          this.findMovies();
        }
      }).finally(() => refs.spinner.classList.add("is-hidden"))
      return;
    }
    this.findMovies();
  }

  updateMarkup(finalResults) {
    const cards = filmCard(finalResults);

    refs.list.insertAdjacentHTML('afterbegin', cards);

  };

}

