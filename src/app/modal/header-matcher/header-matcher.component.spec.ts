import { ComponentFixture, TestBed } from '@angular/core/testing'

import { HeaderMatcherComponent } from './header-matcher.component'

describe('HeaderMatcherComponent', () => {
  let component: HeaderMatcherComponent
  let fixture: ComponentFixture<HeaderMatcherComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMatcherComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(HeaderMatcherComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
