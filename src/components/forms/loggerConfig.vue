<template>
  <v-form v-model="settingsStore.isConfigFormValid">
    <v-container>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="settingsStore.loggerConfigFormFields.x0000"
            :counter="50"
            label="Logger name"
            prepend-inner-icon="mdi-tag"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="settingsStore.loggerConfigFormFields.site"
            :counter="10"
            label="Site"
            prepend-inner-icon="mdi-map-marker"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-text-field
            v-model="settingsStore.loggerConfigFormFields.timezone"
            label="Timezone"
            prepend-inner-icon="mdi-airplane-clock"
            required
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-textarea
            v-model="settingsStore.loggerConfigFormFields.notes"
            label="Notes"
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
            v-model="settingsStore.loggerConfigFormFields.group_name"
            label="Group"
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
            :items="hours"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            
            label="Interval Minutes"
            :items="minutes"
            density="compact"
          ></v-select>
        </v-col>
        <v-col cols="2">
          <v-select
            
            label="Interval Seconds"
            :items="seconds"
            density="compact"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="settingsStore.loggerConfigFormControlValues.continuous"
            :label="`Continuous Logging Enabled: ${settingsStore.loggerConfigFormControlValues.continuous}`"
            color="primary"
            false-value="Off"
            true-value="On"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="settingsStore.loggerConfigFormControlValues.firmwareUpdateEnabled"
            :label="`Firmware Update Enabled: ${settingsStore.loggerConfigFormControlValues.firmwareUpdateEnabled}`"
            color="primary"
            false-value="Off"
            true-value="On"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="6" class="mr-4">
          <v-switch
            v-model="settingsStore.loggerConfigFormControlValues.applyToGroup"
            :label="`Apply To Group: ${settingsStore.loggerConfigFormControlValues.applyToGroup}`"
            color="primary"
            false-value="No"
            true-value="Yes"
            hide-details
          ></v-switch>
        </v-col>
      </v-row>
      <v-row no-gutters="">
        <v-col cols="1" class="mr-4">
          <v-btn color="primary" prepend-icon="mdi-arrow-right" v-on:click = "settingsStore.saveConfigSettings"> Submit </v-btn>
        </v-col>
        <v-col cols="1" class="mr-4">
          <v-btn color="secondary" prepend-icon="mdi-arrow-right" v-on:click = "settingsStore.saveConfigSettings"> Apply </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();

onMounted(() => {
    settingsStore.fetchConfigSettings()
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
