import { Component, Input, Output } from '@angular/core';
import { SingleMeal } from 'src/app/models/SingleMeal';
import { EngineService } from 'src/app/services/engine.service';
import { map } from 'rxjs/operators';
import { Meals } from 'src/app/interfaces/meals';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { MealEditorComponent } from '../meal-editor/meal-editor.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
})
export class MealComponent {
  meals: Array<SingleMeal> = new Array<SingleMeal>();

  constructor(
    private engineservice: EngineService,
    private offcanvasService: NgbOffcanvas
  ) {}

  getAllMeals() {
    this.meals = new Array<SingleMeal>();
    this.engineservice.getAllMeals().subscribe({
      next: (value: Meals) => {
        console.log(value);
        value.data.map((e) => {
          this.meals?.push(new SingleMeal(e));
        });
        this.meals = this.meals.slice();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit() {
    this.getAllMeals();
  }
  open(meal: SingleMeal) {
    const offcanvasRef = this.offcanvasService.open(MealEditorComponent, {
      panelClass: 'custom-dialog-container',
      backdrop: 'static',
    });
    offcanvasRef.componentInstance.meal = meal;
  }
}
