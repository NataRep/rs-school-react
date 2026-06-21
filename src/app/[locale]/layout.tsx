import MainLayout from '@/components/layout/Layout';
import { Providers } from '@/providers/Providers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.scss';

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
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
