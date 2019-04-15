import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Crisis } from 'src/app/crisis-center/crisis';




@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

  @Input() crisises: Crisis[];
  @Input() messageError: string;
  @Input() selectedId: number;
  @Output() selected = new EventEmitter<Crisis>();

  ngOnInit() {
  }

  constructor() { }

  selectCrisis(crisis: Crisis) {
    this.selected.emit(crisis);
  }
}
