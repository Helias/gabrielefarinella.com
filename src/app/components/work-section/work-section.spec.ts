import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { WorkSection, WorkItem } from './work-section';

describe('WorkSection', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSection, getTranslocoTestingModule()],
    }).compileComponents();
  });

  function createFixture(items: WorkItem[], dark = false) {
    const fixture = TestBed.createComponent(WorkSection);
    fixture.componentRef.setInput('sectionId', 'documentary');
    fixture.componentRef.setInput('titleKey', 'work.documentary.title');
    fixture.componentRef.setInput('descKey', 'work.documentary.description');
    fixture.componentRef.setInput('dark', dark);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createFixture([]);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should set the host id from the sectionId input', () => {
    const fixture = createFixture([]);
    expect((fixture.nativeElement as HTMLElement).id).toBe('documentary');
  });

  it('should render one card per item', () => {
    const items: WorkItem[] = [
      { poster: '/images/work-placeholder.svg', captionKey: 'work.documentary.title' },
      { poster: '/images/work-placeholder.svg', captionKey: 'work.documentary.title' },
    ];
    const fixture = createFixture(items);
    expect(fixture.nativeElement.querySelectorAll('li').length).toBe(2);
  });

  it('should link a card to Vimeo when a vimeoId is provided', () => {
    const items: WorkItem[] = [
      { poster: '/images/work-placeholder.svg', captionKey: 'work.music.title', vimeoId: '12345' },
    ];
    const fixture = createFixture(items);
    const link = fixture.nativeElement.querySelector('li a') as HTMLAnchorElement;
    expect(link?.getAttribute('href')).toBe('https://vimeo.com/12345');
  });
});
