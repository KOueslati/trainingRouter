import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
import { ActivatedRoute, Routes, ParamMap, Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html'
})

export class CrisisDetailComponent implements OnInit {
  constructor(private acRoute: ActivatedRoute, private router: Router, private crisisService: CrisisService) { }
  crisis: Crisis;

  ngOnInit() {
    this.acRoute.paramMap.pipe(
      switchMap((params: ParamMap) => params.get('id') ? this.crisisService.getCrisis(params.get('id')) : null)
    ).subscribe(crisis => this.crisis = crisis);
  }

  goToCrisis(crisis: Crisis) {
    const idCrisis = crisis ? crisis.id : null;
    this.crisis = null;
    this.router.navigate(['../', { id: idCrisis, foo: 'foo' }], { relativeTo: this.acRoute });
  }
}
