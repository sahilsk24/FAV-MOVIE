// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { SafePipe } from '../safe.pipe';
// import { FormsModule } from '@angular/forms';
// import { HeaderComponent } from '../header/header.component';
// @Component({
//   selector: 'app-movie-trailers',
//   imports: [ CommonModule,SafePipe, FormsModule ,HeaderComponent],
//   templateUrl: './movie-trailers.component.html',
//   styleUrl: './movie-trailers.component.css'
// })
// export class MovieTrailersComponent {
//   selectedMovie: any = null;

//   movies = [
//     {
//       id: 1,
//       title: 'RRR',
//       youtubeId: 'f_vbAtFSEc0',
//       rating: 4.2,
//       comments: ['Amazing trailer!', 'Super hyped!']
//     },
//     {
//       id: 2,
//       title: 'Pushpa 2',
//       youtubeId: 'qM-eE0jlYgI',
//       rating: 4.5,
//       comments: ['Can’t wait!', 'Allu Arjun🔥']
//     },
//     {
//       id: 3,
//       title: 'Kalki 2898 AD',
//       youtubeId: '8ukn6mH8gJc',
//       rating: 4.6,
//       comments: ['Futuristic vibes!', 'Nag Ashwin nailed it!']
//     }
//   ];

//   newComment = '';

//   selectMovie(movie: any) {
//     this.selectedMovie = movie;
//     this.newComment = '';
//   }

//   addComment() {
//     if (this.newComment.trim()) {
//       this.selectedMovie.comments.push(this.newComment);
//       this.newComment = '';
//     }
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../safe.pipe';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

interface Movie {
  id: number;
  title: string;
  youtubeId: string;
  rating: number;
  comments: string[];
  genre: string;
  year: number;
  duration: string;
  poster?: string;
}

@Component({
  selector: 'app-movie-trailers',
  imports: [CommonModule, SafePipe, FormsModule, HeaderComponent],
  templateUrl: './movie-trailers.component.html',
  styleUrl: './movie-trailers.component.css'
})
export class MovieTrailersComponent {
  selectedMovie: Movie | null = null;
  newComment = '';
  searchTerm = '';
  sortBy: 'title' | 'rating' | 'year' = 'rating';

  movies: Movie[] = [
    {
      id: 1,
      title: 'RRR',
      youtubeId: 'NgBoMJy386M',
      rating: 4.2,
      comments: ['Amazing trailer!', 'Super hyped!', 'Best Indian cinema!'],
      genre: 'Action',
      year: 2022,
      duration: '3h 7m'
    },
    {
      id: 2,
      title: 'Pushpa 2: The Rule',
      youtubeId: 'g3JUbgOHgdw',
      rating: 4.5,
      comments: ['Can\'t wait!', 'Allu Arjun🔥', 'Fire movie incoming!'],
      genre: 'Action',
      year: 2024,
      duration: '3h 20m'
    },
   
    {
      id: 3,
      title: 'Kalki 2898 AD',
      youtubeId: 'y1-w1kUGuz8',
      rating: 4.6,
      comments: ['Futuristic vibes!', 'Nag Ashwin nailed it!', 'Indian sci-fi at its best!'],
      genre: 'Sci-Fi',
      year: 2024,
      duration: '3h 1m'
    },
    {
      id: 4,
      title: 'Baahubali 2',
      youtubeId: 'qD-6d8Wo3do',
      rating: 4.4,
      comments: ['Epic conclusion!', 'Why Kattappa killed Baahubali?', 'Masterpiece!'],
      genre: 'Epic',
      year: 2017,
      duration: '2h 47m'
    },
    {
      id: 5,
      title: 'KGF Chapter 2',
      youtubeId: 'bDTUFufX-1s',
      rating: 4.3,
      comments: ['Rocky Bhai is back!', 'Mass cinema', 'Yash killed it!'],
      genre: 'Action',
      year: 2022,
      duration: '2h 48m'
    }
  ];

  get filteredAndSortedMovies(): Movie[] {
    let filtered = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'year':
          return b.year - a.year;
        default:
          return 0;
      }
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
    this.newComment = '';
  }

  addComment() {
    if (this.newComment.trim() && this.selectedMovie) {
      this.selectedMovie.comments.push(this.newComment.trim());
      this.newComment = '';
    }
  }

  deleteComment(index: number) {
    if (this.selectedMovie) {
      this.selectedMovie.comments.splice(index, 1);
    }
  }

  goBack() {
    this.selectedMovie = null;
    this.searchTerm = '';
  }

  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return '⭐'.repeat(fullStars) + 
           (hasHalfStar ? '⭐' : '') + 
           '☆'.repeat(emptyStars);
  }
  onImageError(event: Event) {
  (event.target as HTMLImageElement).src = 'assets/default-poster.jpg';
}
}