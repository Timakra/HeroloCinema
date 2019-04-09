import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap , map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  headers : HttpHeaders;
  
  // a map for api's gener ids ( id to genre map)
  apiGenresMap : {id:number,name:string}[] ;

  // api key
  apiKey : string = "46dd015d93d6f8e33c78cc1e1cc43770";
  // Api auth token
  apiToken : string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRkMDE1ZDkzZDZmOGUzM2M3OGNjMWUxY2M0Mzc3MCIsInN1YiI6IjVjYWI5YzVmOTI1MTQxMDNhMWViMjkzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkqyujOLQfuKnxONfkDEI_fZ-ZQGKOd3FboKLcNIHCA";
  
  constructor(
    private http : HttpClient
  ) {
    // Fetches apis genre map
    this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`).subscribe((data:any)=>{
      this.apiGenresMap = data.genres;
    })
  }
  
  // Fetches movies from omdapi
  getMovies(){
    return this.http.get(`https://api.themoviedb.org/4/list/5376`,{headers:{Authorization:`Bearer ${this.apiToken}`}}).pipe(
      // Extacts query result from object
      map((moviesQuery : any)=>{
        //add random runtime to each movie  (api doesn't give runtime) and translates genre id to a genre string
        return moviesQuery.results.map((movie)=>{
          // random runtime between 120 and 180
          movie.runtime = Math.floor(120 + Math.random() * 60);
          // translates genre id to a genre string
          movie.genres = this.translateGenre(movie.genre_ids)
          return movie;
        })
      }),
      // Filter adult movies (just in case)
      filter(a=>!a.adult)
    )
  }
    
  // Fetchs more details about the movie by movie id
  getMoreDetails(id){
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
  }
    
  //Translates genre ids to genre strings
  translateGenre(genresIds : number[]) : string[]{
    // Goes over all genre ids
    return genresIds.map((genreId)=>{
      // finds the first matching genre id from the mapping objects and returns its name
      return this.apiGenresMap.find((genreMapObj)=>{
        return genreId === genreMapObj.id
      }).name
    })
  }
}
