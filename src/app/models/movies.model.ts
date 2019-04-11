// as mentioned in api https://developers.themoviedb.org/4/list/get-list
export interface Movie {
    id: string;
    title: string;
    overview : string;
    release_date : string;
    poster_path?:string | null;
    adult? : boolean;
    original_title?:string;
    genre_ids?:number[];
    media_type? :string;
    original_language?: string;
    backdrop_path?:string | null;
    popularity?:number;
    vote_count?:number;
    video?:boolean;
    vote_average?:number;
    additionalData?: MovieAdditionalInfo;
    genres?: string[];
    runtime?: number;
    posterUrl?: string | ArrayBuffer;
    new?: boolean;
}

// as mentiones in the api https://developers.themoviedb.org/3/movies/get-movie-details
export interface MovieAdditionalInfo {
    adult: boolean;
    backdrop_path: string | null
    belongs_to_collection:null | any
    budget: number
    genres: any[]
    homepage:string|null
    id:number
    imdb_id:string | null
    original_language:string
    original_title:string
    overview: string | null
    popularity:number
    poster_path:string | null
    production_companies: ProductionCompanies[]
    production_countries:any[]
    release_date:string
    revenue:number
    runtime:number | null
    spoken_languages: any[]
    status:string
    tagline:string | null
    title:string
    video:boolean
    vote_average:number,
    
}

export interface  ProductionCompanies {
    iso_3166_1?:string
    name:string
}