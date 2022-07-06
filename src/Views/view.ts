import { Film } from '../helpers/interfaces';

export default abstract class View {
    _data: Film[] = [];

    abstract _generateMarkup(oneFilm?: Film): string;
    abstract readonly _parentElement?: HTMLElement;
    abstract _errorMessage: string;
    abstract _message: string;

    render(data: Film[], shouldClearParent = true): void {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        shouldClearParent ? this._clearParent() : null;
        this._parentElement?.insertAdjacentHTML('beforeend', markup);
    }

    _clearParent = (): string => ((this._parentElement as HTMLElement).innerHTML = '');

    renderError(message = this._errorMessage): void {
        (this._parentElement as HTMLElement).innerHTML = `<div class = "error">
      <p style="color: red; font-size: 32px;">${message}</p>
   </div>`;
        const section = document.querySelector('#random-movie') as HTMLElement;
        section.style.backgroundImage = 'none';
    }

    renderMessage(message = this._message): void {
        const markup = `
<div class = "message">
      <p style="color: orange; font-size: 32px;">${message}</p>
   </div>`;
        (this._parentElement as HTMLElement).innerHTML = markup;
    }
}
