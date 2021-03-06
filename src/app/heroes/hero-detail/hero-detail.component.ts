import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {HeroActions} from '../index';
import * as fromHeroes from '../state/index';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  // tslint:disable-next-line: max-line-length
  constructor(private heroService: HeroService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromHeroes.State>) { }

  ngOnInit() {
    this.hero$ = this.getHero();
  }

  getHero() {
    return this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const heroId = params.get('id');
        this.store.dispatch(HeroActions.getHeroId({id: +heroId}));
        return this.heroService.getHero(heroId);
      }));
  }

  goToHereos(hero: Hero) {
    this.router.navigate(['hereos']);
    // const heroId = hero ? hero.id : null;
    // this.router.navigate(['hereos', { id: heroId }]);
  }
}
