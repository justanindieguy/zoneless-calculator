import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

const IS_DOUBLE_SIZE_INPUT = 'isDoubleSize';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="projected-content">1</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply "w-1/4" when "doubleSize" is false', () => {
    expect(component.isDoubleSize()).toBeFalse();
    expect(compiled.classList).toContain('w-1/4');
  });

  it('should apply "w-2/4" when "doubleSize" is true', () => {
    fixture.componentRef.setInput(IS_DOUBLE_SIZE_INPUT, true);
    fixture.detectChanges();

    expect(component.isDoubleSize()).toBeTrue();
    expect(compiled.classList).toContain('w-2/4');
  });

  it('should emit "onClick" when clicking the button', () => {
    spyOn(component.onClick, 'emit');

    const buttonElement = compiled.querySelector('button')!;
    buttonElement.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set "isPressed" to true and then false, when "keyboardPressedStyle" is called with a matching key', fakeAsync(() => {
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    tick(101);

    expect(component.isPressed()).toBeFalse();
  }));

  it('should not set "isPressed" to true when "keyboardPressedStyle" is called and key is not matching', () => {
    spyOn(component.isPressed, 'set');

    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('2');

    expect(component.isPressed.set).not.toHaveBeenCalled();
    expect(component.isPressed()).toBeFalse();
  });

  it('should apply the class "is-pressed" to the button and then remove it, when "keyboardPressedStyled" is called with a matching key', fakeAsync(() => {
    const buttonElement = compiled.querySelector('button')!;

    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('1');
    fixture.detectChanges();

    expect(buttonElement.classList).toContain('is-pressed');

    tick(101);
    fixture.detectChanges();

    expect(buttonElement.classList).not.toContain('is-pressed');
  }));

  it('should display projected content', () => {
    const testHostComponentFixture = TestBed.createComponent(TestHostComponent);
    testHostComponentFixture.detectChanges();

    const compiled = testHostComponentFixture.nativeElement as HTMLDivElement;
    const projectedContentElement = compiled.querySelector('.projected-content')! as HTMLSpanElement;

    expect(projectedContentElement).not.toBeNull();
    expect(projectedContentElement.innerText).toBe('1');
  });
});
