import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { EditCrisisComponent, ManageHeroesComponent, AdminComponent, AdminDashboardComponent, CrisisShellComponent } from './index';

const adminRoutes: Routes = [
// tslint:disable-next-line: no-trailing-whitespace
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'crisis',
            component: CrisisShellComponent,
            children: [
              {
                path: ':id',
                component: EditCrisisComponent
              }
            ]
          },
          {
            path: 'heroes', component: ManageHeroesComponent
          },
          {
            path: '',
            component: AdminDashboardComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
