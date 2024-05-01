import { Injectable } from '@angular/core';
import { InputError } from '../models/input-error';

@Injectable({
  providedIn: 'root',
})
export class InputValidatorService {
  inputError: InputError = new InputError();
  alphaNumericReg = /[\w\s]$/;

  constructor() {}

  mealNameCheck(mealName: string) {
    if (!mealName) {
      this.inputError.mealNameError = true;
      this.inputError.mealNameErrorDescription = 'Meal Name required!';
    } else if (mealName.length > 100) {
      this.inputError.mealNameError = true;
      this.inputError.mealNameErrorDescription = `Meal Name greater than 100 characters, ${mealName.length}`;
    } else if (!this.alphaNumericReg.test(mealName)) {
      this.inputError.mealNameError = true;
      this.inputError.mealNameErrorDescription = `Cannot insert Special Characters`;
    }
  }
  mealNameDescCheck(mealDescription: string) {
    if (mealDescription.length > 500) {
      this.inputError.mealDesc = true;
      this.inputError.mealDescErrorDescription = `Meal description greater than 500 characters, ${mealDescription.length}`;
    }
  }
  mealFormCheck(mealForm: any) {
    let toReturn= false;
    mealForm.forEach((item: any) => {
      
      if (!item.ingredientName) {
        this.inputError.ingredientNameError = true;
        this.inputError.ingredientNameErrorDescription = `Please input an ingredient Name`;
        toReturn=true;
      }
      if(item.amount.length === 0 || item.amount.length > 50){
        this.inputError.amountError = true;
        this.inputError.amountErrorDescription = `Please enter an amount or shorten the length of amount input.`
        toReturn=true;
      }
      if(item.amountType === ''){
        this.inputError.amountTypeError = true;
        this.inputError.amountTypeErrorDescription = `Please enter amount type`
      }
      if(toReturn){
        return;
      }
    });
  }
  amountFormCheck(amount: string){
    if(amount.length === 0 || amount.length > 50){
      this.inputError.amountError = true;
      this.inputError.amountErrorDescription = `Please enter an amount or shorten the length of amount input.`
    }
  }

  inputErrorCheck(
    mealName: string,
    mealDescription: string,
    mealForm: any,
    isShared: boolean
  ): InputError {
    this.inputError = new InputError();
    this.mealNameCheck(mealName);
    this.mealNameDescCheck(mealDescription);
    this.mealFormCheck(mealForm);
    // this.amountFormCheck(amount);

    if (!mealDescription) {
    }
    return this.inputError;
  }
}
