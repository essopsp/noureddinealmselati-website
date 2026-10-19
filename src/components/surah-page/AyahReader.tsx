import fs from "node:fs";
import path from "node:path";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { AyahTiming, QalunSurah } from "@/lib/types";
import { ChevronStart } from "@/components/ui/icons";
import { AyahList } from "./AyahList";

const SOURCE_URL = "https://github.com/iptvchecker/content-quran-json";

function loadJson<T>(...parts: string[]): T | null {
  try {
    const file = path.join(process.cwd(), ...parts);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return null;
  }
}

function loadQalun(number: number): QalunSurah | null {
  return loadJson<QalunSurah>(
    "src",
    "data",
    "quran",
    "qalun",
    `${String(number).padStart(3, "0")}.json`
  );
}

function loadTimings(number: number): AyahTiming[] {
  return (
    loadJson<AyahTiming[]>(
      "src",
      "data",
      "quran",
      "timings",
      `${String(number).padStart(3, "0")}.json`
    ) ?? []
  );
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

  return (    <section
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

        <AyahList
          ayat={data.ayat}
          timings={loadTimings(surah)}
          surah={surah}
          jumpLabel={dict.reader.jump}
        />
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
