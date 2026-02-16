<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Dayjs from 'dayjs';
import { JewishMonth } from 'jewish-date';
import { 
  getJewishMonth, 
  getWeekdays, 
  getGregDate, 
  getJewishDay, 
  type BasicJewishDay, 
  type BasicJewishDate
} from '../utils/jewishDateUtils';
import Day from './Day.vue';
import Weekday from './Weekday.vue';
import Navigation from './Navigation.vue';

const props = defineProps<{
  value?: BasicJewishDate | Date | { startDate: BasicJewishDate; endDate: BasicJewishDate } | { startDate: Date; endDate: Date } | null;
  isHebrew?: boolean;
  isRange?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
}>();

const emit = defineEmits<{
  (e: 'select', startDay: BasicJewishDay, endDay?: BasicJewishDay): void;
}>();

const getDateInit = (value: any): Date => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  if (value.startDate) {
    if (value.startDate instanceof Date) return value.startDate;
    return getGregDate(value.startDate);
  }
  if (value.day && value.monthName && value.year) {
    return getGregDate(value);
  }
  return new Date();
};

const isDateRange = (value: any): boolean => {
  return value && typeof value === 'object' && 'startDate' in value && 'endDate' in value;
};

const currentDate = ref<Date>(getDateInit(props.value));

const endDateInit = computed(() => {
  if (isDateRange(props.value)) {
    return getDateInit((props.value as any).endDate);
  }
  return null;
});

const jewishMonthInfo = computed(() => getJewishMonth(currentDate.value));

const selectedDay = computed(() => {
  if (props.isRange) return undefined;
  if (props.value && !isDateRange(props.value)) {
    return jewishMonthInfo.value.selectedDay || undefined;
  }
  return undefined;
});

const startDay = computed(() => {
  if (!props.isRange) return undefined;
  if (isDateRange(props.value)) {
    const startDate = getDateInit((props.value as any).startDate);
    return getJewishDay(Dayjs(startDate));
  }
  return undefined;
});

const endDay = computed(() => {
  if (!props.isRange) return undefined;
  if (isDateRange(props.value) && endDateInit.value) {
    return getJewishDay(Dayjs(endDateInit.value));
  }
  return undefined;
});

const hoveredDay = ref<BasicJewishDay | undefined>(undefined);

const startDayRef = computed(() => {
  if (props.isRange) {
    return !endDay.value ? hoveredDay.value : startDay.value;
  }
  return undefined;
});

const endDayRef = computed(() => {
  if (props.isRange) {
    return endDay.value || hoveredDay.value;
  }
  return undefined;
});

const weekdays = computed(() => getWeekdays(props.isHebrew || false));

const classNames = computed(() => {
  return `month-container${props.isHebrew ? ' is-hebrew' : ''}`;
});

const setBasicJewishDate = (month: string, year: number) => {
  const day = jewishMonthInfo.value.selectedDay?.day || 1;
  const basicJewishDate: BasicJewishDate = {
    year: year,
    monthName: JewishMonth[month as keyof typeof JewishMonth],
    day: day,
  };
  const gregDate = getGregDate(basicJewishDate);
  currentDate.value = gregDate;
};

const handleNavigationClick = (month: string, year: number) => {
  setBasicJewishDate(month, year);
};

const handleDayClick = (day: BasicJewishDay) => {
  if (props.isRange) {
    if (!startDay.value || endDay.value) {
      emit('select', day, undefined);
    } else {
      const [start, end] = getDatesInOrder(startDay.value, day);
      emit('select', start, end);
    }
  } else {
    emit('select', day, undefined);
  }
};

const handleMouseOver = (day: BasicJewishDay) => {
  if (props.isRange) {
    hoveredDay.value = day;
  }
};

const getDatesInOrder = (day1: BasicJewishDay, day2: BasicJewishDay): [BasicJewishDay, BasicJewishDay] => {
  if (day1.date.getTime() <= day2.date.getTime()) {
    return [day1, day2];
  }
  return [day2, day1];
};

watch(() => props.value, (newValue) => {
  const newDate = getDateInit(newValue);
  currentDate.value = newDate;
});
</script>

<template>
  <div :class="classNames">
    <Navigation
      :month="jewishMonthInfo.jewishMonthString"
      :year="jewishMonthInfo.jewishYear"
      :is-hebrew="isHebrew"
      @click="handleNavigationClick"
    />
    <div class="weekday-wrapper">
      <Weekday v-for="weekday in weekdays" :key="weekday" :value="weekday" />
    </div>
    <div class="month">
      <Day
        v-for="day in jewishMonthInfo.days"
        :key="day.jewishDateStr"
        :day="day"
        :is-hebrew="isHebrew"
        :selected-day="selectedDay"
        :can-select="canSelect"
        :customize-day-style="customizeDayStyle"
        :is-range="isRange"
        :start-day="startDayRef"
        :end-day="endDayRef"
        @click="handleDayClick"
        @mouseover="handleMouseOver"
      />
    </div>
  </div>
</template>
