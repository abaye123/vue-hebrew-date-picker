<template>
  <div class="demo-container">
    <h1>Hebrew Date Picker Demo</h1>
    
    <div class="demo-section">
      <label class="demo-label">English Date Picker:</label>
      <hebrew-date-picker
        v-model="selectedDate"
        @select="handleSelect"
      ></hebrew-date-picker>
      <div class="result">Selected: {{ formatDate(selectedDate) }}</div>
    </div>

    <div class="demo-section">
      <label class="demo-label">Hebrew Date Picker:</label>
      <hebrew-date-picker
        v-model="selectedHebrewDate"
        :is-hebrew="true"
        @select="handleSelectHebrew"
      ></hebrew-date-picker>
      <div class="result">נבחר: {{ formatHebrewDate(selectedHebrewDate) }}</div>
    </div>

    <div class="demo-section">
      <label class="demo-label">Date Range Picker:</label>
      <hebrew-date-picker
        v-model="rangeDate"
        :is-range="true"
        :is-hebrew="true"
        @select="handleSelectRange"
      ></hebrew-date-picker>
      <div class="result">טווח: {{ formatRangeDate(rangeDate) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedDate = ref(null);
const selectedHebrewDate = ref(null);
const rangeDate = ref(null);

const formatDate = (date: any) => {
  if (!date) return 'None';
  return `${date.day}/${date.month}/${date.year}`;
};

const formatHebrewDate = (date: any) => {
  if (!date) return 'ללא';
  return `${date.day} ${date.monthName} ${date.year}`;
};

const formatRangeDate = (range: any) => {
  if (!range || !range.startDate) return 'ללא';
  return `${range.startDate.day}/${range.startDate.month}/${range.startDate.year} - ${range.endDate?.day}/${range.endDate?.month}/${range.endDate?.year}`;
};

const handleSelect = (day: any) => {
  console.log('Selected:', day);
};

const handleSelectHebrew = (day: any) => {
  console.log('Selected Hebrew:', day);
};

const handleSelectRange = (start: any, end: any) => {
  console.log('Range:', start, end);
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
}
.demo-container {
  max-width: 500px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
h1 {
  color: #2d3748;
  margin-bottom: 30px;
  text-align: center;
}
.demo-section {
  margin-bottom: 30px;
}
.demo-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
}
.result {
  margin-top: 10px;
  padding: 12px;
  background: #edf2f7;
  border-radius: 8px;
  font-family: monospace;
  color: #2d3748;
}
</style>
