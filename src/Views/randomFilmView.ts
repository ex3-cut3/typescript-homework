import View from './view';
import { Film } from '../helpers/interfaces';

class RandomFilmView extends View {
    _data: Film[] = [];
    _parentElement = document.querySelector(
        '.mx-auto.col-md-8.col-lg-6'
    ) as HTMLElement;
    _errorMessage = '';
    _message = '';

    _generateMarkup = () => {
        const randFilm =
            this._data[Math.floor(Math.random() * this._data.length)];
        (
            document.querySelector('#random-movie') as HTMLElement
        ).style.backgroundImage = `url(${randFilm.backdrop_path})`;
        return `
        <h1 id="random-movie-name" class="fw-light text-light">${
            randFilm.title
        }</h1>
                        <p id="random-movie-description" class="lead text-white">
                            ${
                                randFilm.overview
                                    ? randFilm.overview
                                    : 'No films to suggest!'
                            }
                        </p>
        `;
    };
}

export default new RandomFilmView();
