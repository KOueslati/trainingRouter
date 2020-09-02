import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromHeroesRoot from '../state/index';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[];
  selectedId: number;

  constructor(private heroService: HeroService, private acRoute: ActivatedRoute, private store: Store<fromHeroesRoot.State>) { }

  ngOnInit() {
    this.store.pipe(select(fromHeroesRoot.selectHeroId))
      .subscribe(heroId => {
        console.log(`HeroListComponent: heroId ${heroId}`);
        this.selectedId = heroId;
      }
      );

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.acRoute.paramMap.pipe(
    //   switchMap(params => {
    //     this.selectedId = +params.get('id');
    //     return this.heroService.getHeroes();
    //   })).subscribe(heroes => this.heroes = heroes);
  }
}
