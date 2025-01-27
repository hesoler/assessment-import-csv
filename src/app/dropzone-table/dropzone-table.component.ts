import {Component, EventEmitter, Output} from '@angular/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {NgForOf, NgIf} from '@angular/common';
import * as Papa from 'papaparse';
import {MatListSubheaderCssMatStyler} from '@angular/material/list';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {FileSelectResult} from 'ngx-dropzone/lib/ngx-dropzone.service';

@Component({
  selector: 'app-dropzone-table',
  templateUrl: './dropzone-table.component.html',
  imports: [
    NgxDropzoneModule,
    NgForOf,
    NgIf,
    MatListSubheaderCssMatStyler
  ],
  styleUrls: ['./dropzone-table.component.css']
})
export class DropzoneTableComponent {
  file: File | null = null;
  isButtonDisabled = true;
  data: any[] = [];
  errorMessage = '';
  resultMessage = '';
  @Output() fileUploaded = new EventEmitter<boolean>();

  onSelect(event: FileSelectResult) {
    const selectedFile = event?.addedFiles[0];
    if (selectedFile?.type === 'text/csv') {
      this.file = selectedFile;
      this.isButtonDisabled = false;
      this.errorMessage = '';
      this.parseCSV(selectedFile);
    } else {
      this.onRemove()
      this.errorMessage = 'Only .csv files are allowed!';
      this.resultMessage = '';
    }
  }

  onRemove() {
    this.file = null;
    this.isButtonDisabled = true;
    this.data = [];
    this.errorMessage = '';
    this.resultMessage = '';
    this.fileUploaded.emit(false);
  }

  parseCSV(file: File) {
    Papa.parse(file, {
      header: false,
      complete: (result) => {
        const rows = result.data.length - 1;
        this.data = result.data.slice(0, rows);
        this.fileUploaded.emit(true);
        this.resultMessage = `Showing all ${rows} Row(s)`;
      },
      error: (error) => {
        this.errorMessage = 'Error parsing CSV file!';
        this.fileUploaded.emit(false);
        console.error('Error parsing CSV file:', error);
      }
    });
  }
}
