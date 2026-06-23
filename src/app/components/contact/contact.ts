import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'contact',
    class: 'section-anchor block px-6 py-20 text-white sm:py-28',
    style: 'background-color: var(--bg-dark);',
  },
  template: `
    <div class="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
      <div>
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ 'contact.heading' | transloco }}</h2>
        <p class="mt-6 text-2xl font-medium">{{ 'contact.intro' | transloco }}</p>
        <p class="mt-4 text-lg text-white/90">{{ 'contact.body' | transloco }}</p>
      </div>

      <div class="rounded-lg bg-white p-2 shadow-lg">
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
