import { OfficeProvider } from "@/office/OfficeContext";

export default function OfficeLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OfficeProvider>{children}</OfficeProvider>;
}
