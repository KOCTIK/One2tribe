import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './_services/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'One2tribe';
  

  constructor(
    private router: Router,
    private jwtService: JwtService
  ){}


  get isAuthorized(){
    return this.jwtService.currentTokenValue != undefined;
  }

  logout() {
    this.jwtService.logout();
    this.router.navigate(['/login']); 
}
}
