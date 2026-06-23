import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoPipe } from '@jsverse/transloco';

/**
 * Embedded Google Form URL. Replace with the real form's "?embedded=true" share URL.
 * Format: https://docs.google.com/forms/d/e/<FORM_ID>/viewform?embedded=true
 */
const CONTACT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeJb4SniTyUSi-_3Q5OPDxEtNIithObxHunpAfXMBB6dEvYtg/viewform?embedded=true';

@Component({
  selector: 'app-contact',
  imports: [NgOptimizedImage, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'contact',
    class: 'section-anchor block bg-white px-6 py-20 text-gray-900 sm:py-28',
  },
  template: `
    <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
      <div>
        <p class="text-sm font-semibold uppercase tracking-widest text-[rgba(70,82,87,1)]">
          {{ 'contact.heading' | transloco }}
        </p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{{ 'contact.intro' | transloco }}</h2>
        <p class="mt-4 text-lg text-gray-700">{{ 'contact.body1' | transloco }}</p>
        <p class="mt-3 text-lg text-gray-700">{{ 'contact.body2' | transloco }}</p>
        <p class="mt-3 text-lg text-gray-700">{{ 'contact.body3' | transloco }}</p>
        <img
          [ngSrc]="'images/gabriele.jpg'"
          width="1280"
          height="858"
          [alt]="'hero.name' | transloco"
          class="mt-8 w-full max-w-md rounded-lg object-cover shadow-lg"
        />
      </div>

      <div class="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10">
        <iframe
          [src]="formUrl"
          [title]="'contact.formTitle' | transloco"
          class="h-[640px] w-full rounded"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  `,
})
export class Contact {
  protected readonly formUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(CONTACT_FORM_URL);
}
