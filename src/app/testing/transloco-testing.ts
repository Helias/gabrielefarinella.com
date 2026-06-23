import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';

export function getTranslocoTestingModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en: {}, nl: {} },
    translocoConfig: {
      availableLangs: ['en', 'nl'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
