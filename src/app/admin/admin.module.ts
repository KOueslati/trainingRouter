import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/admin.reducer';
import { AdminEffects } from './state/admin.effects';
import { EditCrisisComponent } from './edit-crisis/edit-crisis.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    ManageCrisesComponent,
    ManageHeroesComponent,
    EditCrisisComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([ AdminEffects ]),
    FormsModule
  ]
})
export class AdminModule { }
