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
