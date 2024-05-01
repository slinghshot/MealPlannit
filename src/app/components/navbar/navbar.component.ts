import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  name: string = '';
  constructor(private authservice: AuthService, private router: Router) {}

  userLoggedIn: boolean = false;
  ngOnInit() {
    // console.log(this.userLoggedIn);
    this.authservice.checkIfToken();
    this.userLoggedIn = this.authservice.userLoggedIn;
    if (this.userLoggedIn) {
      this.name = this.authservice.getName();
    }
  }

  signOut() {
    this.authservice.signOut();
    this.userLoggedIn = this.authservice.userLoggedIn;
    this.router.navigate(['/']);
  }
}
