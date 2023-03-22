import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
 { path:'login', component: LoginComponent},
  { path:'list', canActivate: [LoginGuard], component: ListComponent},
  { path: 'add', canActivate: [LoginGuard], component: AddComponent},
  { path: 'edit/:id', canActivate: [LoginGuard], component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
