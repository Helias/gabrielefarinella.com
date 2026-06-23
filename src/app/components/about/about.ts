import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

import { Slider } from '../slider/slider';

@Component({
  selector: 'app-about',
  imports: [TranslocoPipe, Slider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'about',
    class: 'section-anchor block bg-white px-6 py-20 sm:py-28',
  },
  template: `
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-sm font-semibold uppercase tracking-widest text-[rgba(70,82,87,1)]">
        {{ 'about.heading' | transloco }}
      </h2>
      <p class="mt-6 text-2xl font-medium leading-snug text-gray-900 sm:text-3xl">
        {{ 'about.valueProp' | transloco }}
      </p>
      <p class="mt-6 text-lg text-gray-700">{{ 'about.bio' | transloco }}</p>
    </div>

    <div class="mx-auto mt-12 max-w-4xl">
      <app-slider [slides]="slides" />
    </div>
  `,
})
export class About {
  protected readonly slides = [
    'images/slider/slide-1.jpg',
    'images/slider/slide-2.jpg',
    'images/slider/slide-3.jpg',
  ];
}
