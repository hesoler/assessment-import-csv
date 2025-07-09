import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgForOf, NgIf } from '@angular/common'
import * as Papa from 'papaparse'
import { MatListSubheaderCssMatStyler } from '@angular/material/list'

// @ts-expect-error
import { FileSelectResult } from 'ngx-dropzone/lib/ngx-dropzone.service'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-dropzone-table',
  templateUrl: './dropzone-table.component.html',
  imports: [
    NgxDropzoneModule,
    NgForOf,
    NgIf,
    MatListSubheaderCssMatStyler,
    FormsModule,
    ReactiveFormsModule
  ],
  standalone: true,
  styleUrls: ['./dropzone-table.component.css']
})
export class DropzoneTableComponent implements OnInit {
  protected file: File | null = null
  isButtonDisabled = true
  data: never[] = []
  errorMessage = ''
  resultMessage = ''
  @Output() csvData = new EventEmitter<any[]>()

  @Input() formBuilder!: FormBuilder
  @Input() formGroup!: FormGroup
  fileUploadedCtrl: 1 | null = null

  onSelectFile (event: FileSelectResult) {
    const selectedFile = event?.addedFiles[0]
    if (selectedFile?.type === 'text/csv') {
      this.file = selectedFile
      this.isButtonDisabled = false
      this.errorMessage = ''
      this.parseCSV(selectedFile)
    } else {
      this.onRemoveFile()
      this.errorMessage = 'Only .csv files are allowed!'
      this.resultMessage = ''
    }
  }

  onRemoveFile () {
    this.file = null
    this.isButtonDisabled = true
    this.data = []
    this.fileUploadedCtrl = null
    this.errorMessage = ''
    this.resultMessage = ''
    this.csvData.emit([])
  }

  parseCSV (file: File) {
    Papa.parse(file, {
      header: false,
      complete: (result) => {
        const rows = result.data.length - 1
        const data = result.data.slice(0, rows)
        // @ts-expect-error
        this.data = data
        this.fileUploadedCtrl = 1
        this.csvData.emit(data)
        this.resultMessage = `Showing all ${rows} Row(s)`
      },
      error: (error) => {
        this.csvData.emit([])
        this.errorMessage = 'Error parsing CSV file!'
        console.error('Error parsing CSV file:', error)
        this.fileUploadedCtrl = null
      }
    })
  }

  ngOnInit () {
    this.formGroup.addControl('fileUploadedCtrl', this.formBuilder.control(null, Validators.required))
  }
}
