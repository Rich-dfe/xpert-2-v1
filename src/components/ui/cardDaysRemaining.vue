<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item title="Battery Days Remaining">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h3 pb-6" cols="12">{{ loggerStore.batteryDaysRemaining }} Days</v-col>
        <v-progress-linear
      v-model="loggerStore.batteryDaysRemaining"
      color="green"
      height="25"
    ></v-progress-linear>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      
    </div>
  </v-card>
</template>

<script setup>
import { useLoggerStore } from '@/stores/loggers';
const loggerStore = useLoggerStore();

</script>
