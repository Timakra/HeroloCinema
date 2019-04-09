import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsModalComponent } from './movie-details-modal.component';

describe('MovieDetailsModalComponent', () => {
  let component: MovieDetailsModalComponent;
  let fixture: ComponentFixture<MovieDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
