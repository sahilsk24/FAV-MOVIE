import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { HomeSideComponent } from '../home-side/home-side.component';
import { HomeDownsideComponent } from '../home-downside/home-downside.component';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movieservice';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HomeSideComponent,
    HomeDownsideComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Movie[] = [];
  selectedMovie: Movie | null = null;
  showMovieDetails: boolean = false;
  
  constructor(
    public router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    // Initialize component
    
  }

  searchMovies(): void {
    if (this.searchQuery.trim() !== '') {
      this.movieService.searchMovies(this.searchQuery).subscribe(
        results => {
          this.searchResults = results;
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  showDetails(movie: Movie): void {
    this.selectedMovie = movie;
    this.showMovieDetails = true;
  }

  closeDetails(): void {
    this.showMovieDetails = false;
    this.selectedMovie = null;
  }
}

