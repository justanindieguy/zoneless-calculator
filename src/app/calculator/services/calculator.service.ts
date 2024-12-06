import { Injectable, signal } from '@angular/core';

const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

const operators = new Set(['+', '-', '*', '/']);

const specialOperators = new Set(['+/-', '%', '.', '=', 'C', 'Backspace']);

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal<string>('1234.56');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');

  public constructNumber(value: string): void {
    const validInputCharacters = new Set([...numbers, ...operators, ...specialOperators]);

    // Validate input
    if (!validInputCharacters.has(value)) {
      console.log('Invalid Input:', value);
      return;
    }

    if (value === '=') {
      // TODO
      console.log('Calculate Result');
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');

      // TODO
      console.log('Clear');
      return;
    }

    // TODO: Check when negative values are updated.
    if (value === 'Backspace') {
      if (this.resultText() === '0') {
        return;
      }

      if (this.resultText().length === 1) {
        this.resultText.set('0');
      }

      this.resultText.update((currentValue: string) => currentValue.slice(0, -1));

      return;
    }

    // Apply operator
    if (operators.has(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Validate floating point
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.update((currentValue: string) => currentValue + '0.');
      }

      return;
    }

    this.resultText.update((currentValue: string) => currentValue + '.');
  }
}
