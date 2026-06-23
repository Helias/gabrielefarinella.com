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

  it('should link the three social icons to Gabriele\'s real profiles with accessible labels', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('ul a') as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toBe(3);
    const hrefs = Array.from(links).map((a) => a.href);
    expect(hrefs).toContain('https://vimeo.com/gabrielefarinella');
    expect(hrefs.some((h) => h.includes('linkedin.com/in/gabriele-farinella'))).toBe(true);
    expect(hrefs.some((h) => h.includes('instagram.com/gabriele_farinella'))).toBe(true);
    links.forEach((a) => {
      expect(a.getAttribute('aria-label')).toBeTruthy();
      expect(a.getAttribute('rel')).toContain('noopener');
    });
  });

  it('should render the "powered by Stefano Borzì" credit link', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const credit = Array.from(fixture.nativeElement.querySelectorAll('a')).find(
      (a) => (a as HTMLAnchorElement).href === 'https://stefanoborzi.dev/',
    ) as HTMLAnchorElement | undefined;
    expect(credit).toBeTruthy();
    expect(credit?.textContent?.trim()).toBe('Stefano Borzì');
  });
});
