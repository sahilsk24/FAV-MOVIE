import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieTrailersComponent } from './movie-trailers/movie-trailers.component';
import { HomeDownsideComponent } from './home-downside/home-downside.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // default route shows home
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MoviesComponent },
  {  path: 'trailers', component:MovieTrailersComponent },
  {path: 'home-downside', component: HomeDownsideComponent },

    { path: '**', redirectTo: '' } 

];
