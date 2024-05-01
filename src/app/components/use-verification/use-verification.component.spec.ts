import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseVerificationComponent } from './use-verification.component';

describe('UseVerificationComponent', () => {
  let component: UseVerificationComponent;
  let fixture: ComponentFixture<UseVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseVerificationComponent]
    });
    fixture = TestBed.createComponent(UseVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
