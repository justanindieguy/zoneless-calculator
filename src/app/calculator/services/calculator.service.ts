import { Injectable, signal } from '@angular/core';

type Operator = '+' | '-' | 'x' | '÷' | '%';

const numbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

const operators: Set<Operator> = new Set(['+', '-', 'x', '÷', '%']);

const specialOperators = new Set(['+/-', '.', '=', 'C', 'Backspace']);

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal<string>('0');
  public subResultText = signal<string>('0');
  public lastOperator = signal<Operator>('+');

  private validInputCharacters = new Set([...numbers, ...operators, ...specialOperators]);
  private numberFormatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, useGrouping: false });

  public constructNumber(value: string): void {
    // Validate input
    if (!this.validInputCharacters.has(value)) {
      console.log('Invalid Input:', value);
      return;
    }

    if (value === '=') {
      this.resultText.set(this.calculateResult());
      this.subResultText.set('0');
      return;
    }

    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');

      return;
    }

    if (value === 'Backspace') {
      if (this.resultText() === '0') {
        return;
      }

      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
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
    if (operators.has(value as Operator)) {
      if (this.subResultText() !== '0' && this.resultText() !== '0') {
        this.subResultText.set(this.calculateResult());
        this.resultText.set('0');
        this.lastOperator.set(value as Operator);

        return;
      }

      this.lastOperator.set(value as Operator);

      if (this.resultText() !== '0') {
        this.subResultText.set(this.resultText());
      }

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

  private calculateResult(): string {
    const number1: number = parseFloat(this.subResultText());
    const number2: number = parseFloat(this.resultText());

    let result: number = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
      case '%':
        result = number1 * (number2 / 100);
        break;
      default:
        throw new Error('Invalid operator.');
    }

    return this.numberFormatter.format(result);
  }
}
