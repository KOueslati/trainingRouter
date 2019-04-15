import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { CrisisService } from 'src/app/crisis-center/crisis.service';
import { Observable } from 'rxjs';
import { Crisis } from 'src/app/crisis-center/crisis';
import * as adminStore from '../../state';
import * as adminAction from '../../state/admin.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-edit-crisis',
  templateUrl: './edit-crisis.component.html',
  styleUrls: ['./edit-crisis.component.css']
})
export class EditCrisisComponent implements OnInit {
  @Input() crisis: Crisis;
  @Input() editName: string;
  @Input() message: string;

  @Output() crisisUpdateEmitter = new EventEmitter<Crisis>();
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private crisisService: CrisisService, private store: Store<adminStore.AdminState>) {

  }

  ngOnInit() {
    if (!this.editName) {
      this.editName = this.crisis.name;
    }
    // let id: number;
    // this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => params.get('id'))).subscribe(val => id = +val);
    // console.log('crisis id: ' + id);
    // this.store.dispatch(new adminAction.SetCurrentCrisisId(id));
  }

  saveCrisis() {
    this.crisis.name = this.editName;
    this.crisisUpdateEmitter.emit(this.crisis);
    // let crisis: Crisis;
    // this.crisis$.subscribe(val => crisis = val);
    // crisis.name = this.editName;
    // this.store.dispatch(new adminAction.UpdateCrisis(crisis));
    // this.store.pipe(select(adminStore.getError)).subscribe(val => this.message = val);
    // if (!this.message) {
    //   this.router.navigate(['../'], { relativeTo: this.route });
    // }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
