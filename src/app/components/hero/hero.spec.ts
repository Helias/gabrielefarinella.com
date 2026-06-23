import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero, getTranslocoTestingModule()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Hero);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render an h1 and a decorative background video', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')).toBeTruthy();
    const video = el.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('aria-hidden')).toBe('true');
  });
});
