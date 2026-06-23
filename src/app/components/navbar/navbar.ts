import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';

type Lang = 'en' | 'nl';

interface LangOption {
  code: Lang;
  flag: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'fixed inset-x-0 top-0 z-50 text-white shadow-md',
    style: 'background-color: var(--bg-dark); height: var(--navbar-height);',
  },
  template: `
    <nav
      class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6"
      [attr.aria-label]="'nav.work' | transloco"
    >
      <a href="#hero" class="text-lg font-semibold tracking-wide focus-visible:outline-2">
        {{ 'nav.brand' | transloco }}
      </a>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded p-2 focus-visible:outline-2 md:hidden"
        [attr.aria-expanded]="menuOpen()"
        aria-controls="primary-menu"
        (click)="menuOpen.set(!menuOpen())"
      >
        <span class="sr-only">{{ 'nav.work' | transloco }}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>

      <div
        id="primary-menu"
        class="absolute inset-x-0 top-full flex flex-col gap-1 px-4 py-3 shadow-md md:static md:flex md:flex-row md:items-center md:gap-6 md:px-0 md:py-0 md:shadow-none"
        [class.hidden]="!menuOpen()"
        style="background-color: var(--bg-dark);"
      >
        <ul class="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
          @for (link of links; track link.id) {
            <li>
              <a
                [href]="'#' + link.id"
                class="block rounded px-2 py-1.5 text-sm font-medium hover:underline focus-visible:outline-2"
                (click)="menuOpen.set(false)"
              >
                {{ link.labelKey | transloco }}
              </a>
            </li>
          }
        </ul>

        <div class="mt-2 flex items-center gap-1 md:mt-0 md:ml-4" role="group" [attr.aria-label]="'nav.languageLabel' | transloco">
          @for (lang of languages; track lang.code) {
            <button
              type="button"
              class="flex cursor-pointer items-center gap-1 rounded px-2 py-1 text-sm uppercase focus-visible:outline-2"
              [class.font-bold]="activeLang() === lang.code"
              [class.underline]="activeLang() === lang.code"
              [class.opacity-70]="activeLang() !== lang.code"
              [attr.aria-pressed]="activeLang() === lang.code"
              (click)="setLang(lang.code)"
            >
              <span aria-hidden="true">{{ lang.flag }}</span>
              <span>{{ lang.code }}</span>
            </button>
          }
        </div>
      </div>
    </nav>
  `,
})
export class Navbar {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);

  protected readonly menuOpen = signal(false);
  protected readonly activeLang = signal<Lang>('en');
  protected readonly languages: readonly LangOption[] = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'nl', flag: '🇳🇱' },
  ];

  protected readonly links = [
    { id: 'documentary', labelKey: 'nav.documentary' },
    { id: 'commercial', labelKey: 'nav.commercial' },
    { id: 'music', labelKey: 'nav.music' },
    { id: 'trusted-by', labelKey: 'nav.trustedBy' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  protected setLang(lang: Lang): void {
    this.transloco.setActiveLang(lang);
    this.activeLang.set(lang);
    this.document.documentElement.lang = lang;
  }
}
