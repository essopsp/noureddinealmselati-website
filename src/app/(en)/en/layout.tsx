import type { Metadata } from "next";
import "@/app/globals.css";
import { getDictionary } from "@/i18n/dictionaries";
import { Chrome } from "@/components/site/Chrome";
import { SITE_URL } from "@/lib/seo";

const dict = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: dict.site.title,
    template: `%s — ${dict.site.name}`,
  },
  description: dict.site.description,
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" data-locale="en">
      <body className="min-h-dvh bg-bg text-ink">
        <Chrome locale="en" dict={dict}>
          {children}
        </Chrome>
      </body>
    </html>
  );
}
