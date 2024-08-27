// app/layout.tsx
//global layout for entire app that applies to all pages within its directory

import { ReactNode } from "react";
import "../styles/globals.css";
import Navbar from "@/components/Navbar/navbar";

export const metadata = {
  title: "GhostLink",
  description: "Upload and manage your files.",
  icons: [
    {
      rel: "icon",
      url: "/sampleLogo2.jpg",
      sizes: "16x16", // Specify the size
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
