import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, getTranslocoTestingModule()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Navbar);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a language button per available language', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const langGroup = fixture.nativeElement.querySelector('[role="group"]') as HTMLElement;
    expect(langGroup.querySelectorAll('button').length).toBe(2);
  });

  it('should mark the active language and update the document lang on switch', () => {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('[role="group"] button');
    const nlButton = buttons[1] as HTMLButtonElement;

    nlButton.click();
    fixture.detectChanges();

    expect(nlButton.getAttribute('aria-pressed')).toBe('true');
    expect(document.documentElement.lang).toBe('nl');
  });
});
