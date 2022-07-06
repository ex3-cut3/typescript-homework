class SearchView {
    _parentElement = document.querySelector('.form-inline') as HTMLFormElement;

    getQuery() {
        const q = (
            this._parentElement.querySelector('#search') as HTMLInputElement
        ).value;
        this._clearInput();
        //console.log(q);
        return q;
    }

    _clearInput() {
        (
            this._parentElement.querySelector('#search') as HTMLInputElement
        ).value = '';
    }

    addHandlerSearch(handler: () => void) {
        this._parentElement.addEventListener('submit', (event) => {
            event.preventDefault();
            document
                .querySelectorAll('#button-wrapper>input')
                .forEach((button) => {
                    (<HTMLInputElement>button).checked = false;
                });

            handler();
        });
    }
}

export default new SearchView();
