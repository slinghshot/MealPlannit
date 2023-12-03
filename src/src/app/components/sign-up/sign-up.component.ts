import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EngineService } from 'src/app/services/engine.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  errorMsg: string = '';

  constructor(
    private engineservice: EngineService,
    private authservice: AuthService,
    private router: Router
  ) {}

  onRegister() {
    console.log('button clicked');
    console.log(this.name, this.email, this.password);
    this.authservice.register(this.name, this.email, this.password).subscribe({
      next: (value) => {
        // console.log(`welcome ${value.user.name}`);
        // console.log(value.token);
        // this.authservice.name = value.user.name;
        // this.authservice.setToken(value.token);
        // this.authservice.userLoggedIn = true;
        console.log(value);
        console.log(value.user.name);
        Swal.fire({
          title: 'Email Verification Sent',
          icon: 'success',
          confirmButtonColor: '#070f0dd3',
        }).then((result) => this.router.navigate(['/login']));
        // this.router.navigate(['/login']);
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
