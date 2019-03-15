import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crisis } from './crisis';
import { CRISES } from './mock-crises';
import { map, tap } from 'rxjs/operators';
import { MessageService } from '../shared/message.service';
import { ErrorHandleService } from '../shared/error-handle.service';

@Injectable({
  providedIn: 'root'
})

export class CrisisService {
  constructor(private messageService: MessageService, private errorHandleService: ErrorHandleService) { }

  getCrises(): Observable<Crisis[]> {
    return of(CRISES);
  }

  getCrisis(id: number | string): Observable<Crisis> {
    return this.getCrises().pipe(
      map((crises: Crisis[]) => crises.find(c => c.id === +id)),
      tap(_ => this.messageService.add(`Fetch crisis ${id}`),
      this.errorHandleService.handleError('getCrisis', {})
      ));
  }
}
