import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { CrisisService } from 'src/app/crisis-center/crisis.service';
import { Observable } from 'rxjs';
import { Crisis } from 'src/app/crisis-center/crisis';
import * as adminStore from '../state/admin.reducer';
import * as adminAction from '../state/admin.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-edit-crisis',
  templateUrl: './edit-crisis.component.html',
  styleUrls: ['./edit-crisis.component.css']
})
export class EditCrisisComponent implements OnInit {
  crisis$: Observable<Crisis> = this.store.pipe(select(adminStore.getCurrentCrisis));
  editName: string;
  message: string;
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private crisisService: CrisisService, private store: Store<adminStore.AdminState>) {

  }

  ngOnInit() {
    this.crisis$.pipe(map((crisis: Crisis) => crisis.name)).subscribe(name => this.editName = name);
    // let id: number;
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => params.get('id'))).subscribe(val => id = +val);
    // console.log('crisis id: ' + id);
    // this.store.dispatch(new adminAction.SetCurrentCrisisId(id));
  }

  saveCrisis() {
    let crisis: Crisis;
    this.crisis$.subscribe(val => crisis = val);
    crisis.name = this.editName;
    this.store.dispatch(new adminAction.UpdateCrisis(crisis));
    this.store.pipe(select(adminStore.getError)).subscribe(val => this.message = val);
    if (!this.message) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
