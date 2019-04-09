import { Component } from '@angular/core';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movies = [1,2,3,4,5]
  constructor(
    private moviesService : MoviesService
  ){
    // Fetch movies from api
    this.moviesService.getMovies().subscribe((movies)=>{
      this.movies = movies
    })
  }
}
