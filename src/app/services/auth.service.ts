import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private set _jwt(token: string | undefined) {
      if (token) {
         window.localStorage.setItem(environment.STORAGE_KEYS.JWT, token);
      }
   }

   private get _jwt(): string | undefined {
      return window.localStorage.getItem(environment.STORAGE_KEYS.JWT) || undefined;
   }

   private get _currentUser(): User | undefined {
      if (this._jwt) {
         return this.jwtHelperService.decodeToken(this._jwt);
      } else return undefined;
   }

   constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService) {
   }

   login(email: string, password: string): Observable<boolean> {
      const body = { user: email, pass: password };

      return this.httpClient.post(`${environment.api}/auth/login`, body, {
         headers: {
            'content-type': 'application/json',
         },
         responseType: 'text'
      }).pipe(tap(res => this._jwt = res), map(res => !!res));
   }

   logout(): Observable<{}> {
      this._jwt = undefined;
      return of({});
   }

   isLoggedIn(): Observable<boolean> {
      return of(!!this._jwt);
   }
   currentUser(): Observable<User | undefined> {
      return of(this._currentUser);
   }
}
