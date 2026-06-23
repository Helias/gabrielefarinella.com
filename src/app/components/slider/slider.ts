import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';

const ROTATE_INTERVAL_MS = 5000;

@Component({
  selector: 'app-slider',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div
      class="relative mx-auto w-full overflow-hidden rounded-xl shadow-lg"
      role="group"
      aria-roledescription="carousel"
      [attr.aria-label]="t('slider.carousel')"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
      (focusin)="hovered.set(true)"
      (focusout)="hovered.set(false)"
    >
      <div class="relative aspect-video bg-black">
        @for (src of slides(); track src; let i = $index) {
          <div
            class="absolute inset-0 transition-opacity duration-700"
            role="group"
            aria-roledescription="slide"
            [attr.aria-label]="i + 1 + ' / ' + slides().length"
            [class.opacity-100]="i === current()"
            [class.opacity-0]="i !== current()"
            [attr.aria-hidden]="i !== current() ? 'true' : null"
            [attr.inert]="i !== current() ? '' : null"
          >
            <img
              [ngSrc]="src"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              [alt]="t('slider.carousel') + ' ' + (i + 1)"
              class="object-cover"
            />
          </div>
        }
      </div>

      <button
        type="button"
        class="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
        [attr.aria-label]="t('slider.previous')"
        (click)="prev()"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        class="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-white"
        [attr.aria-label]="t('slider.next')"
        (click)="next()"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
        @for (src of slides(); track src; let i = $index) {
          <button
            type="button"
            class="h-2.5 w-2.5 cursor-pointer rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            [class.bg-white]="i === current()"
            [class.bg-white/50]="i !== current()"
            [attr.aria-label]="t('slider.goToSlide') + ' ' + (i + 1)"
            [attr.aria-current]="i === current() ? 'true' : null"
            (click)="goTo(i)"
          ></button>
        }
        <button
          type="button"
          class="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white focus-visible:outline-2 focus-visible:outline-white"
          [attr.aria-label]="userPaused() ? t('slider.play') : t('slider.pause')"
          (click)="togglePlay()"
        >
          @if (userPaused()) {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          } @else {
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          }
        </button>
      </div>
    </div>
  `,
})
export class Slider {
  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly slides = input<string[]>([]);

  protected readonly current = signal(0);
  protected readonly userPaused = signal(false);
  protected readonly hovered = signal(false);

  constructor() {
    afterNextRender(() => {
      const reduced =
        typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) this.userPaused.set(true);

      const id = setInterval(() => {
        if (!this.userPaused() && !this.hovered()) this.next();
      }, ROTATE_INTERVAL_MS);
      this.destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  protected t(key: string): string {
    return this.transloco.translate(key);
  }

  protected prev(): void {
    const n = this.slides().length;
    if (n) this.current.update((i) => (i - 1 + n) % n);
  }

  protected next(): void {
    const n = this.slides().length;
    if (n) this.current.update((i) => (i + 1) % n);
  }

  protected goTo(index: number): void {
    this.current.set(index);
  }

  protected togglePlay(): void {
    this.userPaused.update((p) => !p);
  }
}
