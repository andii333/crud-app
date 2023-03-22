import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private title: Title
  ) { this.title.setTitle('Login | CRUD App') }

  wrongPassword = false;
  wrongEmail = false;
  logins!: Login[];
  showPassword = false;
  form = this.fb.group({
    'email': ['', [Validators.email, Validators.required]],
    'password': ['', Validators.required]
  })

  ngOnInit(): void {
    this.logins = this.storageService.getLogins();
  }

  viewPassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    if (this.logins.findIndex(login => login.email === email && login.password === password) !== -1) {
      this.storageService.allowAccess();
      this.router.navigate(['list']);
    }
    else if (this.logins.findIndex(login => login.email === email) !== -1) {
      this.wrongPassword = true;
      this.wrongEmail = false;
    }
    else {
      this.wrongPassword = false;
      this.wrongEmail = true;
      this.form.controls.password.reset();
    }
  }
}
