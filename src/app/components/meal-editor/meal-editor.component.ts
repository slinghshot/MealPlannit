import { Component, Input, OnChanges } from '@angular/core';
import {
  NgbActiveOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { SingleMeal } from 'src/app/models/SingleMeal';
import { EngineService } from 'src/app/services/engine.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Meal } from 'src/app/interfaces/meals';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meal-editor',
  templateUrl: './meal-editor.component.html',
  styleUrls: ['./meal-editor.component.css'],
})
export class MealEditorComponent {
  @Input() meal?: SingleMeal;
  saveFood?: Meal;
  isReadOnly: boolean = true;
  isBrowseSection: boolean = false;
  contentEditable: boolean = true;
  textHeight = '100px';
  isActive: string = 'viewer';
  delClicked: boolean = false;
  header: string = 'Viewer';
  showNutritionViewer: boolean = false;
  formCounter: number = this.meal?.meals.ingredients.length || 0;

  constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    private engineService: EngineService
  ) {}

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

  ngOnInit() {
    this.textHeight = `${
      Number(this.meal?.meals.mealDescription.length) + 40
    }px`;
    this.isBrowseSection = this.engineService.isBrowseSection

  }
  goToTop() {
    let top = document.getElementById('top');
    if (top != null) {
      top.scrollIntoView({ behavior: 'smooth' });
      // top = null;
    }
  }

  saveMeal(){
    console.log("saved")
    // console.log(this.meal?.meals);
    // console.log(this.engineService.createMeal(this.meal?.meals));
    this.saveFood=this.meal?.meals
    if(this.saveFood!=undefined){
      this.saveFood.shared=false;
    }
    this.engineService.createMeal(this.saveFood).subscribe({
      next: (value: any) => {
        // console.log(value);
        Swal.fire({
          title: 'Meal Saved',
          icon: 'success',
          confirmButtonColor: '#070f0dd3',
        }).then((result) => location.reload());
      },
      error: (err) => {
        console.log(err);
      },
    });
    
  }

  edit() {
    this.isReadOnly = false;
    this.isActive = 'editing';
    this.header = 'Update';
    this.showNutritionViewer = true;
    this.goToTop();
  }
  view() {
    this.isReadOnly = true;
    this.isActive = 'viewer';
    this.header = 'Viewer';
    this.goToTop();
  }
  updateMeal() {
    // if (this.meal) {
    //   console.log(this.meal.meals);
    //   console.log(this.meal.meals._id);
    // }

    if (this.meal?.meals._id) {
      this.engineService
        .updateMeal(this.meal?.meals, this.meal?.meals._id)
        .subscribe({
          next: (value: any) => {
            // console.log(value);
            this.activeOffcanvas.dismiss();
            location.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }

    // once successful
    // this.isReadOnly = true;
    // this.isActive = 'viewer';
  }
  confirmDelMeal() {
    this.delClicked = true;
  }
  deleteMeal() {
    // if (this.meal) {
    //   console.log(this.meal.meals);
    //   console.log(this.meal.meals._id);
    // }
    if (this.meal?.meals._id) {
      this.engineService.deleteMeal(this.meal?.meals._id).subscribe({
        next: (value: any) => {
          // console.log(value);
          this.activeOffcanvas.dismiss();
          location.reload();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
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
    this.meal?.meals.ingredients.push({
      ingredientName: '',
      ingredientDescription: '',
      amount: 0,
      amountType: '',
      calories: 0,
      protein: 0,
      fat: 0,
      isOptional: false,
      count: this.formCounter + 1,
    });
    this.formCounter += 1;
  }
  deleteForm(item: any) {
    // console.log(item);
    this.meal?.meals.ingredients.splice(item, 1);
  }
}
