import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MovieEditModalComponent } from '../movie-card/movie-edit-modal/movie-edit-modal.component';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private matDialog : MatDialog,
    private moviesService : MoviesService
  ) { }

  ngOnInit() {
  }
  createMovie(){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: "herolo"+Date.now(),
      title: "",
      overview: "",
      genres:[],
      release_date: Date.now(),
      additionalData : {production_companies:[]}

    };
    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '90vw';
    // cancel on click out side closing of the panel
    dialogConfig.disableClose = true;
    // class for the close button
    dialogConfig.panelClass = 'close-button-dialog';
    
    //waits for user to finish editing new movie
    this.matDialog.open(MovieEditModalComponent,dialogConfig).beforeClosed().subscribe((newMovie)=>{
      // if user saves new movie it adds to the list
      if(newMovie){
        this.moviesService.addMovie(newMovie);
      }
    })
  }
}
