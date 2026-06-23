import { TestBed } from '@angular/core/testing';
import { getTranslocoTestingModule } from '../../testing/transloco-testing';
import { WorkSection, WorkItem } from './work-section';

const YT_ITEM: WorkItem = {
  title: 'Skatepark doc',
  provider: 'youtube',
  videoId: 'r0FBfBL3_KA',
  poster: '/images/posters/yt_r0FBfBL3_KA.jpg',
};

const VIMEO_ITEM: WorkItem = {
  title: 'Royal Bar spot',
  provider: 'vimeo',
  videoId: '734285569',
  hash: '6799df1c76',
  poster: '/images/posters/vm_734285569.jpg',
};

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

  it('should render a poster facade (not an iframe) before the play button is clicked', () => {
    const fixture = createFixture([YT_ITEM]);
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('button')).toBeTruthy();
    expect(el.querySelector('img')?.getAttribute('alt')).toBe('Skatepark doc');
    expect(el.querySelector('iframe')).toBeNull();
  });

  it('should load the YouTube embed after clicking play', () => {
    const fixture = createFixture([YT_ITEM]);
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe).toBeTruthy();
    expect(iframe.src).toContain('youtube-nocookie.com/embed/r0FBfBL3_KA');
    expect(iframe.getAttribute('title')).toBe('Skatepark doc');
  });

  it('should build a Vimeo embed url including the privacy hash', () => {
    const fixture = createFixture([VIMEO_ITEM]);
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    const iframe = fixture.nativeElement.querySelector('iframe') as HTMLIFrameElement;
    expect(iframe.src).toContain('player.vimeo.com/video/734285569');
    expect(iframe.src).toContain('h=6799df1c76');
  });
});
