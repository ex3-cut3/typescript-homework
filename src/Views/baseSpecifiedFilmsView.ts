import View from './view';
import { Film } from '../helpers/interfaces';
import previewView from './previewView';

class baseSpecifiedFilmsView extends View {
    _data: Film[] = [];
    readonly _parentElement: HTMLDivElement;
    _errorMessage = 'No films found.';
    _message = '';
    private _eventTarget: HTMLElement;

    constructor(parentElement: HTMLDivElement) {
        super();
        this._parentElement = parentElement;
        this._eventTarget = this._parentElement;
    }

    _generateMarkup = (): string => {
        return this._data
            .map((result: Film) => previewView._generateMarkup(result))
            .join('');
    };

    addHandlerOnChange(handler: () => void, eventTarget: HTMLElement) {
        eventTarget.addEventListener('change', (event) => {
            event.preventDefault();
            handler();
        });
    }
}

export default new baseSpecifiedFilmsView(
    document.querySelector('#film-container') as HTMLDivElement
);
