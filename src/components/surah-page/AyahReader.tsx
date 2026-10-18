import fs from "node:fs";
import path from "node:path";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { QalunSurah } from "@/lib/types";
import { toArabicDigits } from "@/lib/format";
import { ChevronStart } from "@/components/ui/icons";

const SOURCE_URL = "https://github.com/iptvchecker/content-quran-json";

function loadQalun(number: number): QalunSurah | null {
  try {
    const file = path.join(
      process.cwd(),
      "src",
      "data",
      "quran",
      "qalun",
      `${String(number).padStart(3, "0")}.json`
    );
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8")) as QalunSurah;
  } catch {
    return null;
  }
}

/**
 * نص السورة برواية قالون عن نافع مضمَّن في HTML الثابت (فهرسة + يعمل بلا JS).
 */
export function AyahReader({
  surah,
  locale,
  dict,
}: {
  surah: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const data = loadQalun(surah);
  if (!data || data.ayat.length === 0) return null;

  return (
    <section
      aria-labelledby="surah-text-heading"
      className="mt-6 rounded-2xl border border-line bg-surface px-5 py-6 sm:px-6"
    >
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <h2 id="surah-text-heading" className="font-display text-xl text-ink">
            {dict.reader.title}
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            {dict.reader.toggle}
            <ChevronStart
              width={16}
              height={16}
              className="transition-transform group-open:rotate-90 rtl:rotate-180 rtl:group-open:-rotate-90"
            />
          </span>
        </summary>

        {locale === "en" && (
          <p className="mt-2 text-xs text-muted">{dict.reader.note}</p>
        )}

        <ol className="mushaf mt-4 list-none space-y-4" dir="rtl" lang="ar">
          {data.ayat.map((v) => (
            <li key={v.a} className="flex gap-3">
              <span className="mt-1 flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 px-1 text-xs tabular-nums text-accent">
                {toArabicDigits(String(v.a))}
              </span>
              <p className="text-[1.35rem] text-ink">{v.t}</p>
            </li>
          ))}
        </ol>
      </details>

      <p className="mt-5 border-t border-line pt-3 text-xs leading-6 text-muted">
        {dict.reader.attributionPrefix}{" "}
        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          {dict.reader.source}
        </a>
      </p>
    </section>
  );
}
