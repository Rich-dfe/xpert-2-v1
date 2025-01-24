<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item title="Logger Information">
      <v-container>
        <v-row>
          <v-col cols="4">Name: </v-col>
          <v-col cols="8">{{ loggerStore.selectedInfo.logger_name }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Serial No: </v-col>
          <v-col cols="8">{{ loggerStore.selectedInfo.logger_uid }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Firmware: </v-col>
          <v-col cols="8">v{{ loggerStore.selectedInfo.firmwareVersionInUse/100 }}</v-col>
        </v-row>
      </v-container>
    </v-card-item>
  </v-card>
</template>

<script setup>
import { useLoggerStore } from "@/stores/loggers";
const loggerStore = useLoggerStore();
</script>
