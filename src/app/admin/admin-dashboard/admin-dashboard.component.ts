import { Component, OnInit } from '@angular/core';
import { SelectivePreloadingStrategyService } from 'src/app/selective-preloading-strategy.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  modules: string[];

  constructor(private loadStrategyService: SelectivePreloadingStrategyService) { }

  ngOnInit() {
    this.modules = this.loadStrategyService.preloadedModules;
  }
}
