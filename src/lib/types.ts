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
