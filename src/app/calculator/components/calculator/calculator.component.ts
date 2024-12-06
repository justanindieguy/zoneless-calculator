import { CalculatorService } from '@/calculator/services/calculator.service';
import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  public resultText = computed(() => this.calculatorService.resultText());
  public subResultText = computed(() => this.calculatorService.subResultText());
  public lastOperator = computed(() => this.calculatorService.lastOperator());

  private calculatorService: CalculatorService = inject(CalculatorService);

  private keyEquivalents: Record<string, string> = {
    Enter: '=',
    Escape: 'C',
    Clear: 'C',
    '*': 'x',
    '/': '÷',
  };

  public handleClick(event: string) {
    console.log({ key: event });
  }

  public handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    const keyValue = this.keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((button: CalculatorButtonComponent) => {
      button.keyboardPressedStyle(keyValue);
    });
  }
}
