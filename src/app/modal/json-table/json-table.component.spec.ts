import { ComponentFixture, TestBed } from '@angular/core/testing'

import { JsonTableComponent } from './json-table.component'

describe('JsonTableComponent', () => {
  let component: JsonTableComponent
  let fixture: ComponentFixture<JsonTableComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonTableComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(JsonTableComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
