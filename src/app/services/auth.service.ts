import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private readonly USER_STORAGE_KEY = 'user';

   private set _currentUser(u: User | undefined) {
      if (u) {
         window.localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(u));
      } else {
         window.localStorage.removeItem(this.USER_STORAGE_KEY);
      }
   }

   private get _currentUser(): User | undefined {
      if (window.localStorage.getItem(this.USER_STORAGE_KEY) == null) return undefined;

      return JSON.parse(window.localStorage.getItem(this.USER_STORAGE_KEY) as string);
   }

   constructor() {
   }

   login(email: string, password: string): Observable<boolean> {
      if (email === 'abc@abc.com') {
         this._currentUser = {
            email: email
         };
      }
      return of(email === 'abc@abc.com');
   }

   logout(): Observable<{}> {
      this._currentUser = undefined;
      return of({});
   }

   currentUser(): Observable<User | undefined> {
      return of(this._currentUser);
   }
}
