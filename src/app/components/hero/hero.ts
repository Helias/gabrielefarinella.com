import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  viewChild,
} from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  imports: [TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    id: 'home',
    class: 'section-anchor relative flex min-h-screen items-center justify-center overflow-hidden',
  },
  template: `
    <video
      #heroVideo
      class="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
      tabindex="-1"
      poster="images/hero-poster.svg"
    >
      <source src="videos/hero.mp4" type="video/mp4" />
    </video>

    <!-- Dark overlay keeps white heading text above WCAG AA contrast over the video. -->
    <div class="absolute inset-0" style="background-color: rgba(70, 82, 87, 0.62);" aria-hidden="true"></div>

    <div class="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
      <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">{{ 'hero.name' | transloco }}</h1>
      <p class="mt-4 text-lg sm:text-2xl">{{ 'hero.role' | transloco }}</p>
      <p class="mt-2 text-sm uppercase tracking-widest text-white/90 sm:text-base">
        {{ 'hero.tagline' | transloco }}
      </p>
      <a
        href="#contact"
        class="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-[rgba(70,82,87,1)] transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {{ 'hero.cta' | transloco }}
      </a>
    </div>
  `,
})
export class Hero {
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('heroVideo');

  constructor() {
    // Angular's template `muted` attribute does not set the DOM `muted` property, so
    // browsers block autoplay. Force the property on, then start playback.
    afterNextRender(() => {
      const el = this.video()?.nativeElement;
      if (!el) return;
      el.muted = true;
      el.play().catch(() => {
        /* autoplay may still be refused (e.g. reduced-motion); the poster stays visible */
      });
    });
  }
}
