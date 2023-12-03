import { Component } from '@angular/core';
import { EngineService } from '../../services/engine.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(
    private engineservice: EngineService,
    private authservice: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.authservice.checkIfToken();
    if (this.authservice.userLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  submit() {
    console.log('button clicked');
    console.log(this.email, this.email);
    this.authservice.login(this.email, this.password).subscribe({
      next: (value) => {
        console.log(`welcome ${value.user.name}`);
        console.log(value.token);
        this.authservice.name = value.user.name;
        this.authservice.setToken(value.token);
        this.authservice.userLoggedIn = true;
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 401) {
          console.log('unauthorized homie');
        }
        console.log(error);
      },
    });
  }
}
