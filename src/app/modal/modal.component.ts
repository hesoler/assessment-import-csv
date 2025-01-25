import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListSubheaderCssMatStyler} from '@angular/material/list';
import {DropzoneTableComponent} from '../dropzone-table/dropzone-table.component';

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    MatIconButton,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatListSubheaderCssMatStyler,
    DropzoneTableComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isFileUploaded = false;

  firstFormGroup: FormGroup
  secondFormGroup: FormGroup
  thirdFormGroup: FormGroup
  fourthFormGroup: FormGroup

  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl(null, [Validators.required]),
    })
    this.secondFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl(null, [Validators.required]),
    })
    this.thirdFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl(null, [Validators.required]),
    })
    this.fourthFormGroup = this._formBuilder.group({
      firstCtrl: new FormControl(null, [Validators.required]),
    })
  }

  handleFileUploaded(event: boolean) {
    this.isFileUploaded = event;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(true);
  }
}
