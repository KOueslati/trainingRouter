import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crisis } from 'src/app/crisis-center/crisis';
import { Store, select } from '@ngrx/store';
import * as fromAdminStore from '../state/admin.reducer';
import * as fromAdminAction from '../state/admin.actions';

@Component({
  selector: 'app-manage-crises',
  templateUrl: './manage-crises.component.html',
  styleUrls: ['./manage-crises.component.css']
})
export class ManageCrisesComponent implements OnInit {

  private crisises$: Observable<Crisis[]> = this.getCrisises();
  private messageError$: Observable<string> = this.store.pipe(select(fromAdminStore.getError));
  constructor(private store: Store<fromAdminStore.AdminState>) { }

  ngOnInit() {
    this.store.dispatch(new fromAdminAction.LoadCrisises());
  }

  getCrisises() {
    return this.store.pipe(select(fromAdminStore.getCrisises));
  }
}
