
import './globals.css';
import { Providers } from './providers';
import Header from '../components/ui/Header';

export const metadata = {
  title: 'pleaseTestMyApp',
  description: 'Marketplace for Devs and Testers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
