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
  @Output() validSelect = new EventEmitter<boolean>()

  form: FormGroup

  constructor (private readonly fb: FormBuilder) {
    this.form = this.fb.group({})
  }

  checkValidSelects () {
    const allValid = Object.values(this.form.value).every(value => value !== '-1')
    this.validSelect.emit(allValid)
  }

  ngOnInit () {
    this.headers.forEach((header, index) => {
      this.form.addControl(`select${index}`, this.fb.control('-1', Validators.required))
    })
    this.form.valueChanges.subscribe(() => {
      this.checkValidSelects()
    })
  }
}
