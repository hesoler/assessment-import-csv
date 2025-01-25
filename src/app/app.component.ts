import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {RouterOutlet} from '@angular/router';
import {DataListComponent} from './data-list/data-list.component';
import {ModalComponent} from "./modal/modal.component";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataListComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'import-csv';

  constructor(public dialog: MatDialog) {
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      maxWidth: '80em', width: '80em', height: '85vh', panelClass: 'panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El modal se cerró');
      } else {
        console.log('Los cambios han sido cancelados');
      }
    });
  }

  closeModal(): void {
    this.dialog.closeAll();
  }
}
