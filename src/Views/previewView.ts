import View from './view';
import {Film} from '../helpers/interfaces';

class PreviewView extends View {
    _parentElement?: HTMLElement | undefined;
    _errorMessage = '';
    _message = '';

    _generateMarkup = function (oneFilm: Film): string {
        // console.log(oneFilm.key);
        return `
        <div class="col-lg-3 col-md-4 col-12 p-2" id="${oneFilm.id}">
            <div class="card shadow-sm">
                                <img alt="Film ${oneFilm.title} poster" src="${oneFilm.poster_path}">
                                <svg xmlns="http://www.w3.org/2000/svg" stroke="red" fill=${
            oneFilm.isBookmarked ? 'red' : 'none'
        } width="50" height="50" class="bi bi-heart-fill position-absolute p-2" viewBox="0 -2 18 22" data-film-id="${oneFilm.id}">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
                                </svg>
                                <div class="card-body">
                                    <p class="card-text truncate">
                                        ${oneFilm.overview}
                                    </p>
                                    <div class="
                                            d-flex
                                            justify-content-between
                                            align-items-center
                                        ">
                                        <small class="text-muted">${
            oneFilm.release_date
        }</small>
                                    </div>
                                </div>
            </div>
        </div>
      `;
    };
}

export default new PreviewView();
