// as mentioned in api https://developers.themoviedb.org/4/list/get-list
interface Movie {
    poster_path?:string | null;
    adult? : boolean;
    overview? : string;
    release_date? : string;
    original_title?:string;
    genre_ids?:number[];
    id?:number;
    media_type :string;
    original_language?: string;
    title?: string;
    backdrop_path?:string | null;
    popularity?:number;
    vote_count?:number;
    video?:boolean;
    vote_average?:number;
    additionalData: MovieAdditionalInfo;
    genres: string[];
    runtime: number;
    posterUrl: string | ArrayBuffer;
    new: boolean;
}

// as mentiones in the api https://developers.themoviedb.org/3/movies/get-movie-details
interface MovieAdditionalInfo {
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

interface  ProductionCompanies {
    iso_3166_1?:string
    name:string
}