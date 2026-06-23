import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  imports: [TranslocoPipe],
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
      <p class="mt-4 text-lg text-gray-700">{{ 'about.cta' | transloco }}</p>
    </div>
  `,
})
export class About {}
