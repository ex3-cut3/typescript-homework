import View from './view';
import previewView from './previewView';
import { Film } from '../helpers/interfaces';

class paginationView extends View {
    _data: Film[] = [];
    _parentElement = document.querySelector(
        '#film-container'
    ) as HTMLDivElement;
    _errorMessage =
        'We run out of films for your request. Try searching for something else.';
    _message = '';

    _generateMarkup = () => {
        return this._data
            .map((result: Film) => previewView._generateMarkup(result))
            .join('');
    };

    addHandlerOnClick(handler: () => void, eventTarget: HTMLButtonElement) {
        eventTarget.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        });
    }
}

export default new paginationView();
