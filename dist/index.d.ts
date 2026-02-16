import { default as HebrewDatePicker } from './components/HebrewDatePicker';
import { HebrewDatePickerProps } from './interfaces';
import { BasicJewishDay, BasicJewishDate, JewishDay } from './utils/jewishDateUtils';
import { App } from 'vue';
export { HebrewDatePicker };
export type { HebrewDatePickerProps, BasicJewishDay, BasicJewishDate, JewishDay };
export { getJewishDate, getJewishMonth, getGregDate, getWeekdays, getJewishMonths, getJewishYears, getPrevMonth, getNextMonth, IsJewishDatesEqual, dontSelectHolidays, dontSelectShabat, dontSelectShabatAndHolidays } from './utils/jewishDateUtils';
declare const _default: {
    install(app: App): void;
};
export default _default;
