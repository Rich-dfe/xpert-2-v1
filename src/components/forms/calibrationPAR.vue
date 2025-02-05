<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <h4>P.A.R</h4>
      </v-col>
      <v-col cols="1">
        <dialogParCalHelp/>
      </v-col>
    </v-row>
  </v-container>

  <v-form v-model="calibrationStore.isParCalibrationFormValid">
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="calibrationStore.parCalFormFields.loggerReadingTotal"
            color="success"
            :counter="15"
            :rules="readingTotalRules"
            label="Logger Reading Total"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="calibrationStore.parCalFormFields.referenceReadingAverage"
            color="success"
            :counter="15"
            :rules="readingTotalRules"
            label="Reference Reading Average"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-combobox
            label="Reference Units"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            color="success"
            :counter="15"
            :rules="unitRules"
            :items="['umol m2 m1', 'mmol m2 m1', 'W m2', 'lux']"
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="calibrationStore.parCalFormFields.loggerInterval"
            color="success"
            :counter="10"
            :disabled="true"
            label="Logging Interval"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="calibrationStore.parCalFormFields.testDuration"
            color="success"
            :counter="4"
            :rules="testDurationRules"
            label="Test Duration"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-btn color="primary" prepend-icon="mdi-arrow-right"> Submit </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import dialogParCalHelp from "../helpDialogs/dialogParCalHelp.vue";
import { useCalibrationStore } from "@/stores/calibration";
const calibrationStore = useCalibrationStore();

const readingTotalRules = ref([
  (v) => !!v || "Field is required",
  (v) => /^[0-9]+([.][0-9]+)?$/.test(v) || "Only numbers are allowed",
  (v) => v?.length <= 15 || "15 or less digits",
]);

const testDurationRules = ref([
  (v) => !!v || "Field is required",
  (v) => /^\d+$/.test(v) || "Only numbers are allowed",
  (v) => v <= 1440 || "Maximum of 1440 minutes",
]);

const unitRules = ref([
  (v) => !!v || "Field is required",
  (v) => v?.length <= 15 || "15 or less characters",
]);

</script>
