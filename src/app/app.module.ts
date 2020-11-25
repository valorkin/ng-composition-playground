import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HappyClappyZack } from './composition/mixed';

@NgModule({
  declarations: [
    AppComponent,
    HappyClappyZack
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
