import type { JewishDay, BasicJewishDay, BasicJewishDate } from './utils/jewishDateUtils';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface BasicJewishDateRange {
  startDate: BasicJewishDate;
  endDate: BasicJewishDate;
}

export interface HebrewDatePickerProps {
  modelValue?: BasicJewishDate | Date | BasicJewishDateRange | DateRange | null;
  isHebrew?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
}
