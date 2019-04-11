import { Movie } from './models/movies.model';

export interface AppState {
  readonly movies: Movie[];
}