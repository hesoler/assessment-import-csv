import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule, MatIconButton } from '@angular/material/button'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatStepperModule } from '@angular/material/stepper'
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

  protected readonly _formBuilder = inject(FormBuilder)

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  })

  secondFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  })

  thirdFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  })

  fourthFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  })

  constructor (
    private readonly dialogRef: MatDialogRef<ModalComponent>) {
  }

  handleCSVData (data: any[]) {
    this.isFileUploaded = data.length > 0
    this.csvData = data
    this.headers = data.length > 0 ? Object.values(data[0]) : []
  }

  handleValidSelects (valid: boolean) {
    this.allSelectsValid = valid
  }

  onSave (): void {
    this.dialogRef.close(true)
  }
}
