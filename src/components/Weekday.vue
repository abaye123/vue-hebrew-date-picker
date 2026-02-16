<script setup lang="ts">
defineProps<{
  value: string;
}>();
</script>

<template>
  <div class="weekday">{{ value }}</div>
</template>
