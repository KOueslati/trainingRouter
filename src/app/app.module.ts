import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeroesModule } from './heroes/heroes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrisisCenterModule } from './crisis-center/crisis-center.module';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CanDeactivateGuard } from './crisis-center/crisis-detail/can-deactivate-guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HeroesModule,
    // CrisisCenterModule, Romeved to use preload the crisis-center module. See the app-routing module.
    // AdminModule, Romeved to use lazy loading the admin module. See the app-routing module.
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Crisis Center Ng DevTools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
  ],
  providers: [CanDeactivateGuard, SelectivePreloadingStrategyService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key, value) => (typeof value === 'function') ? value.name : value;

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
