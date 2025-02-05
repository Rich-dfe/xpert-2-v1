<template>
  <v-container>
    <v-row>
      <v-col cols="1">
        <h4>Water Level</h4>
      </v-col>
      <v-col cols="1">
        <dialogWLCalHelp/>
      </v-col>
    </v-row>
  </v-container>

  <v-form v-model="calibrationStore.isWaterLevelCalibrationFormValid">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-switch
            v-model="calibrationStore.wlCalFormFields.setToFactoryDefaults"
            label="Restore to factory defaults"
            color="success"
            false-value="false"
            true-value="true"
            hide-details
          ></v-switch>
        </v-col>
        <v-col cols="2">
          <v-btn color="primary" prepend-icon="mdi-arrow-right">Set</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-select
            v-model="calibrationStore.wlCalFormFields.sensorLength"
            label="Sensor Length"
            density="compact"
            color="success"
            :items="sensorLengths"
            item-title="length"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-btn color="primary" prepend-icon="mdi-arrow-right">Set</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-divider
            :thickness="3"
            class="border-opacity-50"
            color="success"
          ></v-divider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="calibrationStore.wlCalFormFields.firstReferenceReading"
            color="success"
            :counter="4"
            :rules="referenceReadingRules"
            label="Reference  - First Reading"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="calibrationStore.wlCalFormFields.firstLoggerReading"
            color="success"
            :counter="6"
            :rules="loggerReadingRules"
            label="Logger  - First Reading"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="calibrationStore.wlCalFormFields.secondReferenceReading"
            color="success"
            :counter="4"
            :rules="referenceReadingRules"
            label="Reference  - Second Reading"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="calibrationStore.wlCalFormFields.secondLoggerReading"
            color="success"
            :counter="6"
            :rules="loggerReadingRules"
            label="Logger  - Second Reading"
            density="compact"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-text-field
            v-model="calibrationStore.wlCalFormFields.loggerTemperature"
            color="success"
            :counter="5"
            :rules="temperatureReadingRules"
            label="Logger Temperature"
            prepend-inner-icon="mdi-asterisk"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-card subtitle="Calculated Parameters">
            <v-card-text>
              <p class="font-italic font-weight-light">
                Resolution =
                {{ calibrationStore.wlCalibratedParameters.resolution }} mm
                <br />
                Temperature compensation =
                {{ calibrationStore.wlCalibratedParameters.tempCompensation }}
                mm/°C
              </p>
            </v-card-text>
          </v-card>
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
import dialogWLCalHelp from "../helpDialogs/dialogWLCalHelp .vue";
import { useCalibrationStore } from "@/stores/calibration";
const calibrationStore = useCalibrationStore();

const referenceReadingRules = ref([
  (v) => !!v || "Field is required",
  (v) =>
    /^[1-9][0-9][0-9]$|^[1-4][0-9][0-9][0-9]$|^(5000)$/.test(v) ||
    "Allowed values = 100 to 5000",
  (v) => v?.length <= 4 || "4 or less digits",
]);

const loggerReadingRules = ref([
  (v) => !!v || "Field is required",
  (v) =>
    /^[1-5][0-9][0-9][0-9](\.\d{1})?$|^[6][0-4][0-9][0-9](\.\d{1})?$|^[6][5][0-5][0-2](\.\d{1})?$|^[6][5][5][3](\.[0-5])?$|^[1-5][0-9][0-9][0-9][0-9]$|^[6][0-4][0-9][0-9][0-9]$|^[6][5][0-4][0-9][0-9]$|^[6][5][5][0-3][0-5]$/.test(
      v
    ) || "Allowed values = 1000.0 to 6553.5 or 10000 to 65535",
    (v) => v?.length <= 6 || "6 or less digits",
]);

const temperatureReadingRules = ref([
  (v) => !!v || "Field is required",
  (v) =>
    /^[0-9](\.\d{0,2})?$|^[0-9][0-9](\.\d{0,2})?$/.test(v) ||
    "Allowed values = 0.00 to 99.99",
  (v) => v?.length <= 5 || "5 or less digits",
]);

const sensorLengths = ref([
  { length: "0.5m", value: 150 },
  { length: "1.0m", value: 110 },
  { length: "1.5m", value: 86 },
  { length: "2.0m", value: 71 },
  { length: "2.5m", value: 61 },
  { length: "3.0m", value: 53 },
  { length: "4.0m", value: 42 },
  { length: "5.0m", value: 35 },
]);
</script>
