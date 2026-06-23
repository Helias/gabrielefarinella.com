import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { Slider } from './slider';

const SLIDES = ['images/slider/slide-1.jpg', 'images/slider/slide-2.jpg', 'images/slider/slide-3.jpg'];

describe('Slider', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider, getTranslocoTestingModule()],
    }).compileComponents();
  });

  function createFixture() {
    const fixture = TestBed.createComponent(Slider);
    fixture.componentRef.setInput('slides', SLIDES);
    fixture.detectChanges();
    return fixture;
  }

  function currentDotIndex(el: HTMLElement): number {
    const dots = [...el.querySelectorAll('button[aria-current]')];
    const dotButtons = [...el.querySelectorAll('[aria-label^="slider.goToSlide"]')];
    return dotButtons.findIndex((d) => d.getAttribute('aria-current') === 'true');
  }

  it('should create', () => {
    expect(createFixture().componentInstance).toBeTruthy();
  });

  it('should render one image per slide', () => {
    const el = createFixture().nativeElement as HTMLElement;
    expect(el.querySelectorAll('img').length).toBe(3);
  });

  it('should start on the first slide', () => {
    const el = createFixture().nativeElement as HTMLElement;
    expect(currentDotIndex(el)).toBe(0);
  });

  it('should advance to the next slide and wrap around', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const next = el.querySelector('button[aria-label="slider.next"]') as HTMLButtonElement;

    next.click();
    fixture.detectChanges();
    expect(currentDotIndex(el)).toBe(1);
  });

  it('should jump to a slide via its dot', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const dots = el.querySelectorAll('[aria-label^="slider.goToSlide"]');

    (dots[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(currentDotIndex(el)).toBe(2);
  });

  it('should toggle the play/pause control', () => {
    const fixture = createFixture();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = () => el.querySelector('button[aria-label="slider.pause"], button[aria-label="slider.play"]') as HTMLButtonElement;

    expect(toggle().getAttribute('aria-label')).toBe('slider.pause');
    toggle().click();
    fixture.detectChanges();
    expect(toggle().getAttribute('aria-label')).toBe('slider.play');
  });
});
