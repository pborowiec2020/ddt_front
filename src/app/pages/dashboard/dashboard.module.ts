import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { SourceService } from './source.service';
import {
  NbButtonModule
} from '@nebular/theme';
import { ChartjsPieComponent } from './chartjs/chartjs-pie.component';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbButtonModule,
    FormsModule,
    ChartModule,
  ],
  declarations: [
    DashboardComponent,
    ChartjsPieComponent,
  ],
  providers: [
    SourceService,
  ],

})
export class DashboardModule { }
