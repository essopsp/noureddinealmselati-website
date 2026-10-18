export type Theme = "light" | "dark" | "system";
export type TextSize = "base" | "large" | "xlarge";

export const THEME_KEY = "mselati:theme";
export const TEXTSIZE_KEY = "mselati:textsize";

export const THEMES: Theme[] = ["light", "dark", "system"];
export const TEXT_SIZES: TextSize[] = ["base", "large", "xlarge"];

export function readTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const value = window.localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" || value === "system"
      ? value
      : "system";
  } catch {
    return "system";
  }
}

export function readTextSize(): TextSize {
  if (typeof window === "undefined") return "base";
  try {
    const value = window.localStorage.getItem(TEXTSIZE_KEY);
    return value === "large" || value === "xlarge" ? value : "base";
  } catch {
    return "base";
  }
}

export function applyTheme(theme: Theme, root: HTMLElement): void {
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

export function applyTextSize(size: TextSize, root: HTMLElement): void {
  if (size === "base") root.removeAttribute("data-textsize");
  else root.setAttribute("data-textsize", size);
}

export function saveTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* تجاهل */
  }
}

export function saveTextSize(size: TextSize): void {
  try {
    window.localStorage.setItem(TEXTSIZE_KEY, size);
  } catch {
    /* تجاهل */
  }
}

/**
 * سكربت صغير يُنفَّذ قبل الرسم لتطبيق المظهر وحجم الخط المحفوظين
 * (يمنع وميض الشاشة عند تحميل الصفحة).
 */
export const DISPLAY_INIT_SCRIPT = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('${THEME_KEY}');if(t==='light'||t==='dark'){r.setAttribute('data-theme',t);}var s=localStorage.getItem('${TEXTSIZE_KEY}');if(s==='large'||s==='xlarge'){r.setAttribute('data-textsize',s);}}catch(e){}})();`;

/* ------------------------------------------------------------------ *
 * مخزن خارجي بسيط (localStorage + سمات <html>) لقراءة تفضيلات العرض عبر
 * useSyncExternalStore دون setState داخل effect.
 * ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

export function subscribeDisplay(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function notify(): void {
  for (const listener of listeners) listener();
}

export function getThemeSnapshot(): Theme {
  return readTheme();
}

export function getTextSizeSnapshot(): TextSize {
  return readTextSize();
}

export function getServerTheme(): Theme {
  return "system";
}

export function getServerTextSize(): TextSize {
  return "base";
}

export function changeTheme(theme: Theme): void {
  saveTheme(theme);
  if (typeof document !== "undefined") applyTheme(theme, document.documentElement);
  notify();
}

export function changeTextSize(size: TextSize): void {
  saveTextSize(size);
  if (typeof document !== "undefined")
    applyTextSize(size, document.documentElement);
  notify();
}

