import { Action } from '@ngrx/store'
import { Movie } from './../models/movies.model'
import * as MovieActions from './../actions/movies.action'

// Section 1
const initialState: Movie[] = [];

// Section 2
export function movieReducer(state: Movie[] = initialState, action: MovieActions.Actions) {

    // Section 3
    switch(action.type) {
        case MovieActions.ADD_MOVIE:
            return [
                action.payload.movie,
                ...state, 
            ];
        case MovieActions.REMOVE_MOVIE:
            return state.filter((movie)=>{return movie.id !== action.payload.removeId});
        case MovieActions.EDIT_MOVIE:
            return state.map((movie)=>{
                return movie.id === action.payload.modifyId ? action.payload.editedMovie : movie;
            });
        default:
            return state;
    }
}