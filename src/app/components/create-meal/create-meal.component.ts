import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validator } from '@angular/forms';
import { SingleMeal } from 'src/app/models/SingleMeal';
import { EngineService } from 'src/app/services/engine.service';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { InputError } from 'src/app/models/input-error';
import { InputValidatorService } from 'src/app/services/input-validator.service';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.component.html',
  styleUrls: ['./create-meal.component.css'],
})
export class CreateMealComponent implements OnChanges {
  submitted: boolean = false;
  mealName: string = '';
  mealDescription: string = '';
  shared: boolean = false;
  formCounter = 0;
  inputError: InputError = new InputError();
  @Input() meals?: Array<SingleMeal>;
  fileIng: any = [];

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.engineService.ingredientsList
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  searchMeasurement: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.engineService.measurements
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  constructor(
    private engineService: EngineService,
    private inputvalidator: InputValidatorService
  ) {}

  ngOnChanges(changes: any): void {
    let list: Array<string> = [];
    this.engineService.getIngredients().subscribe({
      next: (value: any) => {
        // console.log(value.length);
        list = value;
        // console.log(changes.meals.currentValue);

        if (this.meals) {
          this.meals.forEach((SingleMeal) => {
            SingleMeal.meals.ingredients.forEach((ingredient) => {
              // console.log(ingredient.ingredientName);
              list.push(ingredient.ingredientName);
            });
          });
        }
        // console.log(`length is ${list.length}`);
        // console.log(list);
        this.engineService.ingredientsList = [...new Set(list)];
        // this.engineService.ingredientsList = this.ingredientsList;
        // console.log(this.ingredientsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  mealForm = [
    {
      ingredientName: '',
      ingredientDescription: '',
      amount: '',
      amountType: '',
      calories: '',
      protein: '',
      fat: '',
      isOptional: false,
      count: this.formCounter,
    },
  ];

  addForm() {
    let currentForm = this.mealForm.slice();
    this.mealForm.push({
      ingredientName: '',
      ingredientDescription: '',
      amount: '',
      amountType: '',
      calories: '',
      protein: '',
      fat: '',
      isOptional: false,
      count: this.formCounter + 1,
    });
    this.formCounter += 1;
  }
  deleteForm(item: any) {
    // console.log(item.count);
    // this.passengerForm.pop();
    this.mealForm = this.mealForm.filter((e) => e.count != item.count);
  }

  checkIfInputError(inputError: InputError): boolean {
    let error = false;
    let errorTypes = Object.values(inputError);
    errorTypes.forEach((values) => {
      if (values === true) {
        error = true;
      }
    });
    return error;
  }

  logMeal() {
    this.inputError = new InputError();
    this.submitted = true;
    // console.log(this.mealName, this.mealDescription);
    this.inputError = this.inputvalidator.inputErrorCheck(
      this.mealName,
      this.mealDescription,
      this.mealForm,
      this.shared
    );
    // console.log(this.inputError);
    // if (this.checkIfInputError(this.inputError)) {
    //   console.log('input error!');
    //   return;
    // }

    // error
    // this.inputError.measurementInputError = true;

    // this.mealForm.forEach((item) => {
    //   console.log(item.ingredientName);
    //   console.log(item.amountType);
    //   console.log(item.isOptional);
    //   console.log(this.shared);
    // });

    let postData = {
      mealName: this.mealName,
      mealDescription: this.mealDescription,
      ingredients: [...this.mealForm],
      shared: this.shared,
    };
    // console.log(postData);
    if (!this.checkIfInputError(this.inputError)) {
      this.engineService.createMeal(postData).subscribe({
        next: (value: any) => {
          // console.log(value);
          location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('input error!');
    }
  }
}
