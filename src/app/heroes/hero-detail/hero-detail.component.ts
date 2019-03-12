import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(private heroService: HeroService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getHero().subscribe(hero => this.hero = hero);
  }

  getHero() {
    return this.activatedRoute.paramMap.pipe(
        switchMap((params: ParamMap) => this.heroService.getHero(params.get('id'))));
  }

  goToHereos(hero: Hero) {
    const heroId = hero ? hero.id : null;
    this.router.navigate(['hereos', { id: heroId }]);
  }
}
