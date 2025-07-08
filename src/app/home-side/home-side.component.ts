import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movieservice';

@Component({
  selector: 'app-home-side',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-side.component.html',
  styleUrl: './home-side.component.css'
})
export class HomeSideComponent implements OnInit{
  
  TopPickforyou: Movie[] = [];

  // Limited movie arrays (for initial display)

  limitedTopPickforyou: Movie[] = [];

 
  showAllTopPicks: boolean = false;

  // Movie detail display variables
  selectedMovie: Movie | null = null;
  showMovieDetails: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMoviesByCategory('Top-Pick-for-you').subscribe(
      movies => {
        this.TopPickforyou = movies;
        this.limitedTopPickforyou = this.getRandomMovies(movies, 6);
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
  
  toggleViewAll(): void {
    this.showAllTopPicks = !this.showAllTopPicks;
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
