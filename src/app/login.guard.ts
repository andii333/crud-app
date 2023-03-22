import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  canActivate(): boolean {
    if (localStorage.getItem('access')) { return true } else { return false }
  }

}
