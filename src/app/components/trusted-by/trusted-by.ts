import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

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

      <ul class="mt-12 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        @for (logo of logos; track logo.src) {
          <li class="flex items-center justify-center">
            <img
              [ngSrc]="logo.src"
              [width]="logo.width"
              [height]="logo.height"
              [alt]="logo.alt"
              class="h-20 w-auto max-w-[220px] object-contain opacity-80 transition hover:opacity-100"
            />
          </li>
        }
      </ul>
    </div>
  `,
})
export class TrustedBy {
  protected readonly logos: Logo[] = [
    { src: 'images/logos/logo-1.png', alt: 'ODO7', width: 2568, height: 496 },
    { src: 'images/logos/logo-2.png', alt: 'KIEM', width: 1066, height: 319 },
    { src: 'images/logos/logo-3.webp', alt: 'Jaguar House', width: 400, height: 400 },
    { src: 'images/logos/noiselab.png', alt: 'NOISE LAb', width: 1024, height: 640 },
    { src: 'images/logos/x3-padel.png', alt: 'X3 Padel', width: 647, height: 386 },
    { src: 'images/logos/chiaria.png', alt: 'Chiaria', width: 800, height: 829 },
    { src: 'images/logos/albero.jpg', alt: "L'albero Filosofico", width: 170, height: 188 },
    { src: 'images/logos/logo-8.png', alt: 'G.P. Auto', width: 1167, height: 137 },
  ];
}
