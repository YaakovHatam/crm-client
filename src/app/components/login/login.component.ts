import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   error: string = '';
   constructor(private authService: AuthService, private router: Router) { }


   ngOnInit(): void {
   }

   login(emailInput: HTMLInputElement, passInput: HTMLInputElement): void {
      this.error = '';
      this.authService.login(emailInput.value, passInput.value).subscribe(res => {
         if (res) {
            this.router.navigateByUrl('/dashboard');
         } else {
            this.error = 'Problem!';
         }
      })

   }

}
