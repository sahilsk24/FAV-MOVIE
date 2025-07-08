import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movieservice';
import { HomeDownsideComponent } from '../home-downside/home-downside.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    HomeDownsideComponent
],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  // Full movie arrays
  trendingMovies: Movie[] = [];
  latestMovies: Movie[] = [];
  recommendedMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  // Limited movie arrays (for initial display)
  limitedTrendingMovies: Movie[] = [];
  limitedLatestMovies: Movie[] = [];
  limitedRecommendedMovies: Movie[] = [];
  limitedPopularMovies: Movie[] = [];

  // Toggle flags for view all functionality
  showAllTrending: boolean = false;
  showAllLatest: boolean = false;
  showAllRecommended: boolean = false;
  showAllPopular: boolean = false;

  // Movie detail display variables
  selectedMovie: Movie | null = null;
  showMovieDetails: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMoviesByCategory('Trending-movies').subscribe(
      movies => {
        this.trendingMovies = movies;
        this.limitedTrendingMovies = this.getRandomMovies(movies, 6);
      }
    );
    
    this.movieService.getMoviesByCategory('Latest-movies').subscribe(
      movies => {
        this.latestMovies = movies;
        this.limitedLatestMovies = this.getRandomMovies(movies, 6);
      }
    );
    
    this.movieService.getMoviesByCategory('Recommended-movies').subscribe(
      movies => {
        this.recommendedMovies = movies;
        this.limitedRecommendedMovies = this.getRandomMovies(movies, 6);
      }
    );
    
    this.movieService.getMoviesByCategory('Popular-movies').subscribe(
      movies => {
        this.popularMovies = movies;
        this.limitedPopularMovies = this.getRandomMovies(movies, 6);
      }
    );
  }

  /**
   * Selects random movies from an array up to the specified count
   * @param movies The full array of movies
   * @param count The number of random movies to select
   * @returns An array of randomly selected movies
   */
  getRandomMovies(movies: Movie[], count: number): Movie[] {
    if (!movies || movies.length <= count) {
      return [...movies]; // Return all movies if there are fewer than count
    }
    
    // Create a copy of the array to avoid modifying the original
    const shuffled = [...movies];
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the first 'count' elements
    return shuffled.slice(0, count);
  }

  /**
   * Toggles between showing all movies or limited selection for a category
   * @param section The movie category section to toggle
   */
  toggleViewAll(section: string): void {
    switch (section) {
      case 'trending':
        this.showAllTrending = !this.showAllTrending;
        break;
      case 'latest':
        this.showAllLatest = !this.showAllLatest;
        break;
      case 'recommended':
        this.showAllRecommended = !this.showAllRecommended;
        break;
      case 'popular':
        this.showAllPopular = !this.showAllPopular;
        break;
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