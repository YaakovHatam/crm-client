import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-header',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit(): void {

   }

   performLogout(): void {
      this.authService.logout().subscribe(() => {
         this.router.navigate(['']);
      });

   }
}
