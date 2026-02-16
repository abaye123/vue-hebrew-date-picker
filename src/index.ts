// Vue Hebrew Date Picker - Entry Point
import HebrewDatePicker from './components/HebrewDatePicker.vue';
import type { HebrewDatePickerProps } from './interfaces';
import type { BasicJewishDay, BasicJewishDate, JewishDay } from './utils/jewishDateUtils';

// Export components
export { HebrewDatePicker };

// Export types
export type {
  HebrewDatePickerProps,
  BasicJewishDay,
  BasicJewishDate,
  JewishDay
};

// Export utility functions (for advanced usage)
export {
  getJewishDate,
  getJewishMonth,
  getGregDate,
  getWeekdays,
  getJewishMonths,
  getJewishYears,
  getPrevMonth,
  getNextMonth,
  IsJewishDatesEqual,
  dontSelectHolidays,
  dontSelectShabat,
  dontSelectShabatAndHolidays
} from './utils/jewishDateUtils';

// Install function for Vue 3
import type { App } from 'vue';

export default {
  install(app: App) {
    app.component('HebrewDatePicker', HebrewDatePicker);
  }
};
