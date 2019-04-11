import { Action } from '@ngrx/store'
import { Movie,MovieAdditionalInfo,ProductionCompanies } from './../models/movies.model'


export const ADD_MOVIE       = '[MOVIE] Add'
export const REMOVE_MOVIE    = '[MOVIE] Remove'
export const EDIT_MOVIE    = '[MOVIE] Edit'


export class AddMovie implements Action {
    readonly type = ADD_MOVIE

    constructor(public payload :{ movie: Movie}) {}
}

export class EditMovie implements Action {
    readonly type = EDIT_MOVIE

    constructor(public payload: {   modifyId: string, 
                                    editedMovie: Movie}) {}
}

export class RemoveMovie implements Action {
    readonly type = REMOVE_MOVIE

    constructor(public payload:{removeId: string}) {}
}

// Section 4
export type Actions = AddMovie | RemoveMovie | EditMovie