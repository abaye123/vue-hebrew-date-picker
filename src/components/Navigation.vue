<script setup lang="ts">
import { computed } from 'vue';
import { JewishMonth, JewishMonthType } from 'jewish-date';
import { convertNumberToHebrew } from 'jewish-date';
import { getJewishMonths, getJewishYears, getPrevMonth, getNextMonth } from '../utils/jewishDateUtils';

const props = defineProps<{
  month: string;
  year: number;
  isHebrew?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', month: string, year: number): void;
}>();

const months = computed(() => getJewishMonths(props.year, props.isHebrew));
const years = computed(() => getJewishYears(props.year));

const getJewishMonthType = (monthStr: string): JewishMonthType => {
  return JewishMonth[monthStr as keyof typeof JewishMonth];
};

const handlePrevious = () => {
  const monthType = getJewishMonthType(props.month);
  const prev = getPrevMonth(monthType, props.year);
  emit('click', JewishMonth[prev.month], prev.year);
};

const handleNext = () => {
  const monthType = getJewishMonthType(props.month);
  const next = getNextMonth(monthType, props.year);
  emit('click', JewishMonth[next.month], next.year);
};

const handleMonthChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('click', target.value, props.year);
};

const handleYearChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('click', props.month, Number(target.value));
};

const getYearText = (year: number) => {
  return props.isHebrew ? convertNumberToHebrew(year) : year;
};
</script>

<template>
  <div class="navigation">
    <div class="arrow-left" @click="handlePrevious">
      <span></span>
    </div>
    <div class="month-year-selection">
      <select :value="month" @change="handleMonthChange">
        <option v-for="monthItem in months" :key="monthItem.id" :value="monthItem.id">
          {{ monthItem.text }}
        </option>
      </select>
      <select :value="year" @change="handleYearChange">
        <option v-for="y in years" :key="y" :value="y">
          {{ getYearText(y) }}
        </option>
      </select>
    </div>
    <div class="arrow-right" @click="handleNext">
      <span></span>
    </div>
  </div>
</template>
