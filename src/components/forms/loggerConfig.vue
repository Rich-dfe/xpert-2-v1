<template>
  <v-form v-model="loggerConfigStore.isConfigFormValid">
    <v-container>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="loggerConfigStore.loggerConfigFormFields.x0000"
            :counter="50"
            label="Logger name"
            color="success"
            prepend-inner-icon="mdi-tag"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="loggerConfigStore.loggerConfigFormFields.site"
            :counter="10"
            label="Site"
            color="success"
            prepend-inner-icon="mdi-map-marker"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="loggerConfigStore.loggerConfigFormFields.timezone"
            label="Timezone"
            color="success"
            prepend-inner-icon="mdi-airplane-clock"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-textarea
            v-model="loggerConfigStore.loggerConfigFormFields.notes"
            label="Notes"
            color="success"
            prepend-inner-icon="mdi-note-edit"
            density="compact"
            row-height="15"
            rows="1"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="loggerConfigStore.loggerConfigFormFields.group_name"
            label="Group"
            color="success"
            prepend-inner-icon="mdi-group"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            type="datetime-local"
            label="Start Time"
            color="success"
            prepend-inner-icon="mdi-clock-start"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            type="datetime-local"
            label="Stop Time"
            color="success"
            prepend-inner-icon="mdi-clock-end"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="2">
          <v-select
            label="Interval Hours"
            color="success"
            :items="hours"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            label="Interval Minutes"
            color="success"
            :items="minutes"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            label="Interval Seconds"
            color="success"
            :items="seconds"
            density="compact"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="loggerConfigStore.loggerConfigFormControlValues.continuous"
            :label="`Continuous Logging Enabled: ${loggerConfigStore.loggerConfigFormControlValues.continuous}`"
            color="success"
            false-value="Off"
            true-value="On"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="loggerConfigStore.loggerConfigFormControlValues.firmwareUpdateEnabled"
            :label="`Firmware Update Enabled: ${loggerConfigStore.loggerConfigFormControlValues.firmwareUpdateEnabled}`"
            color="success"
            false-value="Off"
            true-value="On"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="loggerConfigStore.loggerConfigFormControlValues.applyToGroup"
            :label="`Apply To Group: ${loggerConfigStore.loggerConfigFormControlValues.applyToGroup}`"
            color="success"
            false-value="No"
            true-value="Yes"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="1" class="mr-4">
          <v-btn color="primary" prepend-icon="mdi-arrow-right" v-on:click = "loggerConfigStore.saveConfigSettings"> Submit </v-btn>
        </v-col>
        <v-col cols="1" class="mr-4">
          <v-btn color="secondary" prepend-icon="mdi-arrow-right" v-on:click = "loggerConfigStore.saveConfigSettings"> Apply </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useLoggerConfigStore } from "@/stores/loggerConfig";

const loggerConfigStore = useLoggerConfigStore();

onBeforeMount(() => {
  loggerConfigStore.fetchConfigSettings()
})

const menu2 = ref(false);
const modal2 = ref(false);

const hours = ref([
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
]);
const minutes = ref([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
const seconds = ref([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
</script>
