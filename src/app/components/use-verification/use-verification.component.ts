import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserVerification } from 'src/app/interfaces/user-verification';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-use-verification',
  templateUrl: './use-verification.component.html',
  styleUrls: ['./use-verification.component.css']
})
export class UseVerificationComponent {
  email: string = '';
  verification: string = '';
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.email = params['email'];
        this.verification = params['verification'];
        console.log(this.email,this.verification)
        this.checkUserVerification(this.email, this.verification);
        //http://localhost:4200/#/verification?email="testemail"&verification="okok"
    });
  }

  checkUserVerification(email: string, verification: string){
    console.log(email, verification);
    this.authService.userVerification(email,verification).subscribe({
      next: (value: UserVerification) => {
        if(value.verified){
          Swal.fire({
            title: 'Email verified!',
            icon: 'success',
            confirmButtonColor: '#070f0dd3',
          }).then((result) => this.router.navigate(['/login']));
        }
        else{
          Swal.fire({
            title: 'Verification Failed',
            icon: 'error',
            confirmButtonColor: '#070f0dd3',
          }).then((result) => this.router.navigate(['/']));
        }
      },
      error: (err) =>{
        console.log(err);
        if(err.status === 400){
        Swal.fire({
          title: 'Verification Failed',
          text: err.error.msg,
          icon: 'error',
          confirmButtonColor: '#070f0dd3',
        });
      }
      }
    })
  }

  
}
