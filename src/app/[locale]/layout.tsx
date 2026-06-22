import ErrorBoundary from '@/components/error-boundary/ErrorBoundary';
import TriggerErrorButton from '@/components/error-boundary/TriggerErrorButton';
import LanguageSwitcher from '@/components/language-switcher/LanguageSwitcher';
import { ThemeButton } from '@/components/theme-button/ThemeButton';
import TopNav from '@/components/top-nav/TopNav';
import { ThemeProvider } from '@/context/ThemeProvider';
import '@/globals.scss';
import { Providers } from '@/providers/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import style from './layout.module.scss';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <ThemeProvider>
              <div className={style.container}>
                <ErrorBoundary>
                  <div className={style.row}>
                    <TriggerErrorButton />

                    <div className={style.tools}>
                      <TopNav />
                      <ThemeButton />
                      <LanguageSwitcher />
                    </div>
                  </div>

                  <main className={style.main}>{children}</main>
                </ErrorBoundary>
              </div>
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
