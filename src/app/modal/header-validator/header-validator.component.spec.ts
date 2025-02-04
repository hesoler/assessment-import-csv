import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderValidatorComponent } from './header-validator.component'

describe('HeaderValidatorComponent', () => {
  let component: HeaderValidatorComponent
  let fixture: ComponentFixture<HeaderValidatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderValidatorComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(HeaderValidatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
