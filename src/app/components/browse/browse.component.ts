import { Component } from '@angular/core';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { Meals } from 'src/app/interfaces/meals';
import { SingleMeal } from 'src/app/models/SingleMeal';
import { EngineService } from 'src/app/services/engine.service';
import { MealEditorComponent } from '../meal-editor/meal-editor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent {
  meals: Array<SingleMeal> = new Array<SingleMeal>();
  currentPage: number = 1;
  totalNumberOfPages: number = 1;
  urlGrab: string ='';
  mealDescription: string = '';

  constructor(
    private engineservice: EngineService,
    private offcanvasService: NgbOffcanvas
  ) {}

  getAllMeals(pageNumber: Number) {
    this.meals = new Array<SingleMeal>();
    this.engineservice.browseMeals(pageNumber).subscribe({
      next: (value: Meals,) => {
        // console.log(value);
        this.totalNumberOfPages=value.pageCount
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
    this.engineservice.isBrowseSection = true;
    this.getAllMeals(this.currentPage);
  }
  open(meal: SingleMeal) {
    const offcanvasRef = this.offcanvasService.open(MealEditorComponent, {
      panelClass: 'custom-dialog-container',
      backdrop: 'static',
    });
    offcanvasRef.componentInstance.meal = meal;
  }
  nextPage(){
    if(this.currentPage+1<=this.totalNumberOfPages)
      {
        this.currentPage= this.currentPage+1;
        this.getAllMeals(this.currentPage);
      }
  }
  previousPage(){
    if(this.currentPage-1>=1)
      {
        this.currentPage= this.currentPage-1;
        this.getAllMeals(this.currentPage);
      }
  }

  grabMeal(){
    var pattern = /^(https?:\/\/)?((([a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])\.)+[a-zA-Z]{2,63}|((\d{1,3}\.){3}\d{1,3}))(?::\d{1,5})?(\/\S*)?$/i;

    const isValidUrl = pattern.test(this.urlGrab);

    if(isValidUrl){
      let postData = {
        url: this.urlGrab,
        mealDescription: this.mealDescription,
      };
      console.log(postData);
      this.engineservice.grabMeal(postData).subscribe({
        next: (value: any) => {
          // console.log(value);
          Swal.fire({
            title: 'Meal Grabbed!',
            icon: 'success',
            confirmButtonColor: '#070f0dd3',
          }).then((result) => location.reload());
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: 'Failed to grab meal',
            icon: 'error',
            confirmButtonColor: '#070f0dd3',
          }).then((result) => location.reload());
        },
      });


  }else{
    Swal.fire({
      title: 'Enter valid URL',
      icon: 'error',
      confirmButtonColor: '#070f0dd3',
    }).then((result) => location.reload());
    // alert('error http');
  }
  }
}
