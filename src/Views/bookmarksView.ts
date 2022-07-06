import View from './view';
import { Film } from '../helpers/interfaces';

class bookmarksView extends View {
    _data: Film[] = [];
    _parentElement = document.querySelector(
        '#favorite-movies'
    ) as HTMLDivElement;
    _errorMessage = '';
    _message = '';

    _generateMarkup = () => {
        return this._data
            .map(
                (film: Film) => `
        <div class="col-12 p-2" id="${film.id}-bookmark">
                    <div class="card shadow-sm">
                        <img alt="Film ${film.title} poster" src="${film.poster_path}">
                        <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill=${
                    film.isBookmarked ? 'red' : 'none'} width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22" data-film-id=${film.id}-bookmark>
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                        </svg>
                        <div class="card-body">
                            <p class="card-text truncate">
                                ${film.overview}
                            </p>
                            <div class="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                ">
                                <small class="text-muted">${film.release_date}</small>
                            </div>
                        </div>
                    </div>
                </div>
        `
            )
            .join('');
    };

    initHandlerOnClick = function (handler: () => void) {
        handler();
    };
}

export default new bookmarksView();
