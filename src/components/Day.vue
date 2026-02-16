<script setup lang="ts">
import { computed } from 'vue';
import { convertNumberToHebrew } from 'jewish-date';
import type { JewishDay, BasicJewishDay } from '../utils/jewishDateUtils';
import { IsJewishDatesEqual } from '../utils/jewishDateUtils';
import Dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

Dayjs.extend(isBetween);

const props = defineProps<{
  day: JewishDay;
  isHebrew?: boolean;
  selectedDay: BasicJewishDay | undefined;
  onClick: (day: BasicJewishDay) => void;
  onMouseOver?: (day: BasicJewishDay) => void;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
  startDay: BasicJewishDay | undefined;
  endDay: BasicJewishDay | undefined;
}>();

const dayToDisplay = computed(() => {
  return props.isHebrew
    ? convertNumberToHebrew(props.day.day, false, false)
    : props.day.day;
});

const title = computed(() => {
  return props.isHebrew
    ? props.day.jewishDateStrHebrew
    : props.day.jewishDateStr;
});

const otherMonthClass = computed(() => {
  return !props.day.isCurrentMonth ? 'other-month' : '';
});

const selectedDayClass = computed(() => {
  if (props.selectedDay && IsJewishDatesEqual(props.day.jewishDate, props.selectedDay.jewishDate)) {
    return 'selected-day';
  }
  return '';
});

const disableSelectClass = computed(() => {
  if (props.canSelect && !props.canSelect(props.day)) {
    return 'no-select';
  }
  return '';
});

const isInRange = (date: Date, startDay?: BasicJewishDay, endDay?: BasicJewishDay): boolean => {
  if (startDay && endDay) {
    const start = Dayjs(startDay.date);
    const end = Dayjs(endDay.date);
    return Dayjs(date).isBetween(start, end, 'day', '[]');
  }
  return false;
};

const isStartDay = (date: Date, startDay?: BasicJewishDay): boolean => {
  if (startDay) {
    const start = Dayjs(startDay.date).startOf('d');
    return Dayjs(date).startOf('d').isSame(start);
  }
  return false;
};

const isEndDay = (date: Date, startDay?: BasicJewishDay, endDay?: BasicJewishDay): boolean => {
  if (endDay && startDay) {
    const day = Dayjs(date).startOf('d');
    const start = Dayjs(startDay.date).startOf('d');
    const end = Dayjs(endDay.date).startOf('d');
    return day.isSame(end) && !day.isSame(start);
  }
  return false;
};

const isInRangeClass = computed(() => {
  if (isInRange(props.day.date, props.startDay, props.endDay)) {
    return 'is-in-range';
  }
  return '';
});

const isStartDayClass = computed(() => {
  if (isStartDay(props.day.date, props.startDay)) {
    return 'start-day';
  }
  return '';
});

const isEndDayClass = computed(() => {
  if (isEndDay(props.day.date, props.startDay, props.endDay)) {
    return 'end-day';
  }
  return '';
});

const customDayClass = computed(() => {
  if (props.customizeDayStyle) {
    return props.customizeDayStyle(props.day);
  }
  return '';
});

const classNames = computed(() => {
  return [
    'day',
    otherMonthClass.value,
    selectedDayClass.value,
    disableSelectClass.value,
    isInRangeClass.value,
    isStartDayClass.value,
    isEndDayClass.value,
    customDayClass.value
  ].filter(Boolean).join(' ');
});

const handleClick = () => {
  if (!props.canSelect || props.canSelect(props.day)) {
    props.onClick(props.day);
  }
};

const handleMouseOver = () => {
  if (props.onMouseOver) {
    props.onMouseOver(props.day);
  }
};
</script>

<template>
  <div
    :class="classNames"
    :title="title"
    @click="handleClick"
    @mouseover="handleMouseOver"
  >
    {{ dayToDisplay }}
  </div>
</template>
