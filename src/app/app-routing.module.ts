import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { AuthGuard } from './auth/auth.guard';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/crisis-center', pathMatch: 'full' },
  { path: 'contact', component: ComposeMessageComponent, outlet: 'popup' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canLoad: [AuthGuard] },
  { path: 'crisis-center', loadChildren: './crisis-center/crisis-center.module#CrisisCenterModule', data: { preload: true } },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: SelectivePreloadingStrategyService })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
