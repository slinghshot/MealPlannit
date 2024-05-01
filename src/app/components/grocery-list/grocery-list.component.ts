import { Component } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Meal, Meals } from 'src/app/interfaces/meals';
import { SingleMeal } from 'src/app/models/SingleMeal';
import { EngineService } from 'src/app/services/engine.service';
import { MealEditorComponent } from '../meal-editor/meal-editor.component';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
})
export class GroceryListComponent {
  meals?: Array<SingleMeal> = new Array<SingleMeal>();
  selectedMeals: Array<Meal> = new Array<Meal>();
  generatedIngredients: Array<any> = new Array<any>();
  ingredientList: Array<any> = new Array<any>();

  constructor(
    private engineservice: EngineService,
    private offcanvasService: NgbOffcanvas,
    private router: Router
  ) {}

  generateGroceryList() {
    // console.log(this.selectedMeals);
    let selectedMeals = this.selectedMeals;
    // ingredientList = [];
    // get first ingredient, check ingredient with other meals, ingredients.
    // if match get mealName. Output should look like 'ingredientName : mealName, Mealname'
    let list: any = [];
    selectedMeals.forEach((meal) => {
      meal.ingredients.forEach((ingredient) => {
        list.push(ingredient.ingredientName);
      });
    });

    let unique = [...new Set(list)];
    let groceryList: any = [];

    unique.forEach((name: any) => {
      let combinedList: any = {
        ingredient: name,
        // mealName: [],
        meal: [],
      };

      selectedMeals.forEach((meal) => {
        for (let i = 0; i < meal.ingredients.length; i++) {
          if (meal.ingredients[i].ingredientName === name) {
            let amount = meal.ingredients[i].amount;
            let amountType = meal.ingredients[i].amountType;
            // combinedList.mealName.push(
            //   `${meal.mealName} ${amount} ${amountType}`
            // );
            combinedList.meal.push({
              name: meal.mealName,
              amount: `${amount} ${amountType}`,
            });
            break;
          }
        }
      });
      groceryList.push(combinedList);
    });
    groceryList.sort((a: any, b: any) =>
      a.ingredient > b.ingredient ? 1 : b.ingredient > a.ingredient ? -1 : 0
    );
    // console.log(groceryList);
    this.generatedIngredients = groceryList;
    this.engineservice.generatedIngredients = this.generatedIngredients;
  }

  onCheckChange(meal: Meal) {
    let x = this.selectedMeals.indexOf(meal);
    // console.log(x);
    if (Number(x) != -1) {
      this.selectedMeals.splice(x, 1);
    } else {
      this.selectedMeals.push(meal);
    }
    // console.log(this.selectedMeals);
  }

  getAllMeals() {
    this.meals = new Array<SingleMeal>();
    this.engineservice.getAllMeals().subscribe({
      next: (value: Meals) => {
        // console.log(value);
        value.data.map((e) => {
          this.meals?.push(new SingleMeal(e));
        });
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

  printForm() {
    localStorage.setItem(
      'IngredientList',
      JSON.stringify(this.engineservice.generatedIngredients)
    );
    let newRelativeUrl = this.router.createUrlTree(['/printable']);
    let baseUrl = window.location.href.replace(this.router.url, '');
    window.open(baseUrl + newRelativeUrl, '_blank');

    // this.router.navigate([
    //   '/printable',
    //   this.engineservice.generatedIngredients,
    // ]);
  }
}
