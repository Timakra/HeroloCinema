import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { MoviesService } from 'src/app/services/movies.service';
import { MovieEditModalComponent } from '../movie-edit-modal/movie-edit-modal.component';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.component.html',
  styleUrls: ['./movie-details-modal.component.scss']
})
export class MovieDetailsModalComponent implements OnInit {
  additionalData;
  constructor(
    public dialogRef: MatDialogRef<MovieDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public movie: any,
    public matDialog : MatDialog,
    private moviesService : MoviesService
  ) { }

  ngOnInit() {
    // Fetch a bit more data about the movie ( like production companies ) if didnt fetch yet
    if(!this.movie.additionalData){
      this.moviesService.getMoreDetails(this.movie.id).subscribe((data)=>{
        this.movie.additionalData = data;
      })
    }
  }
  openEdit(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.movie;
    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '90vw';
    // cancel on click out side closing of the panel
    dialogConfig.disableClose = true;
    // class for the close button
    dialogConfig.panelClass = 'close-button-dialog';
    

    this.matDialog.open(MovieEditModalComponent,dialogConfig).beforeClosed().subscribe((savedMovie)=>{
      if(savedMovie){
        this.movie = savedMovie
      }
    })
  }



}