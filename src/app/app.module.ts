import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { TodoModule } from "./todos/todo.module";

//NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { todoReducer } from "./todos/todo.reducers";

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { appReducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    TodoModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      appReducers,
      // {
      //   runtimeChecks: {
      //     strictActionImmutability: false,
      //     strictStateImmutability: false
      //   }
      // }
    ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
