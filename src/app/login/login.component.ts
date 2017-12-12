import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = null;
  
  constructor(private authService: AuthService, private router: Router) {}

/*
Make they App by Providers

    signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => { 
          this.router.navigate(['Chat-Lutation'])
        })
      .catch((err) => console.log(err));
    }

    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => { 
          this.router.navigate(['Chat-Lutation'])
        })
      .catch((err) => console.log(err));
    }

    signInWithGithub() {
      this.authService.signInWithGithub()
      .then((res) => { 
          this.router.navigate(['Chat-Lutation'])
        })
      .catch((err) => console.log(err));
    }
*/

    signInWithGoogle() {
      this.authService.signInWithGoogle()
      .then((res) => { 
          this.router.navigate(['Chat-Lutation'])
        })
      .catch((err) => console.log(err));
    }

  ngOnInit() {}

}