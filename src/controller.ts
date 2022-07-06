import resultsView from './Views/resultsView';
import searchView from './Views/searchView';
import * as model from './model';
import { API_URL, KEY } from './helpers/config';
import baseSpecifiedFilmsView from './Views/baseSpecifiedFilmsView';
import randomFilmView from './Views/randomFilmView';
import { state } from './model';
import paginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView';

const controlSearchResults = async function () {
    try {
        // load search results
        const query = searchView.getQuery();
        if (!query || query === '') return;
        document
            .querySelectorAll('#button-wrapper>input')
            .forEach((button) => {
                (<HTMLInputElement>button).checked = false;
            });
        await baseControl(
            `${API_URL}search/movie?api_key=${KEY}&language=en-US&query=${query}`
        );
    } catch (e) {
        console.log(e);
    }
};

export const controlPopularResults = async function (): Promise<void> {
    await baseControl(`${API_URL}movie/popular?api_key=${KEY}&language=en-US`);
};
const controlUpcomingResults = async function (): Promise<void> {
    await baseControl(`${API_URL}movie/upcoming?api_key=${KEY}&language=en-US`);
};
const controlTopRatedResults = async function (): Promise<void> {
    await baseControl(
        `${API_URL}movie/top_rated?api_key=${KEY}&language=en-US`
    );
};

const baseControl = async function (url: string) {
    try {
        // load search results
        await model.loadResults(url, 1);
        // render results and initial pagination
        randomFilmView.render(model.getSearchResultsPage());
        resultsView.render(model.getSearchResultsPage());
    } catch (e) {
        console.log(e);
    }
};

const controlPagination = async function (): Promise<void> {
    try {
        await model.loadResults(state.search.url, ++state.search.page);
        resultsView.render(state.search.results, false);
    } catch (e) {
        console.log(e);
    }
};

const controlBookmarks = function (): void {
    bookmarksView.render(state.bookmarks);
};
export const controlFlowBookmarks = function (): void {
    controlBookmarks();
     model.dealBookmarks( document.querySelector('#film-container') as HTMLElement, true);
     model.dealBookmarks(document.querySelector('#favorite-movies') as HTMLElement, false);
};

export const init = async function (): Promise<void> {
    loadBookmarks();
    bookmarksView.initHandlerOnClick(controlFlowBookmarks);
    searchView.addHandlerSearch(controlSearchResults);
    baseSpecifiedFilmsView.addHandlerOnChange(
        controlPopularResults,
        selectEl('#popular') as HTMLElement
    );
    baseSpecifiedFilmsView.addHandlerOnChange(
        controlUpcomingResults,
        selectEl('#upcoming') as HTMLElement
    );
    baseSpecifiedFilmsView.addHandlerOnChange(
        controlTopRatedResults,
        selectEl('#top_rated') as HTMLElement
    );
    paginationView.addHandlerOnClick(
        controlPagination,
        selectEl('#load-more') as HTMLButtonElement
    );
};

const selectEl = function (selector: string): HTMLElement | null {
    return document?.querySelector(selector)
        ? document.querySelector(selector)
        : null;
};

const loadBookmarks = function () {
    state.bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
};
