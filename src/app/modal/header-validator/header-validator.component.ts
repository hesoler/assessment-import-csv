import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { NgForOf, NgIf } from '@angular/common'
import { CheckResult, CSVFields, FieldMapping } from '../types'
import { isValidDate } from '../utils'

interface PrepareFields {
  fieldMapping: FieldMapping
  csvData: any[]
  hasHeadersChecked: boolean
}

interface ValidateFields {
  dataToValidate: CSVFields[]
}

@Component({
  selector: 'app-header-validator',
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './header-validator.component.html',
  styleUrl: './header-validator.component.css'
})
export class HeaderValidatorComponent implements OnInit {
  @Input() headers!: string[]
  @Input() formBuilder!: FormBuilder
  @Input() formGroup!: FormGroup
  isValidDataCtrl = false

  validationMessageList: string[] = []
  @Output() isValidData = new EventEmitter<boolean>()
  @Output() exportData = new EventEmitter<CSVFields[]>()

  prepareCSVDataToValidate ({ fieldMapping, csvData, hasHeadersChecked }: PrepareFields) {
    this.validationMessageList = []
    const dataToValidate: CSVFields[] = []

    // if CSV has headers omit the first row
    const dataWithoutHeaders = hasHeadersChecked ? csvData.slice(1) : csvData

    dataWithoutHeaders.forEach(data => {
      const csvFieldObject: CSVFields = {
        id: data[fieldMapping['id']],
        firstName: data[fieldMapping['firstName']],
        lastName: data[fieldMapping['lastName']],
        narrative: data[fieldMapping['narrative']],
        evidenceNarrative: data[fieldMapping['evidenceNarrative']],
        evidenceUrl: data[fieldMapping['evidenceUrl']],
        issueDate: data[fieldMapping['issueDate']],
        expirationDate: data[fieldMapping['expirationDate']]
      }
      dataToValidate.push(csvFieldObject)
    })

    this.validateCSVData({ dataToValidate })
  }

  validateCSVData ({ dataToValidate }: ValidateFields) {
    const validCriteria = {
      // id can be a number, a randomUUID or an email
      idRegex: /^(?:\d+|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
      firstNameRegex: /^[a-zA-Z]*$/,
      lastNameRegex: /^[a-zA-Z]*$/,
      narrativeRegex: /^\D{0,255}$/,
      evidenceNarrativeRegex: /^\D{0,255}$/,
      evidenceUrlRegex: /^(https?|ftp):\/\/[^\s\/$.?#].\S*$/, // 'http://example.com'
      issueDateRegex: /^\d{4}-\d{2}-\d{2}$/, // date with 'yyyy-MM-dd' format
      expirationDateRegex: /^\d{4}-\d{2}-\d{2}$/
    }

    let validRows = dataToValidate.length
    let isValidData = true

    dataToValidate.forEach((row, index) => {
      let isValidRow = true
      const rowIndex = index + 1

      if (!validCriteria.idRegex.test(row.id)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Id: '${row.id}' is not a valid id`)
      }
      if (!validCriteria.firstNameRegex.test(row.firstName)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} First Name: '${row.firstName}' is not a valid first name`)
      }
      if (!validCriteria.lastNameRegex.test(row.lastName)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Last Name: '${row.lastName}' is not a valid last name`)
      }
      if (!validCriteria.narrativeRegex.test(row.narrative)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Narrative: '${row.narrative}' is not a valid text`)
      }
      if (!validCriteria.evidenceNarrativeRegex.test(row.evidenceNarrative)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Evidence Narrative: '${row.evidenceNarrative}' is not a valid text`)
      }
      if (row.evidenceUrl.trim() !== '' && !validCriteria.evidenceUrlRegex.test(row.evidenceUrl)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Evidence URL: '${row.evidenceUrl}' is not a valid URL`)
      }
      if (!validCriteria.issueDateRegex.test(row.issueDate) && isValidDate(row.issueDate)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Issue Date: '${row.issueDate}' is not a valid date (e.g 2024-12-31)`)
      }
      if (!validCriteria.expirationDateRegex.test(row.expirationDate) && isValidDate(row.expirationDate)) {
        isValidRow = false
        this.validationMessageList.push(`${CheckResult.Invalid} Row:${rowIndex} Expiration Date: '${row.expirationDate}' is not a valid date (e.g 2024-12-31)`)
      }

      if (!isValidRow) {
        isValidData = isValidRow
        validRows--
      }
    })

    this.isValidDataCtrl = isValidData
    this.isValidData.emit(isValidData)

    if (validRows === dataToValidate.length) {
      this.validationMessageList.push(`${CheckResult.Valid} All rows are valid and will be imported.`)
      this.exportData.emit(dataToValidate)
    }
    this.validationMessageList.push(`${CheckResult.Valid} ${validRows} valid rows were found in your file`)
  }

  resetForm () {
    this.formGroup.reset()
    this.validationMessageList = []
    this.isValidDataCtrl = false
    this.isValidData.emit(false)
    this.exportData.emit([])
  }

  ngOnInit () {
    this.formGroup.addControl('isValidDataCtrl', this.formBuilder.control(false, Validators.required))
  }

  protected readonly CheckResult = CheckResult
}
