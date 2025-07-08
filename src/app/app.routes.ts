import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // default route shows home
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent }
];
