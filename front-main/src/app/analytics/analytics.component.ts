import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  dataName = 'Mails sent';
  data : any;
  constructor(private analytics:AnalyticsService) { }

  ngOnInit(): void {
    this.data = this.analytics.getTemplates();
  }

}
