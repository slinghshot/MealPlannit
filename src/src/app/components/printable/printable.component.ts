import { Component } from '@angular/core';
import { EngineService } from 'src/app/services/engine.service';

@Component({
  selector: 'app-printable',
  templateUrl: './printable.component.html',
  styleUrls: ['./printable.component.css'],
})
export class PrintableComponent {
  generatedIngredients: Array<any> = new Array<any>();
  constructor(private engineservice: EngineService) {}
  ngOnInit() {
    let storedValues = JSON.parse(
      localStorage.getItem('IngredientList') || '{}'
    );
    console.log(storedValues);
    this.generatedIngredients = storedValues;
    setTimeout(() => {
      window.print();
    }, 2000);
    // this.generatedIngredients = this.engineservice.generatedIngredients;
  }

  printPage() {
    window.print();
  }
}
