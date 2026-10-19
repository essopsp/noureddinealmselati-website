export type SurahType = "makki" | "madani";

export interface Surah {
  number: number;
  nameAr: string;
  nameEn: string;
  meaningEn: string;
  type: SurahType;
  ayahCount: number;
}

export interface Recitation {
  surah: number;
  file: string;
  duration: number;
}

/** آية من مصحف رواية قالون عن نافع */
export interface QalunAyah {
  /** رقم الآية في ترقيم رواية قالون */
  a: number;
  /** أرقام الآيات المقابلة في ترقيم حفص (قد تتعدد) */
  hafs: number[];
  /** نص الآية */
  t: string;
}

export interface QalunSurah {
  number: number;
  ayat: QalunAyah[];
}

/** توقيت آية داخل تسجيل السورة (ثوانٍ من بداية الملف) */
export interface AyahTiming {
  /** رقم الآية في ترقيم رواية قالون */
  a: number;
  start: number;
  end: number;
  /** ثقة المطابقة الصوتية (0..1) — للمراجعة فقط */
  score: number;
}

/** توقيتات كلمات آية واحدة: [بداية، نهاية] لكل كلمة بترتيب النص */
export type AyahWordTimings = [number, number][];

/** توقيتات كلمات سورة: عنصر لكل آية بترتيب المصحف */
export type SurahWordTimings = AyahWordTimings[];
