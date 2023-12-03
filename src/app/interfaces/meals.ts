export interface Ingredient {
  ingredientName: string;
  ingredientDescription: string;
  amount: number;
  amountType: string;
  calories: number;
  protein: number;
  fat: number;
  isOptional: boolean;
  count: number;
  _id?: string;
}

export interface Meal {
  _id: string;
  createdBy: string;
  mealName: string;
  mealDescription: string;
  ingredients: Ingredient[];
  shared: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Meals {
  data: Meal[];
  count: number;
}
