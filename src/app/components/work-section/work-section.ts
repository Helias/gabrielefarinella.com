import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';

export interface WorkItem {
  /** Poster image shown for the card. */
  poster: string;
  /** Optional Vimeo video id; when set the card links out to the video. */
  vimeoId?: string;
  /** Translation key for the card caption. */
  captionKey: string;
}

@Component({
  selector: 'app-work-section',
  imports: [NgOptimizedImage, NgTemplateOutlet, TranslocoPipe],
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

      <ul class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @for (item of items(); track $index) {
          <li class="group overflow-hidden rounded-lg shadow-md ring-1 ring-black/5">
            @if (item.vimeoId) {
              <a
                [href]="'https://vimeo.com/' + item.vimeoId"
                target="_blank"
                rel="noopener noreferrer"
                class="block focus-visible:outline-2"
              >
                <ng-container [ngTemplateOutlet]="card" [ngTemplateOutletContext]="{ $implicit: item }" />
                <span class="sr-only">{{ 'work.watchOn' | transloco }}</span>
              </a>
            } @else {
              <ng-container [ngTemplateOutlet]="card" [ngTemplateOutletContext]="{ $implicit: item }" />
            }
          </li>
        }
      </ul>
    </div>

    <ng-template #card let-item>
      <figure class="relative bg-black/10">
        <img
          [ngSrc]="item.poster"
          width="640"
          height="360"
          [alt]="item.captionKey | transloco"
          class="aspect-video w-full object-cover transition group-hover:scale-[1.02]"
        />
        <figcaption
          class="flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium"
          [class.bg-white]="!dark()"
        >
          <span>{{ item.captionKey | transloco }}</span>
          <span class="text-xs uppercase tracking-wide opacity-70">
            {{ (item.vimeoId ? 'work.watchOn' : 'work.comingSoon') | transloco }}
          </span>
        </figcaption>
      </figure>
    </ng-template>
  `,
})
export class WorkSection {
  readonly sectionId = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descKey = input.required<string>();
  readonly dark = input<boolean>(false);
  readonly items = input<WorkItem[]>([]);

  protected readonly hasItems = computed(() => this.items().length > 0);
}
