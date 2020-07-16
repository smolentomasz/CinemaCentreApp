export interface Movie{
    id: number;
    description: string;
    duration: string;
    moviePoster: string;
    name: string;
}
export interface Schedule{
    id: number;
    time: string;
    date: string;
    movieId: number;
    movie: Movie;
}
