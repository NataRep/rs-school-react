import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Universe Search',
  description: 'My App is a Star Wars Universe Search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
