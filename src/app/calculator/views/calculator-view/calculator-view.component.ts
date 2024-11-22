import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { Component } from '@angular/core';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  styles: ``,
})
export default class CalculatorViewComponent {}
