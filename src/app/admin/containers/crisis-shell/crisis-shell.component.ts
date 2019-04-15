import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Crisis } from 'src/app/crisis-center/crisis';
import * as fromAdminAction from '../../state/admin.actions';
import { Store, select } from '@ngrx/store';
import * as fromAdminStore from '../../state';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './crisis-shell.component.html'
})

export class CrisisShellComponent implements OnInit {
  crisises$: Observable<Crisis[]> = this.store.pipe(select(fromAdminStore.getCrisises));
  messageError$: Observable<string> = this.store.pipe(select(fromAdminStore.getError));
  selectedId$: Observable<number> = this.store.pipe(select(fromAdminStore.getCrisisId));
  crisis$: Observable<Crisis> = this.store.pipe(select(fromAdminStore.getCurrentCrisis));
  editName$: Observable<string>;

  constructor(private store: Store<fromAdminStore.AdminState>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.store.dispatch(new fromAdminAction.LoadCrisises());
  }

  selectCrisis(crisis: Crisis) {
    this.store.dispatch(new fromAdminAction.SetCurrentCrisisId(crisis.id));
// tslint:disable-next-line: no-shadowed-variable
    this.editName$ = this.crisis$.pipe(map((crisis: Crisis) => crisis.name));
  }

  saveCrisis(crisis: Crisis) {
    this.store.dispatch(new fromAdminAction.UpdateCrisis(crisis));
    let message;
    this.messageError$.subscribe(err => message = err);
    if (!message) {
      this.router.navigate(['../crisis'], { relativeTo: this.route });
    }
  }
}

