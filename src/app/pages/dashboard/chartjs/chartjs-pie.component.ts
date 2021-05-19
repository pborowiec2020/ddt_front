import { Component, OnDestroy, Input, OnChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsPieComponent implements OnDestroy, OnChanges {

  @Input() data: any = [];
  options: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const chartjs: any = config.variables.chartjs;
      this.data = this.formatInputSources();
      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnChanges() {
    console.info(this.data);
    this.formatInputSources();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private formatInputSources(): void {
    let labels = [];
    let values = [];
    let backgroundColors = [];
    this.data.forEach((element, index, array) => {
      labels.push(element.name);
      values.push(element.value);
      backgroundColors.push(this.getRandomColor());
    })

    this.data = {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: backgroundColors,
      }],
    };
  }

  private getRandomColor(): string {
    return 'rgba(' + this.getRandomInt(0, 255) +', ' + this.getRandomInt(0, 255) + ', ' + this.getRandomInt(0, 255) + ')';
  }

  private getRandomInt(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
