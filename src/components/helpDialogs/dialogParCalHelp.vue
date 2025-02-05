<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="success"
        text="Help!"
        variant="flat"
        size="small"
        rounded="xl"
      ></v-btn>
    </template>

    <template
      v-slot:default="{ isActive }">
      <v-card title="Some helpful pointers...">
        <v-card-text>
          <div class="text-subtitle-1">Logger Reading Total</div>
          <p class="text-subtitle-2">Type: Number</p>
          <div class="text-medium-emphasis">
            The sum of all the readings recorded by the logger over the
            calibration period.
          </div>

          <v-divider
            :thickness="3"
            class="border-opacity-50"
            color="success"
          ></v-divider>

          <div class="text-subtitle-1">Reference Reading Average</div>
          <p class="text-subtitle-2">Type: Number</p>
          <div class="text-medium-emphasis">
            Average of all the reference meter readings taken over the
            calibration period.
          </div>

          <v-divider
            :thickness="3"
            class="border-opacity-50"
            color="success"
          ></v-divider>

          <div class="text-subtitle-1">Reference Units</div>
          <p class="text-subtitle-2">Type: Select</p>
          <div class="text-medium-emphasis">
            The units used by the reference meter during calibration.
          </div>

          <v-divider
            :thickness="3"
            class="border-opacity-50"
            color="success"
          ></v-divider>

          <div class="text-subtitle-1">Test Duration</div>
          <p class="text-subtitle-2">Type: Number (of minutes)</p>
          <div class="text-medium-emphasis">
            The duration of the calibration test stated in minutes.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
import { useLoggerStore } from "@/stores/loggers";
const loggerStore = useLoggerStore();
</script>
