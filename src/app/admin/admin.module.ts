import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEffects, EditCrisisComponent, CrisisShellComponent, CrisisListComponent,
  AdminDashboardComponent, AdminComponent, ManageHeroesComponent} from './index';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/admin.reducer';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    CrisisListComponent,
    ManageHeroesComponent,
    EditCrisisComponent,
    CrisisShellComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([AdminEffects]),
    FormsModule
  ]
})
export class AdminModule { }
