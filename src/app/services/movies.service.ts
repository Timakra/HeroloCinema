import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap , map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeleteMovieDialogComponent } from '../components/movie-card/delete-movie-dialog/delete-movie-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  headers : HttpHeaders;
  
  moviesSubject : BehaviorSubject<any> = new BehaviorSubject(null);

  // a map for api's gener ids ( id to genre map)
  apiGenresMap : {id:number,name:string}[] ;

  // api key
  apiKey : string = "46dd015d93d6f8e33c78cc1e1cc43770";
  // Api auth token
  apiToken : string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRkMDE1ZDkzZDZmOGUzM2M3OGNjMWUxY2M0Mzc3MCIsInN1YiI6IjVjYWI5YzVmOTI1MTQxMDNhMWViMjkzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkqyujOLQfuKnxONfkDEI_fZ-ZQGKOd3FboKLcNIHCA";
  
  constructor(
    private http : HttpClient,
    private matDialog : MatDialog
  ) {
    // Fetches apis genre map
    this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`).subscribe((data:any)=>{
      this.apiGenresMap = data.genres;
    })
    // Fetchs movies and stores it in a behavour subject to share across components
    this.fetchMovies().subscribe((movies)=>{
      this.moviesSubject.next(movies);
    })
  }
  // gives access to the movies behavoiur subject
  getMovies(){
    return this.moviesSubject
  }
  // Fetches movies from omdapi
  fetchMovies(){
    return this.http.get(`https://api.themoviedb.org/4/list/5376`,{headers:{Authorization:`Bearer ${this.apiToken}`}}).pipe(
      // Extacts query result from object
      map((moviesQuery : {results:Movie[]})=>{
        //add random runtime to each movie  (api doesn't give runtime) and translates genre id to a genre string
        return moviesQuery.results.map((movie)=>{
          // random runtime between 120 and 180
          movie.runtime = Math.floor(120 + Math.random() * 60);
          // translates genre id to a genre string
          movie.genres = this.translateGenre(movie.genre_ids)
          movie.posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          return movie;
        })
        // Filter adult movies (just in case)
        .filter(a=>!a.adult)
      }),
    )
  }
  // opens a confirm dialog to delete movie deletes movie
  deleteMovie(id){
    let ref = this.matDialog.open(DeleteMovieDialogComponent);
    ref.beforeClosed().subscribe(confirm=>{
      //if user confirm deletes movie
      if(confirm){
        this.moviesSubject.next(this.moviesSubject.value.filter(movie=>{
          return !(movie.id === id);
        }))
      } 
    })
    return ref;
  } 
  // Fetchs more details about the movie by movie id 
  getMoreDetails(id){
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`).subscribe((data)=>{
        //updates the behavior subject with addtional data
        this.moviesSubject.next(this.moviesSubject.value.map((movie)=>{
          if(movie.id === id){
            movie.additionalData = data;
          }
          return movie;
        }))
      })
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

  //checks if title allready exist
  checkTitle(title,id){
    let exist = false;
    this.moviesSubject.value.map(movie=>{
      if(id != movie.id && movie.title.toLowerCase() === title.toLowerCase()){
        exist = true;
        return;
      }
    })
    return exist;
  }

  //adds movie to the list
  addMovie(movie){
    this.moviesSubject.value.unshift(movie) 
  }
}
