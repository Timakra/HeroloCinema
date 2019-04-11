import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap  } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeleteMovieDialogComponent } from '../components/movie-card/delete-movie-dialog/delete-movie-dialog.component';
import { Movie, MovieAdditionalInfo } from './../models/movies.model';
import * as MovieActions from './../actions/movies.action';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from './../app.state';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  headers : HttpHeaders;
  movies : Movie[];
  // moviesSubject : BehaviorSubject<any> = new BehaviorSubject(null);
  moviesState : Observable<Movie[]>


  // a map for api's gener ids ( id to genre map)
  apiGenresMap : {id:number,name:string}[] ;

  // api key
  apiKey : string = "46dd015d93d6f8e33c78cc1e1cc43770";
  // Api auth token
  apiToken : string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmRkMDE1ZDkzZDZmOGUzM2M3OGNjMWUxY2M0Mzc3MCIsInN1YiI6IjVjYWI5YzVmOTI1MTQxMDNhMWViMjkzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JkqyujOLQfuKnxONfkDEI_fZ-ZQGKOd3FboKLcNIHCA";
  
  constructor(
    private http : HttpClient,
    private matDialog : MatDialog,
    private store: Store<AppState>
  ) {
    // selects movies state in store
    this.moviesState = this.store.select('movies');
    this.moviesState.subscribe((fromStateMovies)=>{
      this.movies = fromStateMovies
    })
    // Fetches apis genre map
    this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`).subscribe((data:any)=>{
      this.apiGenresMap = data.genres;
    })
  }
  // gives access to the movies behavoiur subject
  getMovies(){
    return this.store.select('movies')
  }
  // Fetches movies from omdapi
  fetchMovies(){
    let sub = this.http.get(`https://api.themoviedb.org/4/list/5376`,{headers:{Authorization:`Bearer ${this.apiToken}`}}).pipe(
      // Extacts query result from object
      map((moviesQuery : {results:Movie[]})=>{
        //add random runtime to each movie  (api doesn't give runtime) and translates genre id to a genre string
        return moviesQuery.results
        // Filter adult movies (just in case)
        .filter(a=>!a.adult)
        .map((movie)=>{
          // random runtime between 120 and 180
          movie.runtime = Math.floor(120 + Math.random() * 60);
          // translates genre id to a genre string
          movie.genres = this.translateGenre(movie.genre_ids)
          movie.posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          // adds movie to movies state list
          this.store.dispatch(new MovieActions.AddMovie({movie}))
        })
      }),
      //unsbscribes from fetching data
      tap(()=>{sub.unsubscribe()})
    ).subscribe()
  }
  // opens a confirm dialog to delete movie deletes movie
  deleteMovie(id : string){
    let ref = this.matDialog.open(DeleteMovieDialogComponent);
    ref.beforeClosed().subscribe(confirm=>{
      //if user confirm deletes movie
      if(confirm){
          this.store.dispatch(new MovieActions.RemoveMovie({removeId:id}))
      } 
    })
    return ref;
  } 
  // Fetchs more details about the movie by movie id 
  getMoreDetails(id){
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`).subscribe((data : MovieAdditionalInfo)=>{
        //updates the behavior subject with addtional data
        this.movies.map((movie)=>{
          if(movie.id === id){
            movie.additionalData = data;
            this.store.dispatch(new MovieActions.EditMovie({editedMovie:movie,modifyId:id}))
          }
          return movie;
        })
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
    this.movies.map(movie=>{
      if(id != movie.id && movie.title.toLowerCase() === title.toLowerCase()){
        exist = true;
        return;
      }
    })
    return exist;
  }

  //adds movie to the list
  addMovie(movie){
    this.store.dispatch(new MovieActions.AddMovie({movie}))
  }
}
