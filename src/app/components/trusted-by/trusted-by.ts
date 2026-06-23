import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-trusted-by',
  imports: [NgOptimizedImage, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'trusted-by',
    class: 'section-anchor block bg-white px-6 py-20 sm:py-28',
  },
  template: `
    <div class="mx-auto max-w-5xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {{ 'trustedBy.heading' | transloco }}
      </h2>
      <p class="mt-3 text-lg text-gray-700">{{ 'trustedBy.subheading' | transloco }}</p>

      <ul class="mt-12 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-5">
        @for (logo of logos; track logo) {
          <li class="flex items-center justify-center">
            <img
              [ngSrc]="'images/logo-placeholder.svg'"
              width="160"
              height="64"
              [alt]="logo"
              class="h-12 w-auto opacity-60 grayscale transition hover:opacity-100"
            />
          </li>
        }
      </ul>
    </div>
  `,
})
export class TrustedBy {
  protected readonly logos = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4', 'Brand 5'];
}
