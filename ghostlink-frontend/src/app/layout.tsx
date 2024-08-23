// app/layout.tsx
//global layout for entire app that applies to all pages within its directory

import { ReactNode } from 'react';
import './styles/globals.css';  // Adjust the path if needed

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