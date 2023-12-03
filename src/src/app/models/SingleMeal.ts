import { Ingredient, Meal } from '../interfaces/meals';

export class SingleMeal {
  public meals: Meal;
  public totalCalories: Number = 0;
  public totalProtein: Number = 0;
  public totalIngredients: Number = 0;
  constructor(meals: Meal) {
    this.meals = meals;
    meals.ingredients.map((item) => {
      this.totalCalories = Number(item.calories) + Number(this.totalCalories);
      this.totalProtein = Number(item.protein) + Number(this.totalProtein);
    });
    this.totalIngredients = meals.ingredients.length;
  }
}
