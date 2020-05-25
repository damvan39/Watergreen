import { Component, OnInit } from '@angular/core';
import { TempDataService } from '../temp-data.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.css']
})
export class TempChartComponent implements OnInit {
  chart = [];
  constructor(private temperature: TempDataService) { }

  ngOnInit(): void {
    this.temperature.getTemp();

  }

}
