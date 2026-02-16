import {
  toJewishDate,
  toGregorianDate,
  formatJewishDateInHebrew,
  BasicJewishDate as BasicJewishDateConverter,
  JewishMonthType,
  JewishMonth,
  formatJewishDate,
  getJewishMonthsInOrder,
  getJewishMonthInHebrew,
  JewishDate as JewishDateType,
} from "jewish-date";
import Dayjs, { Dayjs as DayjsType } from "dayjs";

export type { JewishMonthType } from "jewish-date";
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

export const getHebWeekdays = (): string[] => {
  return ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
};

export const getEngWeekdays = (): string[] => {
  return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
};

export const getWeekdays = (isHebrew: boolean): string[] => {
  return isHebrew ? getHebWeekdays() : getEngWeekdays();
};

export const getJewishMonths = (year: number, isHebrew?: boolean): IdText[] => {
  const months = getJewishMonthsInOrder(year);
  return months.slice(1).map((month) => {
    return {
      id: month,
      text: isHebrew ? getJewishMonthInHebrew(JewishMonth[month]) : month,
    };
  });
};

export const getJewishYears = (year: number = 5785): number[] => {
  const years: number[] = [];
  for (let i = 100; i > 0; i--) {
    const element = year - i;
    years.push(element);
  }
  years.push(year);
  for (let i = 1; i <= 100; i++) {
    const element = year + i;
    years.push(element);
  }
  return years;
};

export const getPrevMonth = (
  month: JewishMonthType,
  year: number
): { month: JewishMonthType; year: number } => {
  const months = getJewishMonths(year, false);
  const monthIndex = months.map((m) => m.id).indexOf(JewishMonth[month]);
  
  if (monthIndex === 0) {
    return {
      month: JewishMonth[months[months.length - 1].id as keyof typeof JewishMonth],
      year: year - 1
    };
  }
  return {
    month: JewishMonth[months[monthIndex - 1].id as keyof typeof JewishMonth],
    year
  };
};

export const getNextMonth = (
  month: JewishMonthType,
  year: number
): { month: JewishMonthType; year: number } => {
  const months = getJewishMonths(year, false);
  const monthIndex = months.map((m) => m.id).indexOf(JewishMonth[month]);

  if (monthIndex === months.length - 1) {
    return {
      month: JewishMonth[months[0].id as keyof typeof JewishMonth],
      year: year + 1
    };
  }
  return {
    month: JewishMonth[months[monthIndex + 1].id as keyof typeof JewishMonth],
    year
  };
};

export const getGregDate = (props: BasicJewishDate): Date => {
  if (
    !props ||
    props.monthName === JewishMonth.None ||
    props.year < 1 ||
    props.day < 1
  ) {
    return new Date();
  }

  const jewishDate: BasicJewishDateConverter = {
    day: props.day,
    monthName: props.monthName,
    year: props.year,
  };
  const date = toGregorianDate(jewishDate);
  return date;
};

export const getJewishDate = (date: Date): JewishDateType => {
  return toJewishDate(date);
};

export const IsJewishDatesEqual = (
  jewishDate1: JewishDateType,
  jewishDate2: JewishDateType
): boolean => {
  return (
    jewishDate1 &&
    jewishDate2 &&
    jewishDate1.day === jewishDate2.day &&
    jewishDate1.month === jewishDate2.month &&
    jewishDate1.year === jewishDate2.year
  );
};

export const getJewishDay = (dayjsDate: DayjsType): JewishDay => {
  const jewishDate: JewishDateType = getJewishDate(dayjsDate.toDate());
  const day: JewishDay = {
    day: jewishDate.day,
    jewishDateStr: formatJewishDate(jewishDate),
    jewishDateStrHebrew: formatJewishDateInHebrew(jewishDate),
    jewishDate: jewishDate,
    dayjsDate: dayjsDate,
    date: dayjsDate.toDate(),
    isCurrentMonth: false,
  };

  return day;
};

export const getJewishMonth = (date: Date): JewishMonthInfo => {
  const jewishDate = getJewishDate(date);
  const startOfJewishMonth = Dayjs(date).subtract(jewishDate.day - 1, "day");

  const dayOfWeek: number = Number(startOfJewishMonth.format("d"));
  const sundayStartOfTheMonth = startOfJewishMonth.subtract(dayOfWeek, "day");

  const jewishMonthInfo: JewishMonthInfo = {
    selectedDay: null,
    jewishMonth: jewishDate.month,
    jewishYear: jewishDate.year,
    jewishMonthString: jewishDate.monthName,
    days: [],
  };

  let currentDate = sundayStartOfTheMonth;

  for (let i = 0; i < 42; i++) {
    const day = getJewishDay(currentDate);
    day.isCurrentMonth = jewishMonthInfo.jewishMonth === day.jewishDate.month;
    if (IsJewishDatesEqual(jewishDate, day.jewishDate)) {
      jewishMonthInfo.selectedDay = day;
    }
    if (i < 7 || day.isCurrentMonth || day.date.getDay() > 0) {
      jewishMonthInfo.days.push(day);
      currentDate = currentDate.add(1, "day");
    }
  }

  return jewishMonthInfo;
};

export const getHolidays = (isIsrael: boolean): string[] => {
  const holidays = [
    "1 Tishri",
    "2 Tishri",
    "10 Tishri",
    "15 Tishri",
    "22 Tishri",
    "15 Nisan",
    "21 Nisan",
    "6 Sivan",
  ];
  if (!isIsrael) {
    holidays.push("16 Tishri", "23 Tishri", "16 Nisan", "22 Nisan", "7 Sivan");
  }

  return holidays;
};

export const dontSelectHolidays = (isIsrael?: boolean): (day: BasicJewishDay) => boolean => {
  const holidays = getHolidays(isIsrael ?? false);

  return (day: BasicJewishDay): boolean => {
    return !holidays.includes(
      `${day.jewishDate.day} ${day.jewishDate.monthName}`
    );
  };
};

export const dontSelectShabat = (day: BasicJewishDay): boolean => {
  const dayOfWeek = day.date.getDay();

  return dayOfWeek !== 6;
};

export const dontSelectShabatAndHolidays = (isIsrael?: boolean): (day: BasicJewishDay) => boolean => {
  return (day: BasicJewishDay): boolean => {
    return dontSelectShabat(day) && dontSelectHolidays(isIsrael)(day);
  };
};
