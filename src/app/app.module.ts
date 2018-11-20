import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import { DeviceWrapperComponent } from './device-wrapper/device-wrapper.component';

import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AppService } from './app.service';
import { AuthoringComponent } from './authoring/authoring.component';
import { PreviewComponent } from './preview/preview.component';
import { AppRoutingModule } from './app.routing';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    'swipe': { direction: Hammer.DIRECTION_ALL }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    CompareComponent,
    DeviceWrapperComponent,
    AuthoringComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
