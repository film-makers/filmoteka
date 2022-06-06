// import { data } from 'autoprefixer';
import refs from './refs';


 const localFilm = [];
 const localQueue = [];
 let id = 0;

export default {


        setToLocalStorage(data) {
        localQueue.push(data);
        localFilm.push(data);
        id = data.id;

        const btnWatch = document.querySelector('.btn-watch');
        const btnQueue = document.querySelector('.btn-queue');

        btnQueue.addEventListener('click', () => {
            const getLocalStorage = localStorage.getItem('queue');
            const parsedLocalFilm = JSON.parse(getLocalStorage);
    
            const isFind = parsedLocalFilm && parsedLocalFilm.some(e => e.id === id);

            if (isFind) {
                const checkInLocalStorage = parsedLocalFilm.filter(e => e.id !== id);
                localStorage.setItem('queue', JSON.stringify(checkInLocalStorage));
                btnQueue.textContent = 'Add to queue';
            }
            else {
                if (isFind===null){
                    localStorage.setItem('queue', JSON.stringify(localQueue));
                    btnQueue.textContent = 'Remove queue';
                    return;
                }
                const aaa = [...parsedLocalFilm, data]
                localStorage.setItem('queue', JSON.stringify(aaa));
                btnQueue.textContent = 'Remove queue';
            }
        })


        btnWatch.addEventListener('click', () => {
            const getLocalStorage = localStorage.getItem('watched');
            const parsedLocalFilm = JSON.parse(getLocalStorage);
    
            const isFind = parsedLocalFilm && parsedLocalFilm.some(e => e.id === id);

            if (isFind) {
                const checkInLocalStorage = parsedLocalFilm.filter(e => e.id !== id);
                localStorage.setItem('watched', JSON.stringify(checkInLocalStorage));
                btnWatch.textContent = 'Add to watched';
            }
            else {
                if (isFind===null){
                    localStorage.setItem('watched', JSON.stringify(localFilm));
                    btnWatch.textContent = 'Remove watched';
                    return;
                }
                const aaa = [...parsedLocalFilm, data]
                localStorage.setItem('watched', JSON.stringify(aaa));
                btnWatch.textContent = 'Remove watched';
                
            }
        })


        const getLocalStorage = localStorage.getItem('watched');
        const parsedLocalFilm = JSON.parse(getLocalStorage);


        const isFind = parsedLocalFilm && parsedLocalFilm.some(e => e.id === id);
            if (isFind) {
                btnWatch.textContent = 'Remove watched';
            }
            else {
            btnWatch.textContent = 'Add to watched';
            }       


            const getLocalStorageQueue = localStorage.getItem('queue');
            const parsedLocalQueue = JSON.parse(getLocalStorageQueue);

            const isFindQue = parsedLocalQueue && parsedLocalQueue.some(e => e.id === id);
            if (isFindQue) {
                btnQueue.textContent = 'Remove queue';
            }
            else {
            btnQueue.textContent = 'Add to queue';
            }    
    },


}
