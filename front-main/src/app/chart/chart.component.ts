import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
        this.data.subscribe( (res:any) => {
            const myChart = new Chart('myChart', {
                type: 'bar',
                data: {
                    labels: res.labels,
                    datasets: [{
                        label: res.label,
                        data: res.dataSet,
                        backgroundColor: res.backgroundColor,
                        borderColor: res.borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
        
    
  }

}
