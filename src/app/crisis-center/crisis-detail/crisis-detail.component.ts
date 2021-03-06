import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
import { ActivatedRoute, Routes, ParamMap, Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { switchMap } from 'rxjs/operators';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html'
})

export class CrisisDetailComponent implements OnInit {
  crisis: Crisis;
  editName: string;
  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private router: Router, private crisisService: CrisisService, private dialogService: DialogService) { }

  ngOnInit() {
    this.route.data.subscribe((data: { crisis: Crisis }) => {
      this.crisis = data.crisis;
      this.editName = data.crisis.name;
    });
  }

  goToCrisis(crisis: Crisis) {
    const idCrisis = crisis ? crisis.id : null;
    this.router.navigate(['../', { id: idCrisis }], { relativeTo: this.route });
  }

  saveCrisis() {
    this.crisis.name = this.editName;
    this.goToCrisis(this.crisis);
  }
  cancel() {
    this.goToCrisis(this.crisis);
  }

  canDeactive(): Observable<boolean> | boolean {
    // tslint:disable-next-line: curly
    if (this.crisis == null) return true;
    if (this.editName === this.crisis.name) {
      return true;
    }
    return this.dialogService.confirm('Are you sure to skip or cancel modification ?');
  }
}
