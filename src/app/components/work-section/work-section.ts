import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslocoPipe } from '@jsverse/transloco';

export interface WorkItem {
  /** Video title, used as caption, image alt and iframe title. Not translated (proper title). */
  title: string;
  provider: 'youtube' | 'vimeo';
  videoId: string;
  /** Vimeo privacy hash (`h` param); required for unlisted Vimeo videos. */
  hash?: string;
  /** Local poster image path shown before the video is loaded. */
  poster: string;
}

@Component({
  selector: 'app-work-section',
  imports: [NgOptimizedImage, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'section-anchor block px-6 py-20 sm:py-28',
    '[id]': 'sectionId()',
    '[class.bg-white]': '!dark()',
    '[style.background-color]': "dark() ? 'var(--bg-dark)' : null",
    '[class.text-white]': 'dark()',
  },
  template: `
    <div class="mx-auto max-w-6xl">
      <header class="max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">{{ titleKey() | transloco }}</h2>
        <p class="mt-3 text-lg" [class.text-white]="dark()" [class.text-gray-700]="!dark()">
          {{ descKey() | transloco }}
        </p>
      </header>

      <ul class="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        @for (item of items(); track item.videoId; let i = $index) {
          <li class="overflow-hidden rounded-lg bg-black shadow-md ring-1 ring-black/5">
            <div class="relative aspect-video">
              @if (opened().has(i)) {
                <iframe
                  class="absolute inset-0 h-full w-full"
                  [src]="embedUrl(item)"
                  [title]="item.title"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowfullscreen
                ></iframe>
              } @else {
                <button
                  type="button"
                  class="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  [attr.aria-label]="'work.playLabel' | transloco: { title: item.title }"
                  (click)="open(i)"
                >
                  <img
                    [ngSrc]="item.poster"
                    width="640"
                    height="360"
                    [alt]="item.title"
                    class="h-full w-full object-cover"
                  />
                  <span class="absolute inset-0 bg-black/25 transition group-hover:bg-black/10"></span>
                  <span
                    class="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition group-hover:scale-110"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 5v14l11-7z" fill="rgba(70,82,87,1)" />
                    </svg>
                  </span>
                </button>
              }
            </div>
            <p class="bg-white px-4 py-3 text-sm font-medium text-gray-900">{{ item.title }}</p>
          </li>
        }
      </ul>
    </div>
  `,
})
export class WorkSection {
  private readonly sanitizer = inject(DomSanitizer);

  readonly sectionId = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descKey = input.required<string>();
  readonly dark = input<boolean>(false);
  readonly items = input<WorkItem[]>([]);

  protected readonly opened = signal<ReadonlySet<number>>(new Set());

  protected open(index: number): void {
    this.opened.update((set) => new Set(set).add(index));
  }

  protected embedUrl(item: WorkItem): SafeResourceUrl {
    const url =
      item.provider === 'youtube'
        ? `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&playsinline=1`
        : `https://player.vimeo.com/video/${item.videoId}?h=${item.hash}&autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
