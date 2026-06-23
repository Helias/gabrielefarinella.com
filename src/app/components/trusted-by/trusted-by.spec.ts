import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { TrustedBy } from './trusted-by';

describe('TrustedBy', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedBy, getTranslocoTestingModule()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TrustedBy);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render a logo per brand with alt text', () => {
    const fixture = TestBed.createComponent(TrustedBy);
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');
    expect(images.length).toBe(5);
    images.forEach((img: HTMLImageElement) => expect(img.getAttribute('alt')).toBeTruthy());
  });
});
