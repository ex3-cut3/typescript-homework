import {ajax} from './helpers/helper';
import {Film} from './helpers/interfaces';
import bookmarksView from "./Views/bookmarksView";

export const state = {
    search: {
        url: '',
        results: [] as Film[],
        resultsID: [] as number[],
        page: 1,
    },
    bookmarks: [] as Film[],
    allRenderedFilms: [] as Film[],
};

export const loadResults = async (url: string, page: number): Promise<void> => {
    try {
        // console.log('loadSearchResults');
        // state.search.query = query;
        state.search.page = page;
        const data = await ajax(url + `&page=${page}`);
        state.search.url = url;
        // console.log('Trying this!!! - bookmarks');
        // console.log(state.bookmarks);

        state.search.results = mapper(data);

        if (page === 1) {
            state.allRenderedFilms = state.search.results;
        } else {
            state.allRenderedFilms.push(...state.search.results);
        }
        // console.log(state.allRenderedFilms);
    } catch (e) {
        console.log(e + 'error!!');
        throw e;
    }
};

const mapper = (data: any): Film[] => {
    return data.results.map((film: Film) => {
        // console.log(state.bookmarks.some((bookmark: Film) => bookmark.id === film.id));
        return {
            id: film.id as number,
            title: film.title as string,
            overview: film.overview
                ? (film.overview as string)
                : 'This film(' + film.title + ") doesn't have description",
            poster_path:
                film.poster_path === null
                    ? 'src/imgs/image.png'
                    : `https://image.tmdb.org/t/p/original/${film.poster_path}`,
            release_date: film.release_date as string,
            backdrop_path:
                film.backdrop_path === null
                    ? 'src/imgs/image.png'
                    : `https://image.tmdb.org/t/p/original/${film.backdrop_path}`,
            isBookmarked: state.bookmarks.some(
                (bookmark: Film) => bookmark.id === film.id
            ),
            //...( film.key && { key: film.key } ),
        };
    });
}

export const getSearchResultsPage = (page = state.search.page): Film[] => {
    state.search.page = page;
    return state.search.results;
};

export const persistBookmarks = (): void => {
    const data = JSON.stringify(state.bookmarks);
    localStorage.setItem('bookmarks', data);
};

export const dealBookmarks = (container: HTMLElement, isFilmContainer: boolean): void => {
    container?.addEventListener('click', (event) => {
        const el: SVGSVGElement | null = (
            event.target as HTMLElement
        ).closest('svg'); // (1)
        if (!el) return;

        let id: string = el.dataset.filmId as string;
        if (!id) return;
        id = id?.split('-', 1)[0];

        const film: Film = state.allRenderedFilms.find(
            (film) => film.id === +id
        ) as Film;

        if (!film && !isFilmContainer) { // if removing bookmark while attending another page than from the film was
            // marked as bookmarked via the side container;
            removingEL(id).isBookmarked = false;
            persistBookmarks();
            return;
        }
        film.isBookmarked = !film.isBookmarked;

        let fillColor;
        if (film.isBookmarked) {
            bookmarksView.render([film], false);
            state.bookmarks.push(film);
            fillColor = '#F00';
        } else {
            fillColor = 'none';
            removingEL(id);
            (document.querySelector(`[data-film-id|='${id}'`) as HTMLElement).style.fill = 'none';
        }
        el.style.fill = fillColor;
        persistBookmarks();
    });
};

const removingEL = (id: string | number): Film => {
    document.getElementById(id + '-bookmark')?.remove();
    const [deletedFilm] = state.bookmarks.splice(state.bookmarks.findIndex((bookmark) => bookmark.id === +id), 1);
    return deletedFilm;
}
