import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealEditorComponent } from './meal-editor.component';

describe('MealEditorComponent', () => {
  let component: MealEditorComponent;
  let fixture: ComponentFixture<MealEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealEditorComponent]
    });
    fixture = TestBed.createComponent(MealEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
