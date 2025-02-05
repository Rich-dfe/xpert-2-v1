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

    <template v-slot:default="{ isActive }">
      <v-card title="Some helpful pointers...">
        <v-card-text>
          <div class="text-subtitle-1">Reference</div>
          <p class="text-subtitle-2">Type: Number</p>
          <div class="text-medium-emphasis">
            The reference points are defined as the height of the lines (in mm)
            marked on the sensor cable during calibration. Please enter these
            values into the fields shown.
          </div>
          <v-divider
            :thickness="3"
            class="border-opacity-50"
            color="success"
          ></v-divider>

          <div class="text-subtitle-1">Logger Reading</div>
          <p class="text-subtitle-2">Type: Number</p>
          <div class="text-medium-emphasis">
            The value shown on the view screen of the Xtract app when the sensor
            cable is submerged to the depth indicated by the marked reference
            points.
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
