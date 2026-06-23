import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { WorkSection, WorkItem } from './components/work-section/work-section';
import { TrustedBy } from './components/trusted-by/trusted-by';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [TranslocoPipe, Navbar, Hero, About, WorkSection, TrustedBy, Contact, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly documentaryItems: WorkItem[] = [
    {
      title: 'Can they save Amsterdam skatepark with a party?',
      provider: 'youtube',
      videoId: 'r0FBfBL3_KA',
      poster: 'images/posters/yt_r0FBfBL3_KA.jpg',
    },
  ];

  protected readonly commercialItems: WorkItem[] = [
    {
      title: 'Spot DR 5.0 - Senza compromessi',
      provider: 'vimeo',
      videoId: '734282572',
      hash: '2da144c6ea',
      poster: 'images/posters/vm_734282572.jpg',
    },
    {
      title: "Impariamo a prenderci cura dell'esistenza",
      provider: 'vimeo',
      videoId: '674371912',
      hash: '887b388fb0',
      poster: 'images/posters/vm_674371912.jpg',
    },
    {
      title: 'Spot Royal Bar - Come piace a voi',
      provider: 'vimeo',
      videoId: '734285569',
      hash: '6799df1c76',
      poster: 'images/posters/vm_734285569.jpg',
    },
  ];

  protected readonly musicItems: WorkItem[] = [
    {
      title: 'TeoAlien - Non pensare a me',
      provider: 'youtube',
      videoId: 'fCAjDhfurpE',
      poster: 'images/posters/yt_fCAjDhfurpE.jpg',
    },
    {
      title: "Moon N' Skin - Morirò da Re (Måneskin Live Cover)",
      provider: 'youtube',
      videoId: 'wSk_VLXPhH0',
      poster: 'images/posters/yt_wSk_VLXPhH0.jpg',
    },
    {
      title: "Moon N' Skin - Zitti e Buoni (Måneskin Live Cover)",
      provider: 'youtube',
      videoId: 'iYa7sYeB6TY',
      poster: 'images/posters/yt_iYa7sYeB6TY.jpg',
    },
  ];
}
