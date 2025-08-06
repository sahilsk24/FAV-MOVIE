import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTrailersComponent } from './movie-trailers.component';

describe('MovieTrailersComponent', () => {
  let component: MovieTrailersComponent;
  let fixture: ComponentFixture<MovieTrailersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTrailersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTrailersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
