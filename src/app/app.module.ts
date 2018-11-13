import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import { DeviceWrapperComponent } from './device-wrapper/device-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    CompareComponent,
    DeviceWrapperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
