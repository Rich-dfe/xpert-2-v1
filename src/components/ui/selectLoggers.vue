<template>
    <v-select
      v-model="loggerStore.selected"
      label="Logger"
      color="success"
      density="compact"
      :items=loggerStore.loggers
      item-title="logger_name"
      item-value="id"
      return-object
    />
    <!-- {{ loggerStore.selected.logger_name }} -->
  </template>
  
  <script setup>
    import { onMounted } from 'vue'
    import { useLoggerStore } from '@/stores/loggers';
    const loggerStore = useLoggerStore();
  
    // onMounted(() => {
    //   loggerStore.fetchLoggersByUserId(32)
    // })
  </script>