import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintableComponent } from './printable.component';

describe('PrintableComponent', () => {
  let component: PrintableComponent;
  let fixture: ComponentFixture<PrintableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintableComponent]
    });
    fixture = TestBed.createComponent(PrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
