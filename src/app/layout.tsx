import type { Metadata } from 'next';
import { Qwitcher_Grypen, Afacad } from 'next/font/google';

import './globals.css';

const qwitcherGrypen = Qwitcher_Grypen({
  subsets: ['latin'], // Specify the subset needed
  weight: ['400', '700'], // Add the weights you plan to use
  variable: '--font-qwitcher', // Optional: Define as a CSS variable
});

const afacadFlux = Afacad({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-afacad', // Optional CSS variable
});

export const metadata: Metadata = {
  title: 'A/B Signing-Off Now',
  description:
    'This is my official way to apologize and state my feelings to someone who I met a year ago.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${qwitcherGrypen.variable} ${afacadFlux.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
