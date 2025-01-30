import { Component, EventEmitter, Input, Output } from '@angular/core'
import { NgForOf } from '@angular/common'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-header-matcher',
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    FormsModule
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
    const allValid = Object.values(this.formGroup.value).every(value => value !== '-1')
    this.validSelect.emit(allValid)
  }

  ngOnInit () {
    this.headers.forEach((header, index) => {
      this.formGroup.addControl(`select${index}`, this.formBuilder.control('-1', Validators.required))
    })
    this.formGroup.valueChanges.subscribe(() => {
      this.checkValidSelects()
    })
  }
}
