import { Component, Input } from '@angular/core'
import { NgForOf, NgIf } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-header-matcher',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './header-matcher.component.html',
  styleUrl: './header-matcher.component.css'
})
export class HeaderMatcherComponent {
  @Input() headers!: string[]
  @Input() ourColumnHeaders!: string[]
}
