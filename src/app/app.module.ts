import { MapEffects } from './store/map/map.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { StoreModule } from '@ngrx/store';
import { rootReducer } from '../app/store/root.reducer';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(rootReducer, {}),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
        maxAge: 25,
        name: 'Keshtyar Test'
      }),
    EffectsModule.forRoot([
      MapEffects
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
