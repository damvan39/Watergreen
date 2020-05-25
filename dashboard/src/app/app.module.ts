import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TempChartComponent } from './temp-chart/temp-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { TempDataService } from './temp-data.service';
@NgModule({
  declarations: [
    AppComponent,
    TempChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [TempDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
