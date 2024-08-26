// app/layout.tsx
//global layout for entire app that applies to all pages within its directory

import { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'GhostLink',
  description: 'Upload and manage your files.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}