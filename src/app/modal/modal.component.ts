import { CommonModule } from '@angular/common'
import { Component, inject, ViewChild } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatStepper, MatStepperModule } from '@angular/material/stepper'
import { MatListSubheaderCssMatStyler } from '@angular/material/list'
import { DropzoneTableComponent } from './dropzone-table/dropzone-table.component'
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'
import { HeaderMatcherComponent } from './header-matcher/header-matcher.component'

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
    HeaderMatcherComponent
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
  ourColumnHeaders = ['Identifier', 'First Name', 'Last Name', 'Narrative', 'Evidence Narrative', 'Evidence URL', 'Issue Date', 'Expiration Date']
  allSelectsValid = false
  @ViewChild('stepper') stepper!: MatStepper

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
    this.allSelectsValid = valid
  }

  resetStepper () {
    this.stepper.reset()
    this.resetSecondFormGroup()
    this.resetThirdFormGroup()
    this.resetFourthFormGroup()
  }

  resetSecondFormGroup () {
    this.secondFormGroup.reset()
    this.secondFormGroup = this.formBuilder.group({})
    this.headers.forEach((_, index) => {
      this.secondFormGroup.addControl(`select${index}`, this.formBuilder.control('-1', Validators.required))
    })
    this.allSelectsValid = false
  }

  resetThirdFormGroup () {
    this.thirdFormGroup.reset()
  }

  resetFourthFormGroup () {
    this.thirdFormGroup.reset()
  }

  onSave (): void {
    this.dialogRef.close(true)
  }
}
