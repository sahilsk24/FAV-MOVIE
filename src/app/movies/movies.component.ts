// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HeaderComponent } from '../header/header.component';
// import { Movie } from '../models/movie';
// import { MovieService } from '../services/movieservice';
// import { HomeDownsideComponent } from '../home-downside/home-downside.component';

// @Component({
//   selector: 'app-movies',
//   standalone: true,
//   imports: [
//     HeaderComponent,
//     CommonModule,
//     HomeDownsideComponent
// ],
//   templateUrl: './movies.component.html',
//   styleUrls: ['./movies.component.css']
// })
// export class MoviesComponent implements OnInit {
//   // Full movie arrays
//   trendingMovies: Movie[] = [];
//   latestMovies: Movie[] = [];
//   recommendedMovies: Movie[] = [];
//   popularMovies: Movie[] = [];

//   // Limited movie arrays (for initial display)
//   limitedTrendingMovies: Movie[] = [];
//   limitedLatestMovies: Movie[] = [];
//   limitedRecommendedMovies: Movie[] = [];
//   limitedPopularMovies: Movie[] = [];

//   // Toggle flags for view all functionality
//   showAllTrending: boolean = false;
//   showAllLatest: boolean = false;
//   showAllRecommended: boolean = false;
//   showAllPopular: boolean = false;

//   // Movie detail display variables
//   selectedMovie: Movie | null = null;
//   showMovieDetails: boolean = false;

//   constructor(private movieService: MovieService) {}

//   ngOnInit(): void {
//     this.loadMovies();
//   }

//   loadMovies(): void {
//     this.movieService.getMoviesByCategory('Trending-movies').subscribe(
//       movies => {
//         this.trendingMovies = movies;
//         this.limitedTrendingMovies = this.getRandomMovies(movies, 6);
//       }
//     );
    
//     this.movieService.getMoviesByCategory('Latest-movies').subscribe(
//       movies => {
//         this.latestMovies = movies;
//         this.limitedLatestMovies = this.getRandomMovies(movies, 6);
//       }
//     );
    
//     this.movieService.getMoviesByCategory('Recommended-movies').subscribe(
//       movies => {
//         this.recommendedMovies = movies;
//         this.limitedRecommendedMovies = this.getRandomMovies(movies, 6);
//       }
//     );
    
//     this.movieService.getMoviesByCategory('Popular-movies').subscribe(
//       movies => {
//         this.popularMovies = movies;
//         this.limitedPopularMovies = this.getRandomMovies(movies, 6);
//       }
//     );
//   }

//   /**
//    * Selects random movies from an array up to the specified count
//    * @param movies The full array of movies
//    * @param count The number of random movies to select
//    * @returns An array of randomly selected movies
//    */
//   getRandomMovies(movies: Movie[], count: number): Movie[] {
//     if (!movies || movies.length <= count) {
//       return [...movies]; // Return all movies if there are fewer than count
//     }
    
//     // Create a copy of the array to avoid modifying the original
//     const shuffled = [...movies];
    
//     // Shuffle the array using Fisher-Yates algorithm
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
    
//     // Return the first 'count' elements
//     return shuffled.slice(0, count);
//   }

//   /**
//    * Toggles between showing all movies or limited selection for a category
//    * @param section The movie category section to toggle
//    */
//   toggleViewAll(section: string): void {
//     switch (section) {
//       case 'trending':
//         this.showAllTrending = !this.showAllTrending;
//         break;
//       case 'latest':
//         this.showAllLatest = !this.showAllLatest;
//         break;
//       case 'recommended':
//         this.showAllRecommended = !this.showAllRecommended;
//         break;
//       case 'popular':
//         this.showAllPopular = !this.showAllPopular;
//         break;
//     }
//   }

//   showDetails(movie: Movie): void {
//     this.selectedMovie = movie;
//     this.showMovieDetails = true;
//   }

//   closeDetails(): void {
//     this.showMovieDetails = false;
//     this.selectedMovie = null;
//   }




// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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

  // All movies combined for search
  allMovies: Movie[] = [];

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

  // Search and filter functionality
  searchTerm: string = '';
  selectedGenre: string = '';
  selectedYear: string = '';
  sortBy: string = 'name';
  viewMode: 'grid' | 'list' = 'grid';
  filteredMovies: Movie[] = [];
  availableGenres: string[] = [];
  availableYears: string[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getMoviesByCategory('Trending-movies').subscribe(
      movies => {
        this.trendingMovies = movies;
        this.limitedTrendingMovies = this.getRandomMovies(movies, 6);
        this.updateAllMovies();
      }
    );
    
    this.movieService.getMoviesByCategory('Latest-movies').subscribe(
      movies => {
        this.latestMovies = movies;
        this.limitedLatestMovies = this.getRandomMovies(movies, 6);
        this.updateAllMovies();
      }
    );
    
    this.movieService.getMoviesByCategory('Recommended-movies').subscribe(
      movies => {
        this.recommendedMovies = movies;
        this.limitedRecommendedMovies = this.getRandomMovies(movies, 6);
        this.updateAllMovies();
      }
    );
    
    this.movieService.getMoviesByCategory('Popular-movies').subscribe(
      movies => {
        this.popularMovies = movies;
        this.limitedPopularMovies = this.getRandomMovies(movies, 6);
        this.updateAllMovies();
      }
    );
  }

  /**
   * Updates the combined array of all movies for search functionality
   */
  updateAllMovies(): void {
    this.allMovies = [
      ...this.trendingMovies,
      ...this.latestMovies,
      ...this.recommendedMovies,
      ...this.popularMovies
    ];
    
    // Remove duplicates based on movie name
    this.allMovies = this.allMovies.filter((movie, index, self) =>
      index === self.findIndex(m => m.name === movie.name)
    );

    // Extract available genres and years for filters
    this.extractFilters();
    
    // Apply filters if any are active
    if (this.hasActiveFilters()) {
      this.applyFilters();
    }
  }

  /**
   * Extracts unique genres and years from all movies
   */
  extractFilters(): void {
    // Extract genres
    const genres = new Set<string>();
    this.allMovies.forEach(movie => {
      if (movie.genre) {
        // Split multiple genres if they're comma-separated
        movie.genre.split(',').forEach(g => genres.add(g.trim()));
      }
    });
    this.availableGenres = Array.from(genres).sort();

    // Extract years
    const years = new Set<string>();
    this.allMovies.forEach(movie => {
      if (movie.year) {
        years.add(movie.year.toString());
      }
    });
    this.availableYears = Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }

  /**
   * Checks if any filters are currently active
   */
  hasActiveFilters(): boolean {
    return !!(this.searchTerm && this.searchTerm.trim() !== '') || 
           !!this.selectedGenre || 
           !!this.selectedYear;
  }

  /**
   * Handles search functionality
   */
  onSearch(): void {
    this.applyFilters();
  }

  /**
   * Handles genre filter change
   */
  onGenreChange(): void {
    this.applyFilters();
  }

  /**
   * Handles year filter change
   */
  onYearChange(): void {
    this.applyFilters();
  }

  /**
   * Handles sort change
   */
  onSortChange(): void {
    this.applyFilters();
  }

  /**
   * Applies all filters and sorts the results
   */
  applyFilters(): void {
    let filtered = [...this.allMovies];

    // Apply search filter
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const query = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(movie =>
        movie.name.toLowerCase().includes(query) ||
        movie.genre?.toLowerCase().includes(query) ||
        movie.language?.toLowerCase().includes(query) ||
        movie.description?.toLowerCase().includes(query) ||
        movie.year?.toString().includes(query)
      );
    }

    // Apply genre filter
    if (this.selectedGenre) {
      filtered = filtered.filter(movie =>
        movie.genre?.toLowerCase().includes(this.selectedGenre.toLowerCase())
      );
    }

    // Apply year filter
    if (this.selectedYear) {
      filtered = filtered.filter(movie =>
        movie.year?.toString() === this.selectedYear
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    this.filteredMovies = filtered;
  }

  /**
   * Clears all filters
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.selectedGenre = '';
    this.selectedYear = '';
    this.sortBy = 'name';
    this.filteredMovies = [];
  }

  /**
   * Gets the results title based on active filters
   */
  getResultsTitle(): string {
    let title = 'Results';
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      title = `Search Results for "${this.searchTerm}"`;
    } else if (this.selectedGenre || this.selectedYear) {
      title = 'Filtered Results';
    }
    return title;
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