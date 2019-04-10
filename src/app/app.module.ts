import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { titlePipe } from './title.pipe'
//material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material.components';
import { MovieCardComponent } from './components/movie-card/movie-card.component'
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsModalComponent } from './components/movie-card/movie-details-modal/movie-details-modal.component';
import { MovieEditModalComponent } from './components/movie-card/movie-edit-modal/movie-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material';
import { DeleteMovieDialogComponent } from './components/movie-card/delete-movie-dialog/delete-movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MovieCardComponent,
    MovieDetailsModalComponent,
    MovieEditModalComponent,
    titlePipe,
    DeleteMovieDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    MatNativeDateModule,
  ],
  
  entryComponents:[MovieDetailsModalComponent,MovieEditModalComponent,DeleteMovieDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
