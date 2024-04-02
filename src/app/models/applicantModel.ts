export interface Applicant {
  id: number;
  mailText: string;
  toMail: string;
  toName: string;
  toSurname: string;
  age: number;
  daysnHours: DaysnHours[];
}

export interface DaysnHours {
  id: number;
  hour: string;
  day: number;
}

export enum Days {
  Pazartesi = 1,
  Salı = 2,
  Çarşamba = 3,
  Perşembe = 4,
  Cuma = 5,
  Cumartesi = 6,
}
