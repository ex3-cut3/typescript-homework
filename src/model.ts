import { ajax } from './helpers/helper';
import { Film } from './helpers/interfaces';

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

        state.search.results = data.results.map((film: Film) => {
            // console.log(state.bookmarks.some((bookmark: Film) => bookmark.id === film.id));
            return {
                id: film.id as number,
                title: film.title as string,
                overview: film.overview
                    ? (film.overview as string)
                    : 'This film(' +
                      film.title +
                      ") doesn't have" +
                      ' description',
                poster_path:
                    film.poster_path === null
                        ? '/src/imgs/image.png'
                        : `https://image.tmdb.org/t/p/original/${film.poster_path}`,
                release_date: film.release_date as string,
                backdrop_path:
                    film.backdrop_path === null
                        ? '/src/imgs/image.png'
                        : `https://image.tmdb.org/t/p/original/${film.backdrop_path}`,
                isBookmarked: state.bookmarks.some(
                    (bookmark: Film) => bookmark.id === film.id
                ),
                //...( film.key && { key: film.key } ),
            };
        });

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

export const getSearchResultsPage = (page = state.search.page): Film[] => {
    state.search.page = page;
    return state.search.results;
};

export const persistBookmarks = (): void => {
    const data = JSON.stringify(state.bookmarks);
    localStorage.setItem('bookmarks', data);
};

export const dealBookmarks = (fnHandler: (...args: never[]) => void): void => {
    document
        .querySelector('#film-container')
        ?.addEventListener('click', (event) => {
            const el: SVGSVGElement | null = (event.target as HTMLElement).closest('svg'); // (1)
            if (!el) return;

            const id: string | undefined = el.dataset.filmId;
            if (!id) return;

            //console.log('Checking el!');
            const film: Film | undefined = state.allRenderedFilms.find(
                (film) => film.id === +id
            );
            if (!film) return;
            film.isBookmarked = !film.isBookmarked;

            let fillColor;
            if (film.isBookmarked) {
                state.bookmarks.push(film);
                fillColor = '#F00';
            } else {
                fillColor = 'none';
                state.bookmarks.splice(
                    state.bookmarks.findIndex(
                        (bookmark) => bookmark.id === film.id
                    ),
                    1
                );
            }
            el.style.fill = fillColor;
            persistBookmarks();
            fnHandler();
        });
};
