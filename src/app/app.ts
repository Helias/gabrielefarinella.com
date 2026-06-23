import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { WorkSection, WorkItem } from './components/work-section/work-section';
import { TrustedBy } from './components/trusted-by/trusted-by';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

const PLACEHOLDER_POSTER = '/images/work-placeholder.svg';

function placeholderItems(captionKeys: string[]): WorkItem[] {
  return captionKeys.map((captionKey) => ({ poster: PLACEHOLDER_POSTER, captionKey }));
}

@Component({
  selector: 'app-root',
  imports: [TranslocoPipe, Navbar, Hero, About, WorkSection, TrustedBy, Contact, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly documentaryItems = placeholderItems([
    'work.documentary.title',
    'work.documentary.title',
    'work.documentary.title',
  ]);

  protected readonly commercialItems = placeholderItems([
    'work.commercial.title',
    'work.commercial.title',
    'work.commercial.title',
  ]);

  protected readonly musicItems = placeholderItems([
    'work.music.title',
    'work.music.title',
    'work.music.title',
  ]);
}
