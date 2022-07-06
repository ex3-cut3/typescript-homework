import View from './view';
import previewView from './previewView';
import { Film } from '../helpers/interfaces';

class ResultsView extends View {
    _data: Film[] = [];
    _parentElement = document.querySelector(
        '#film-container'
    ) as HTMLDivElement;
    _errorMessage =
        'No films found for your request. Please make it more simple/brief and try again.';
    _message = '';

    _generateMarkup = () => {
        return this._data
            .map((result: Film) => previewView._generateMarkup(result))
            .join('');
    };
}

export default new ResultsView();
