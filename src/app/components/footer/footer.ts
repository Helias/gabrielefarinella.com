import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block px-6 py-10 text-white',
    style: 'background-color: var(--bg-dark);',
  },
  template: `
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row">
      <div class="text-center text-sm text-white/80 sm:text-left">
        <p>{{ 'footer.copyright' | transloco }}</p>
        <p>{{ 'footer.kvk' | transloco }}</p>
      </div>

      <ul class="flex items-center gap-5">
        @for (social of socials; track social.key) {
          <li>
            <a
              [href]="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm font-medium hover:underline focus-visible:outline-2"
              [attr.aria-label]="'footer.followLabel' | transloco: { platform: social.label }"
            >
              {{ social.label }}
            </a>
          </li>
        }
      </ul>
    </div>
  `,
})
export class Footer {
  protected readonly socials = [
    { key: 'vimeo', label: 'Vimeo', url: 'https://vimeo.com/' },
    { key: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
    { key: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
  ];
}
