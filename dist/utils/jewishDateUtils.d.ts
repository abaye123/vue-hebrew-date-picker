import { JewishMonthType, JewishMonth, JewishDate as JewishDateType } from 'jewish-date';
import { Dayjs as DayjsType } from 'dayjs';
export type { JewishMonthType } from 'jewish-date';
export { JewishMonth };
export interface BasicJewishDate {
    day: number;
    monthName: JewishMonthType;
    year: number;
}
export interface BasicJewishDay {
    jewishDateStr: string;
    jewishDateStrHebrew: string;
    jewishDate: JewishDateType;
    date: Date;
}
export interface JewishDay extends BasicJewishDay {
    day: number;
    isCurrentMonth: boolean;
    dayjsDate: DayjsType;
}
export interface JewishMonthInfo {
    selectedDay: JewishDay | null;
    jewishYear: number;
    jewishMonth: number;
    jewishMonthString: string;
    days: JewishDay[];
}
export interface IdText {
    id: string;
    text: string;
}
export declare const getHebWeekdays: () => string[];
export declare const getEngWeekdays: () => string[];
export declare const getWeekdays: (isHebrew: boolean) => string[];
export declare const getJewishMonths: (year: number, isHebrew?: boolean) => IdText[];
export declare const getJewishYears: (year?: number) => number[];
export declare const getPrevMonth: (month: JewishMonthType, year: number) => {
    month: JewishMonthType;
    year: number;
};
export declare const getNextMonth: (month: JewishMonthType, year: number) => {
    month: JewishMonthType;
    year: number;
};
export declare const getGregDate: (props: BasicJewishDate) => Date;
export declare const getJewishDate: (date: Date) => JewishDateType;
export declare const IsJewishDatesEqual: (jewishDate1: JewishDateType, jewishDate2: JewishDateType) => boolean;
export declare const getJewishDay: (dayjsDate: DayjsType) => JewishDay;
export declare const getJewishMonth: (date: Date) => JewishMonthInfo;
export declare const getHolidays: (isIsrael: boolean) => string[];
export declare const dontSelectHolidays: (isIsrael?: boolean) => (day: BasicJewishDay) => boolean;
export declare const dontSelectShabat: (day: BasicJewishDay) => boolean;
export declare const dontSelectShabatAndHolidays: (isIsrael?: boolean) => (day: BasicJewishDay) => boolean;
