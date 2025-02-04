import { CommonModule } from '@angular/common'
import { Component, inject, ViewChild } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatStepper, MatStepperModule } from '@angular/material/stepper'
import { MatListSubheaderCssMatStyler } from '@angular/material/list'
import { DropzoneTableComponent } from './dropzone-table/dropzone-table.component'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { HeaderMatcherComponent } from './header-matcher/header-matcher.component'
import { HeaderValidatorComponent } from './header-validator/header-validator.component'
import { CSVFields } from './types'

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatIconButton,
    MatIcon,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatListSubheaderCssMatStyler,
    DropzoneTableComponent,
    HeaderMatcherComponent,
    HeaderValidatorComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class ModalComponent {
  isFileUploaded = false
  csvData: any[] = []
  headers: string[] = []
  isAllSelectsValid = false
  hasHeadersChecked = false
  isValidData = false
  finalJSON: CSVFields[] = []

  @ViewChild('stepper') stepper!: MatStepper
  @ViewChild(HeaderMatcherComponent) headerMatcherComponent!: HeaderMatcherComponent
  @ViewChild(HeaderValidatorComponent) headerValidatorComponent!: HeaderValidatorComponent

  protected readonly formBuilder = inject(FormBuilder)

  firstFormGroup = this.formBuilder.group({})
  secondFormGroup = this.formBuilder.group({})
  thirdFormGroup = this.formBuilder.group({})
  fourthFormGroup = this.formBuilder.group({})

  constructor (
    private readonly dialogRef: MatDialogRef<ModalComponent>) {
  }

  handleCSVData (data: any[]) {
    this.isFileUploaded = data.length > 0
    this.csvData = data
    this.headers = data.length > 0 ? Object.values(data[0]) : []
    this.resetStepper()
  }

  handleValidSelects (valid: boolean) {
    this.isAllSelectsValid = valid
  }

  handleHasHeadersChecked (hasHeaderChecked: boolean) {
    this.hasHeadersChecked = hasHeaderChecked
  }

  prepareValidationFields () {
    this.headerMatcherComponent.saveFieldMapping()
    const fieldMapping = this.headerMatcherComponent.fieldMapping
    const csvData = this.csvData
    const hasHeadersChecked = this.hasHeadersChecked
    this.headerValidatorComponent.prepareCSVDataToValidate({ fieldMapping, csvData, hasHeadersChecked })
  }

  handleValidData (isValidData: boolean) {
    this.isValidData = isValidData
  }

  resetStepper () {
    this.resetSecondFormGroup()
    this.resetThirdFormGroup()
    this.resetFourthFormGroup()
    this.stepper.reset()
  }

  resetSecondFormGroup () {
    this.headerMatcherComponent.resetForm()
  }

  resetThirdFormGroup () {
    this.headerValidatorComponent.resetForm()
  }

  resetFourthFormGroup () {
    this.thirdFormGroup.reset()
  }

  onSave (): void {
    this.dialogRef.close(true)
  }
}
