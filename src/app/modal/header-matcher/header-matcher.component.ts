import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { FieldMapping, OurColumnsMapping } from '../types'
import { getArrayEnumValues, getEnumKeyByValue } from '../utils'

const ourColumnHeaders = getArrayEnumValues(OurColumnsMapping)

@Component({
  selector: 'app-header-matcher',
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './header-matcher.component.html',
  styleUrl: './header-matcher.component.css'
})
export class HeaderMatcherComponent implements OnInit, OnChanges {
  @Input() headers!: string[]
  @Input() formBuilder!: FormBuilder
  @Input() formGroup!: FormGroup

  @Output() isAllSelectsValid = new EventEmitter<boolean>()
  @Output() hasHeadersChecked = new EventEmitter<boolean>()

  fieldMapping: FieldMapping = {}

  checkValidSelects () {
    const allSelectsValid = Object.values(this.formGroup.value).every(value => value !== '')
    this.isAllSelectsValid.emit(allSelectsValid)
  }

  assignFormControls () {
    ourColumnHeaders.forEach((_, index) => {
      this.formGroup.addControl(`select${index}`, this.formBuilder.control('', Validators.required))
    })
  }

  handleHasHeadersChecked (event: any) {
    this.hasHeadersChecked.emit(event.target.checked)
  }

  saveFieldMapping () {
    ourColumnHeaders.forEach((ourHeader, index) => {
      const csvFieldProp = getEnumKeyByValue(OurColumnsMapping, ourHeader)
      if (!csvFieldProp) return

      this.fieldMapping[csvFieldProp] = this.formGroup.get(`select${index}`)?.value
    })
  }

  resetForm () {
    this.headers.forEach((_, index) => {
      this.formGroup.get(`select${index}`)?.setValue('-1')
    })
    this.isAllSelectsValid.emit(true)
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes['headers']) {
      ourColumnHeaders.forEach((_, index) => {
        this.formGroup.get(`select${index}`)?.setValue('-1')
      })
      this.assignFormControls()
    }
  }

  ngOnInit () {
    this.assignFormControls()
  }

  protected readonly ourColumnHeaders = ourColumnHeaders
}
