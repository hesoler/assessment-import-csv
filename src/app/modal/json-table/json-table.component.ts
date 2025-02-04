import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CSVFields, JSONTable } from '../types'
import { NgForOf, NgIf } from '@angular/common'
import { getArrayEnumValues } from '../utils'

@Component({
  selector: 'app-json-table',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './json-table.component.html',
  styleUrl: './json-table.component.css'
})
export class JsonTableComponent implements OnInit {
  @Input() formBuilder!: FormBuilder
  @Input() formGroup!: FormGroup
  @Output() isValidExport = new EventEmitter<boolean>()

  countRowsToBeImported!: number
  isValidExportCtrl = false
  jsonTableHeaders = getArrayEnumValues(JSONTable)
  jsonTableData: any[] = []

  prepareJSONFromCSVData (csvData: CSVFields[]) {
    this.countRowsToBeImported = csvData.length
    this.isValidExportCtrl = csvData.length > 0
    this.isValidExport.emit(csvData.length > 0)

    const jsonTableData: any[] = []

    csvData.forEach(data => {
      const addItem = {
        name: data.firstName + ' ' + data.lastName,
        id: data.id,
        evidenceUrl: data.evidenceUrl,
        issueDate: data.issueDate,
        expirationDate: data.expirationDate,
        narrative: data.narrative
      }
      jsonTableData.push(addItem)
    })

    this.jsonTableData = jsonTableData
  }

  ngOnInit () {
    this.formGroup.addControl('isValidExportCtrl', this.formBuilder.control(false, Validators.required))
  }
}
