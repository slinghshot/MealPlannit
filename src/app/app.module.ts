import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import {
  AuthInterceptorInterceptor,
  AuthInterceptorProvider,
} from './interceptors/auth-interceptor.interceptor';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MealComponent } from './components/meal/meal.component';
import { CreateMealComponent } from './components/create-meal/create-meal.component';
import { MealEditorComponent } from './components/meal-editor/meal-editor.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { PrintableComponent } from './components/printable/printable.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { BrowseComponent } from './components/browse/browse.component';
import { FooterComponent } from './components/footer/footer.component';
import { UseVerificationComponent } from './components/use-verification/use-verification.component';


const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'meals', component: MealComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'groceryList', component: GroceryListComponent },
  { path: 'printable', component: PrintableComponent },
  { path: 'verification', component: UseVerificationComponent},
  // { path: '', children: [{ path: 'search/:input', component: MainComponent }] },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    SignUpComponent,
    MealComponent,
    CreateMealComponent,
    MealEditorComponent,
    GroceryListComponent,
    PrintableComponent,
    SpinnerComponent,
    BrowseComponent,
    FooterComponent,
    UseVerificationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserAnimationsModule,
    // MatButtonModule,
    // MatIconModule,
    // MatInputModule,
    NgbCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    NgbTypeaheadModule,
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
