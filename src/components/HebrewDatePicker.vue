<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { formatJewishDateInHebrew, formatJewishDate } from 'jewish-date';
import type { BasicJewishDay, BasicJewishDate } from '../utils/jewishDateUtils';
import { getJewishDate, getGregDate } from '../utils/jewishDateUtils';
import Month from './Month.vue';

const props = defineProps<{
  modelValue?: BasicJewishDate | Date | { startDate: BasicJewishDate; endDate: BasicJewishDate } | { startDate: Date; endDate: Date } | null;
  isHebrew?: boolean;
  canSelect?: (day: BasicJewishDay) => boolean;
  customizeDayStyle?: (day: BasicJewishDay) => string;
  isRange?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'select', startDay: BasicJewishDay, endDay?: BasicJewishDay): void;
}>();

const isOpen = ref(false);
const pickerRef = ref<HTMLElement | null>(null);

const selectedDay = ref<BasicJewishDay | undefined>(undefined);
const startDay = ref<BasicJewishDay | undefined>(undefined);
const endDay = ref<BasicJewishDay | undefined>(undefined);

const isDateRange = (value: any): boolean => {
  return value && typeof value === 'object' && 'startDate' in value && 'endDate' in value;
};

const getDateStringForSelectedDay = () => {
  if (props.isRange) {
    if (startDay.value && endDay.value) {
      const start = props.isHebrew ? startDay.value.jewishDateStrHebrew : startDay.value.jewishDateStr;
      const end = props.isHebrew ? endDay.value.jewishDateStrHebrew : endDay.value.jewishDateStr;
      return `${start} - ${end}`;
    } else if (startDay.value) {
      return props.isHebrew ? startDay.value.jewishDateStrHebrew : startDay.value.jewishDateStr;
    }
    return '';
  } else if (selectedDay.value) {
    return props.isHebrew ? selectedDay.value.jewishDateStrHebrew : selectedDay.value.jewishDateStr;
  }
  return '';
};

const selectedDaysToDisplay = ref(getDateStringForSelectedDay());

watch([() => props.modelValue, () => props.isHebrew, () => props.isRange], () => {
  updateSelectedDays();
}, { deep: true });

const updateSelectedDays = () => {
  const value = props.modelValue;
  if (props.isRange) {
    if (isDateRange(value)) {
      const rangeValue = value as { startDate: BasicJewishDate | Date; endDate: BasicJewishDate | Date };
      const startDate = rangeValue.startDate instanceof Date ? rangeValue.startDate : getGregDate(rangeValue.startDate);
      const endDate = rangeValue.endDate instanceof Date ? rangeValue.endDate : getGregDate(rangeValue.endDate);
      startDay.value = {
        jewishDateStr: formatJewishDate(getJewishDate(startDate)),
        jewishDateStrHebrew: formatJewishDateInHebrew(getJewishDate(startDate)),
        jewishDate: getJewishDate(startDate),
        date: startDate,
      };
      endDay.value = {
        jewishDateStr: formatJewishDate(getJewishDate(endDate)),
        jewishDateStrHebrew: formatJewishDateInHebrew(getJewishDate(endDate)),
        jewishDate: getJewishDate(endDate),
        date: endDate,
      };
    } else {
      startDay.value = undefined;
      endDay.value = undefined;
    }
  } else {
    if (value && !isDateRange(value)) {
      const dateValue = value as BasicJewishDate | Date;
      const date = dateValue instanceof Date ? dateValue : getGregDate(dateValue);
      selectedDay.value = {
        jewishDateStr: formatJewishDate(getJewishDate(date)),
        jewishDateStrHebrew: formatJewishDateInHebrew(getJewishDate(date)),
        jewishDate: getJewishDate(date),
        date: date,
      };
    } else {
      selectedDay.value = undefined;
    }
  }
  selectedDaysToDisplay.value = getDateStringForSelectedDay();
};

const handleSelect = (start: BasicJewishDay, end?: BasicJewishDay, shouldClose: boolean = true) => {
  if (props.isRange) {
    startDay.value = start;
    endDay.value = end;
    if (end) {
      emit('update:modelValue', { 
        startDate: start.jewishDate, 
        endDate: end.jewishDate 
      });
      emit('select', start, end);
      if (shouldClose) {
        isOpen.value = false;
      }
    } else {
      emit('update:modelValue', start);
      emit('select', start);
    }
  } else {
    selectedDay.value = start;
    emit('update:modelValue', start.jewishDate);
    emit('select', start);
    if (shouldClose) {
      isOpen.value = false;
    }
  }
  selectedDaysToDisplay.value = getDateStringForSelectedDay();
};

const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  updateSelectedDays();
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const classNames = computed(() => {
  return `hebrew-date-picker${props.isHebrew ? ' is-hebrew' : ''}`;
});
</script>

<template>
  <div ref="pickerRef" :class="classNames">
    <div class="selected-date" @click.stop="togglePicker">
      <svg class="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
      <span class="selected-date-text">{{ selectedDaysToDisplay || (isHebrew ? 'בחר תאריך' : 'Select date') }}</span>
    </div>
    <div :class="['month-wrapper', { open: isOpen }]" @click.stop>
      <Month
        :value="modelValue"
        :is-hebrew="isHebrew"
        :is-range="isRange"
        :can-select="canSelect"
        :customize-day-style="customizeDayStyle"
        @select="(start, end) => handleSelect(start, end)"
      />
    </div>
  </div>
</template>
