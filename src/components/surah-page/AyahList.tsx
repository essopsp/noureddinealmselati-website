"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/components/player/store";
import { toArabicDigits } from "@/lib/format";
import type { AyahTiming, QalunAyah } from "@/lib/types";

/** فهرس الآية التي يقع عليها الزمن الحالي (بحث ثنائي على توقيت البداية) */
function indexAt(timings: AyahTiming[], time: number): number {
  let lo = 0;
  let hi = timings.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (time >= timings[mid].start) {
      found = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return found;
}

/**
 * آيات السورة مع تتبّع الآية الجارية أثناء التشغيل + النقر للتشغيل من الآية.
 * النص نفسه مُصيَّر على الخادم (client component يُصيَّر SSR) فيبقى قابلاً للفهرسة.
 */
export function AyahList({
  ayat,
  timings,
  surah,
  jumpLabel,
}: {
  ayat: QalunAyah[];
  timings: AyahTiming[];
  surah: number;
  jumpLabel: string;
}) {
  const active = usePlayer((s) =>
    s.current === surah ? indexAt(timings, s.time) : -1
  );
  const playing = usePlayer((s) => s.playing);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (active < 0 || !playing) return;
    const list = listRef.current;
    const el = list?.children[active] as HTMLElement | undefined;
    if (!list || !el || el.offsetParent === null) return;

    // المساحة المرئية فعليًا فوق شريط المشغّل الثابت
    const bar = document.querySelector<HTMLElement>("[data-player-bar]");
    const bottomInset = bar
      ? Math.max(0, window.innerHeight - bar.getBoundingClientRect().top)
      : 0;
    const top = 12;
    const bottom = window.innerHeight - bottomInset - 12;
    const rect = el.getBoundingClientRect();

    // الآية ظاهرة بالكامل → لا نحرّك الصفحة
    if (rect.top >= top && rect.bottom <= bottom) return;

    const room = Math.max(240, bottom - top);
    const target =
      window.scrollY + rect.top - top - Math.min(rect.height, room) * 0.25;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: Math.max(0, target),
      behavior: reduce ? "auto" : "smooth",
    });
  }, [active, playing]);

  return (
    <ol
      ref={listRef}
      className="mushaf mt-4 list-none space-y-4"
      dir="rtl"
      lang="ar"
    >
      {ayat.map((v, i) => {
        const isActive = i === active;
        const timing = timings[i];
        return (
          <li key={v.a}>
            <button
              type="button"
              onClick={() =>
                timing && usePlayer.getState().playAt(surah, timing.start)
              }
              aria-label={`${jumpLabel} ${toArabicDigits(String(v.a))}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex w-full gap-3 rounded-xl px-2 py-1 text-start transition-colors ${
                isActive ? "bg-accent/10 ring-1 ring-accent/30" : "hover:bg-accent/5"
              }`}
            >
              <span
                className={`mt-1 flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full border px-1 text-xs tabular-nums transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-bg"
                    : "border-accent/40 text-accent"
                }`}
              >
                {toArabicDigits(String(v.a))}
              </span>
              <span className="block text-[1.35rem] text-ink">{v.t}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
