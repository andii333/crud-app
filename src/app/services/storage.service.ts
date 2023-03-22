import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _loginAccess = new BehaviorSubject<boolean>(this.getAccess());
  public loginAccess$ = this._loginAccess.asObservable();

  constructor() {
    if (!this.getLogins().length) {
      this.addLogin([{ email: 'admin@asd', password: '1111' }, { email: 'user@asd', password: '2222' }]);
    }
  }

  getAccess(): boolean {
    if (localStorage.getItem('access')) { return true } else { return false }
  }

  getLogins(): Login[] {
    if (localStorage.getItem('logins')) { return JSON.parse(localStorage.getItem('logins') as string) }
    else { return [] }
  }

  addLogin(login: Login[]): void {
    const newLogins = [...this.getLogins(), ...login];
    localStorage.setItem('logins', JSON.stringify(newLogins));
  }

  allowAccess(): void {
    localStorage.setItem('access', 'true');
    this._loginAccess.next(true);
  }

  cancelAccess(): void {
    localStorage.removeItem('access');
    this._loginAccess.next(false);
  }
}
