import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes: Hero[];
  selectedId: number;

  constructor(private heroService: HeroService, private acRoute: ActivatedRoute, private store: Store<any>) { }

  ngOnInit() {
    this.store.pipe(select('hereos'))
      .subscribe(hereos => {
        if (hereos) {
          console.log(`HeroListComponent: heroId ${hereos.heroId}`);
          this.selectedId = hereos.heroId;
        }
      });

    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    // this.acRoute.paramMap.pipe(
    //   switchMap(params => {
    //     this.selectedId = +params.get('id');
    //     return this.heroService.getHeroes();
    //   })).subscribe(heroes => this.heroes = heroes);
  }
}
