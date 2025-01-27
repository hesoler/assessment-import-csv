import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DropzoneTableComponent } from './dropzone-table.component'

describe('DropzoneTableComponent', () => {
  let component: DropzoneTableComponent
  let fixture: ComponentFixture<DropzoneTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropzoneTableComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(DropzoneTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
