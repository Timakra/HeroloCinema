import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-movie-dialog',
  templateUrl: './delete-movie-dialog.component.html',
  styleUrls: ['./delete-movie-dialog.component.scss']
})
export class DeleteMovieDialogComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<DeleteMovieDialogComponent>
  ) { }

  ngOnInit() {
  }
  //closes dialog and confirms delete
  confirm(){
    this.dialogRef.close(true)
  }
  //closes dialog and cancels delete
  cancel(){
    this.dialogRef.close(false)

  } 
}
