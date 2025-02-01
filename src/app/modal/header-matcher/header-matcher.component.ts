import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core'
import { NgForOf } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatFormField } from '@angular/material/form-field'
import { MatOption, MatSelect } from '@angular/material/select'

@Component({
  selector: 'app-header-matcher',
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatSelect,
    MatOption
  ],
  templateUrl: './header-matcher.component.html',
  styleUrl: './header-matcher.component.css'
})
export class HeaderMatcherComponent {
  @Input() headers!: string[]
  @Input() ourColumnHeaders!: string[]

  @Input() formBuilder!: FormBuilder
  @Input() formGroup!: FormGroup

  @Output() validSelect = new EventEmitter<boolean>()

  checkValidSelects () {
    const allValid = Object.values(this.formGroup.value).every(value => value && value !== '-1')
    this.validSelect.emit(allValid)
  }

  assignControls () {
    this.ourColumnHeaders.forEach((_, index) => {
      this.formGroup.addControl(`select${index}`, this.formBuilder.control('-1', Validators.required))
    })
  }

  ngOnChanges (changes: SimpleChanges) {
    if (changes['headers']) {
      this.ourColumnHeaders.forEach((_, index) => {
        this.formGroup.get(`select${index}`)?.setValue('-1')
      })
      this.assignControls()
    }
  }

  ngOnInit () {
    this.assignControls()
    this.formGroup.valueChanges.subscribe(() => {
      this.checkValidSelects()
    })
  }
}
