import {Component, OnInit} from '@angular/core';
import { SmartTableData } from '../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { SourceService } from './source.service';
import { Source } from './source.model';
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition
} from '@nebular/theme';
@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      edit: false,
      position: 'right'
  },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      value: {
        title: 'Value',
        type: 'string',
      },
    },
  };

  index: number  = 1;
  loading: boolean = true;
  source: LocalDataSource = new LocalDataSource();
  sources: Source[] = [];
  event: any = null;

  constructor(
    private sourceService: SourceService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.refreshData();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.deleteSource(event);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (this.dataValid(event)) {
      event.confirm.resolve();
      this.sourceService.storeSource({
        name: event.newData.name,
        value: event.newData.value
      })
      .subscribe(
        (res) => {
          this.handleResponse(res);
        },
        (err) => {
          this.handleError(err);
        },
        () => { this.refreshData() }
      );
    }
  }

  private refreshData(): void {
    this.loading = true;
    this.sourceService.getSources().subscribe(
      (data: Source[]) => {
        this.sources = data;
        this.source.load(data);
        this.loading = false;
      },
    );
  }

  private deleteSource(event): void {
    this.sourceService.deleteSource(event.data.id).subscribe(
      (res) => { 
        this.handleResponse(res);
      },
      (err) => {
        this.handleError(err);
      },
      () => {
        this.refreshData();
      }
    );
  }

  private showToast(status: NbComponentStatus, title: string, body: string) {
      const config = {
          status: status,
          destroyByClick: true,
          duration: 3000,
          hasIcon: true,
          position: NbGlobalPhysicalPosition.TOP_RIGHT,
          preventDuplicates: false,
      };
      const titleContent = title ? `${title}` : '';
      this.index += 1;
      this.toastrService.show(
          body,
          titleContent,
          config,
      );
  }

  private dataValid(event): boolean {
    if (event.newData.name === '') {
      this.showToast('danger', 'Source creation', 'The name is required');
      return false;
    }
    
    let value = parseInt(event.newData.value);
    if (!Number.isInteger(value) || value < 0) {
      this.showToast('danger', 'Source creation', 'The value is required and has to be positive integer');
      return false;
    }

    return true;
  }

  private handleResponse(res): void {
    this.showToast('success', 'Source deletion', res.message);
  }

  private handleError(err): void {
    let message = err.error.message ? err.error.message : 'Something went wrong...';
    this.showToast('danger', 'Source deletion', message);
  }
}
