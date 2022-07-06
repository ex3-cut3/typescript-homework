export interface Film {
    release_date: string;
    backdrop_path: string;
    overview: string;
    id: number;
    title: string;
    poster_path: string;
    isBookmarked: boolean;
    //key?: string;
}

export interface FilmData {
    results: Film[];
    page: number;
    total_pages: number;
    total_results: number;
}