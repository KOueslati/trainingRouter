import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { map, tap, catchError } from 'rxjs/operators';
import { ErrorHandleService } from '../shared/error-handle.service';
import { MessageService } from '../shared/message.service';

@Injectable({
  providedIn: 'root',
})

export class HeroService {

  constructor(private messageService: MessageService, private errorHandleService: ErrorHandleService) { }

  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number|string): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id ${id}`);
    return this.getHeroes().pipe(
      map((heroes: Hero[]) => heroes.find(hero => hero.id === +id)),
      tap(_ =>  this.messageService.add(`HeroService: fetched hero id ${id}`),
      catchError(this.errorHandleService.handleError('getHero', null)))
    );
  }
}
