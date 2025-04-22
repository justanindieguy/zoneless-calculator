import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let component: CalculatorViewComponent;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorViewComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div')!;
    const mustHaveClasses = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    mustHaveClasses.forEach((className: string) => {
      expect(divElement.classList).toContain(className);
    });
  });
});
