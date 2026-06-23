import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer, getTranslocoTestingModule()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Footer);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the three social links with accessible labels', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(3);
    links.forEach((a: HTMLAnchorElement) => {
      expect(a.getAttribute('aria-label')).toBeTruthy();
      expect(a.getAttribute('rel')).toContain('noopener');
    });
  });
});
