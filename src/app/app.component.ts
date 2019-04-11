import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';
import { Movie } from './models/movies.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies : Movie[] = []
  constructor(
    private moviesService : MoviesService
  ){
    // Fetch movies from api
    this.moviesService.fetchMovies();
    this.moviesService.getMovies().subscribe((movies)=>{
      this.movies = movies
    })
  }
}
