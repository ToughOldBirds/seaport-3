import "./globals.css";
import type { Metadata } from "next";
import { OfficeProvider } from "@/office/OfficeContext";

export const metadata: Metadata = {
  title: "Word + Web Shared App",
  description: "Next.js app for web and Microsoft Word add-in taskpane"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OfficeProvider>{children}</OfficeProvider>
      </body>
    </html>
  );
}
