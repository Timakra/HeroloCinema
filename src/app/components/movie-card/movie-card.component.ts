import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MovieDetailsModalComponent } from './movie-details-modal/movie-details-modal.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // Movie inputed to component from parent
  @Input('movie') movie;
  // Movies poster image link
  posterUrl : string;
  constructor(
    private moviesService : MoviesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.posterUrl = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
  }

  //Opens a movie detail pop up
  openMovieDetail(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.movie;
    //Sets max width and heifht of the dialog panel
    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '90vw';

    this.dialog.open(MovieDetailsModalComponent,dialogConfig);
  }

}
