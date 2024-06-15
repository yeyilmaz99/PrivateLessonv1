export interface Applicant {
  id?: number;
  mailText: string;
  toPhone:string;
  toMail: string;
  toName: string;
  toSurname: string;
  kidName:string;
  kidAge: number;
  daysnHours: DaysnHours[];
}

export interface MailDto{
    mailText: string;
    toMail: string;
    toName: string;
    toSurname: string;
    toPhone:string;
    kidAge: number;
    kidName:string;
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
