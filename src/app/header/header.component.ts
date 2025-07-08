import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

constructor(private router: Router){}

goToHome(){
    this.router.navigate(['home']);
}
logout(){
    this.router.navigate(['login']);
}
goToMovies(){
  this.router.navigate(['movies']);
}
goToSongs(){
  this.router.navigate(['songs']);
}

}
