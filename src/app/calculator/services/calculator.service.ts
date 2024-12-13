import { Injectable, signal } from '@angular/core';

const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

const operators = new Set(['+', '-', '*', '/']);

const specialOperators = new Set(['+/-', '%', '.', '=', 'C', 'Backspace']);

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<string>('+');

  private validInputCharacters = new Set([...numbers, ...operators, ...specialOperators]);

  public constructNumber(value: string): void {
    // Validate input
    if (!this.validInputCharacters.has(value)) {
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
        return;
      }

      this.resultText.update((text: string) => text.slice(0, -1));

      return;
    }

    // Apply operator
    if (operators.has(value)) {
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // Limit characters
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    // Validate floating point
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update((text: string) => text + '.');
      return;
    }

    // Handling initial '0' value
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // Change sign
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((text: string) => text.slice(1));
        return;
      }

      this.resultText.update((text: string) => '-' + text);
      return;
    }

    // Numbers
    if (numbers.has(value)) {
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return;
      }

      this.resultText.update((text: string) => text + value);
      return;
    }
  }
}
