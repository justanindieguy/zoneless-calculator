import { booleanAttribute, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-1/4]': '!doubleSize',
    '[class.w-2/4]': 'doubleSize',
  },
})
export class CalculatorButtonComponent {
  public isPressed = signal(false);
  public isCommand = input(false, { transform: booleanAttribute });
  public isDoubleSize = input(false, { transform: booleanAttribute });
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public onClick = output<string>();

  get doubleSize(): boolean {
    return this.isDoubleSize();
  }

  public handleClick(): void {
    if (!this.contentValue()?.nativeElement) {
      return;
    }

    const value: string = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string): void {
    if (!this.contentValue) {
      return;
    }

    const value: string = this.contentValue()!.nativeElement.innerText;

    if (value !== key) {
      return;
    }

    this.isPressed.set(true);

    timer(100).subscribe(() => this.isPressed.set(false));
  }
}
