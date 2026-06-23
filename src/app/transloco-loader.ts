import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string) {
    // Relative path (no leading slash) so it resolves against <base href>,
    // which lets the app work both at the domain root and under a GitHub Pages subpath.
    return this.http.get<Translation>(`i18n/${lang}.json`);
  }
}
