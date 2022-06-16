import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/material/dashboard/dashboard.component';
import { AddComponent as addUser } from './components/user/add/add.component';
import { AddComponent as addProgram } from './components/program/add/add.component';
import { AddComponent as addExercise } from './components/exercise/add/add.component';

import { FindComponent as findUser } from './components/user/find/find.component';
import { FindComponent as findProgram } from './components/program/find/find.component';
import { AddProgramComponent } from './components/assign/add-program/add-program.component';
import { UpdateProgramComponent } from './components/assign/update-program/update-program.component';
import { NavMenuComponent } from './components/assign/nav-menu/nav-menu.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  // users routes

  //

  { path: 'add', component: addUser },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'find', component: findUser },
  { path: 'program', component: addProgram },
  { path: 'findProgram', component: findProgram },
  { path: 'exercise', component: addExercise },
  { path: 'assign', component: AddProgramComponent },
  { path: 'updateProgram', component: UpdateProgramComponent },
  { path: 'navProgram', component: NavMenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
