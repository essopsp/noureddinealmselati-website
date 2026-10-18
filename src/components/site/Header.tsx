"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "./UiProvider";
import { DisplaySettings } from "./DisplaySettings";
import { href, otherLocale } from "@/i18n/config";
import { GlobeIcon } from "@/components/ui/icons";

export function Header() {
  const { locale, dict } = useUi();
  const pathname = usePathname();

  // مسار الصفحة الحالية بدون بادئة اللغة
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const other = otherLocale(locale);

  const navItems = [
    { path: "/surahs", label: dict.nav.surahs },
    { path: "/about", label: dict.nav.about },
  ];

  const isActive = (path: string) =>
    bare === path || bare.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-3 px-3 sm:px-6">
        <Link href={href(locale, "/")} className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 font-display text-lg text-accent">
            ن
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-[1.05rem] leading-5 text-ink group-hover:text-accent">
              {dict.site.name}
            </span>
            <span className="block truncate text-xs text-muted">
              {dict.site.riwayah}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="main">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={href(locale, item.path)}
              aria-current={isActive(item.path) ? "page" : undefined}
              className={`inline-flex h-11 items-center rounded-full px-3 text-sm transition-colors sm:px-4 ${
                isActive(item.path)
                  ? "text-accent"
                  : "text-ink hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <DisplaySettings />
          <Link
            href={href(other, bare)}
            className="ms-1 inline-flex h-11 items-center gap-2 rounded-full border border-line px-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            title={dict.nav.switchTo}
            hrefLang={other}
          >
            <GlobeIcon width={18} height={18} />
            <span className="hidden sm:inline">{dict.nav.switchTo}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
