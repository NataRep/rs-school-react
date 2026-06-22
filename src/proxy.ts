import createMiddleware from 'next-intl/middleware';
import { localePrefix, locales } from './i18n/navigation';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en',
  localePrefix: localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
