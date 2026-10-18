import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { Motif } from "@/components/ui/Motif";

export function AboutPageView({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const hasPortrait = fs.existsSync(
    path.join(process.cwd(), "public", "assets", "images", "about.jpg")
  );

  return (
    <section className="mx-auto w-full max-w-3xl px-3 pt-10 sm:px-6">
      <header className="text-center">
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          {dict.about.title}
        </h1>
        <Motif className="mt-6" />
      </header>

      <div className="mt-10 grid gap-8 sm:grid-cols-[220px_1fr] sm:items-start">
        <div>
          {hasPortrait ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/assets/images/about.jpg"
              alt={dict.site.name}
              width={440}
              height={550}
              className="w-full rounded-2xl border border-line object-cover"
            />
          ) : (
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-surface">
              <span className="font-display text-5xl text-accent/25">نور</span>
              <span className="px-6 text-center text-xs text-muted">
                {dict.site.riwayah}
              </span>
            </div>
          )}
        </div>

        <div>
          <p className="text-muted">{dict.about.placeholder}</p>

          <h2 className="mt-8 font-display text-xl text-ink">
            {dict.about.contactTitle}
          </h2>
          <p className="mt-2 text-sm text-muted">{dict.about.contactPlaceholder}</p>
        </div>
      </div>
    </section>
  );
}
