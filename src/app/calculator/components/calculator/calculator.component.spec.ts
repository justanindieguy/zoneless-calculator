import { CalculatorService } from '@/calculator/services/calculator.service';
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorComponent } from './calculator.component';

class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');

  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');

  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorComponent, CommonModule],
      providers: [{ provide: CalculatorService, useClass: MockCalculatorService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    fixture.detectChanges();

    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');

    fixture.detectChanges();

    expect(compiled.querySelector('span')!.innerText).toBe('456 *');

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');
  });

  it('should have 19 "Calculator Button" components', () => {
    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 "Calculator Button" components with content projection', () => {
    const buttons: DebugElement[] = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));
    expect(buttons.length).toBe(19);

    expect(buttons[0].nativeElement.textContent.trim()).toBe('C');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('+/-');
    expect(buttons[2].nativeElement.textContent.trim()).toBe('%');
    expect(buttons[3].nativeElement.textContent.trim()).toBe('÷');

    expect(buttons[4].nativeElement.textContent.trim()).toBe('7');
    expect(buttons[5].nativeElement.textContent.trim()).toBe('8');
    expect(buttons[6].nativeElement.textContent.trim()).toBe('9');
    expect(buttons[7].nativeElement.textContent.trim()).toBe('x');

    expect(buttons[8].nativeElement.textContent.trim()).toBe('4');
    expect(buttons[9].nativeElement.textContent.trim()).toBe('5');
    expect(buttons[10].nativeElement.textContent.trim()).toBe('6');
    expect(buttons[11].nativeElement.textContent.trim()).toBe('-');

    expect(buttons[12].nativeElement.textContent.trim()).toBe('1');
    expect(buttons[13].nativeElement.textContent.trim()).toBe('2');
    expect(buttons[14].nativeElement.textContent.trim()).toBe('3');
    expect(buttons[15].nativeElement.textContent.trim()).toBe('+');

    expect(buttons[16].nativeElement.textContent.trim()).toBe('0');
    expect(buttons[17].nativeElement.textContent.trim()).toBe('.');
    expect(buttons[18].nativeElement.textContent.trim()).toBe('=');
  });

  it('should handle keyboard events correctly', () => {
    const enterKeyPressedEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(enterKeyPressedEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const escKeyPressedEvent = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(escKeyPressedEvent);
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');
  });

  it('should display "result" and "sub-result" text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('+');
    fixture.detectChanges();

    const result: HTMLSpanElement = compiled.querySelector('#result')!;
    expect(result.innerText).toBe('123');

    const subResult: HTMLSpanElement = compiled.querySelector('#sub-result')!;
    expect(subResult.innerText).toBe('10 +');
  });

  it('should format "result" and "sub-result" text using "number" pipe', () => {
    mockCalculatorService.resultText.and.returnValue('1000');
    mockCalculatorService.subResultText.and.returnValue('20000');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    const result: HTMLSpanElement = compiled.querySelector('#result')!;
    expect(result.innerText).toBe('1,000');

    const subResult: HTMLSpanElement = compiled.querySelector('#sub-result')!;
    expect(subResult.innerText).toBe('20,000 -');
  });

  it('should not display "sub-result" text when its current value is 0', () => {
    mockCalculatorService.resultText.and.returnValue('0');
    mockCalculatorService.subResultText.and.returnValue('0');
    mockCalculatorService.lastOperator.and.returnValue('+');
    fixture.detectChanges();

    const subResult: HTMLSpanElement | null = compiled.querySelector('#sub-result');
    expect(subResult).toBeNull();
  });
});
