// import { data } from 'autoprefixer';
import refs from './refs';


 const localFilm = [];
 let id = 0;

export default {
        setToLocalStorage(data) { 
        localFilm.push(data);
        id = data.id;

        const btnWatch = document.querySelector('.btn-watch');
        btnWatch.addEventListener('click', () => {
            const getLocalStorage = localStorage.getItem('watched');
            const parsedLocalFilm = JSON.parse(getLocalStorage);
    
            const isFind = parsedLocalFilm && parsedLocalFilm.some(e => e.id === id);
            console.log('isFind',isFind);

            if (isFind) {
                // console.log('Удаляем');
                const checkInLocalStorage = parsedLocalFilm.filter(e => e.id !== id);
                localStorage.setItem('watched', JSON.stringify(checkInLocalStorage));
                btnWatch.textContent = 'Add to watched';
            }
            else {
                // console.log('Добавляем');
                if (isFind===null){
                    localStorage.setItem('watched', JSON.stringify(localFilm));
                    btnWatch.textContent = 'Remove from watched';
                    return;
                }
                const aaa = [...parsedLocalFilm, data]
                console.log('aaa', aaa);
                localStorage.setItem('watched', JSON.stringify(aaa));
                btnWatch.textContent = 'Remove from watched';
                
            }
        })


        const getLocalStorage = localStorage.getItem('watched');
        const parsedLocalFilm = JSON.parse(getLocalStorage);

        const isFind = parsedLocalFilm && parsedLocalFilm.some(e => e.id === id);
            if (isFind) {
                btnWatch.textContent = 'Remove from watched';
            }
            else {
            btnWatch.textContent = 'Add to watched';
            }          
    },


}
