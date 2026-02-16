# Vue Hebrew Date Picker

![Vue 3](https://img.shields.io/badge/Vue-3.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

Beautiful, modern Hebrew/Jewish date picker component for Vue 3.

## Features

- 🎨 Beautiful, modern design
- 📅 Full Hebrew calendar support
- 🌙 Dark mode support
- 📱 Responsive design
- 🔄 Range selection support
- 🌍 Hebrew and English interface
- ✨ Smooth animations

## Installation

```bash
npm install vue-hebrew-date-picker
```

## Usage

### Basic Usage

```vue
<template>
  <HebrewDatePicker v-model="selectedDate" />
</template>

<script setup>
import { ref } from 'vue';
import HebrewDatePicker from 'vue-hebrew-date-picker';
import 'vue-hebrew-date-picker/dist/style.css';

const selectedDate = ref(null);
</script>
```

### Hebrew Interface

```vue
<HebrewDatePicker v-model="date" :is-hebrew="true" />
```

### Range Selection

```vue
<HebrewDatePicker 
  v-model="dateRange" 
  :is-range="true" 
  :is-hebrew="true" 
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `BasicJewishDate \| Date \| BasicJewishDateRange \| DateRange \| null` | `null` | Selected date(s) |
| `isHebrew` | `boolean` | `false` | Show Hebrew interface |
| `isRange` | `boolean` | `false` | Enable range selection |
| `canSelect` | `(day: BasicJewishDay) => boolean` | `undefined` | Function to determine if a day is selectable |
| `customizeDayStyle` | `(day: BasicJewishDay) => string` | `undefined` | Function to add custom CSS classes to days |

## Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `update:modelValue` | `BasicJewishDate \| BasicJewishDateRange` | Emitted when date(s) are selected |
| `select` | `startDay: BasicJewishDay, endDay?: BasicJewishDay` | Emitted when user selects a date |

## Utility Functions

The library also exports utility functions:

```typescript
import { 
  getJewishDate,
  getJewishMonth, 
  getGregDate,
  getWeekdays,
  getJewishMonths,
  getJewishYears,
  dontSelectHolidays,
  dontSelectShabat,
  dontSelectShabatAndHolidays
} from 'vue-hebrew-date-picker';
```

## Example: Preventing Shabbat Selection

```vue
<template>
  <HebrewDatePicker 
    v-model="date" 
    :can-select="dontSelectShabat" 
  />
</template>

<script setup>
import { ref } from 'vue';
import HebrewDatePicker from 'vue-hebrew-date-picker';
import { dontSelectShabat } from 'vue-hebrew-date-picker';

const date = ref(null);
</script>
```

## Development

```bash
# Install dependencies
npm install

# Run demo
npm run dev --prefix demo

# Build library
npm run build
```

## License

MIT License - feel free to use in your projects!
