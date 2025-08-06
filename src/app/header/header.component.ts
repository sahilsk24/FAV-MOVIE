// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { MovieTrailersComponent } from '../movie-trailers/movie-trailers.component';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent  {

// constructor(private router: Router){}

// goToHome(){
//     this.router.navigate(['home']);
// }
// logout(){
//     this.router.navigate(['login']);
// }
// goToMovies(){
//   this.router.navigate(['movies']);
// }
// goToSongs(){
//   alert("This feature is not available yet.");
// }
// goToTrailer(){
//   this.router.navigate(['trailers']);  
// }

// }

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Track current route for active navigation highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
    
    // Set initial route
    this.currentRoute = this.router.url;
  }

  goToHome() {
    this.router.navigate(['home']);
    this.closeMenu();
  }

  logout() {
    // Add confirmation dialog for better UX
    if (confirm('Are you sure you want to logout?')) {
      // You might want to clear any stored user data here
      localStorage.removeItem('userToken'); // Example
      sessionStorage.clear(); // Example
      this.router.navigate(['login']);
    }
  }

  goToMovies() {
    this.router.navigate(['movies']);
    this.closeMenu();
  }

  goToSongs() {
    alert("This feature is coming soon! Stay tuned for music content.");
  }

  goToTrailer() {
    this.router.navigate(['trailers']);
    this.closeMenu();
  }

  // Check if a route is currently active
  isActive(route: string): boolean {
    return this.currentRoute.includes(route);
  }

  // Toggle mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Close mobile menu
  closeMenu() {
    this.isMenuOpen = false;
  }

  // Navigate to home when logo is clicked
  goToHomePage() {
    this.router.navigate(['home']);
    this.closeMenu();
  }
}
