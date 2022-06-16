import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';

// app component
import { AppComponent } from './app.component';
import { AddComponent as addUser } from './components/user/add/add.component';
import { AddComponent as addProgram } from './components/program/add/add.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FindComponent as findUser } from './components/user/find/find.component';
import { FindComponent as findProgram } from './components/program/find/find.component';
import { DashboardComponent } from './components/material/dashboard/dashboard.component';
import { CardComponent } from './components/material/card/card.component';
import { AddComponent as addExercise } from './components/exercise/add/add.component';
import { AddProgramComponent } from './components/assign/add-program/add-program.component';
// material angular
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { NavMenuComponent } from './components/assign/nav-menu/nav-menu.component';
import { UpdateProgramComponent } from './components/assign/update-program/update-program.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SocketService } from './services/socket.service';

@NgModule({
  imports: [
    BrowserModule,
    // CommonModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ObserversModule,

    //angular material
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDividerModule,
    MatRadioModule,
    MatTabsModule,
    MatExpansionModule,
    DragDropModule,
    MatTableModule,
  ],
  declarations: [
    AppComponent,
    NavigationComponent,
    addUser,
    addProgram,
    addExercise,
    findUser,
    findProgram,
    //material design

    DashboardComponent,
    CardComponent,
    AddProgramComponent,
    NavMenuComponent,
    UpdateProgramComponent,
    LoginComponent,
    RegisterComponent,
  ],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
