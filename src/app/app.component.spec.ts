import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should render router-outlet wrapped with css classes', () => {
    const divElement = compiled.querySelector('div')!;

    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');

    const divClasses = Array.from(divElement.classList);

    expect(divElement).toBeTruthy();

    mustHaveClasses.forEach((className: string) => {
      expect(divClasses).toContain(className);
    });
  });

  it("should render 'buy me a beer' link", () => {
    const anchorElement = compiled.querySelector('a')! as HTMLAnchorElement;

    expect(anchorElement).toBeTruthy();

    expect(anchorElement.title).toBe('Buy me a beer');
    expect(anchorElement.href).toBe('https://www.buymeacoffee.com/scottwindon');
  });
});
