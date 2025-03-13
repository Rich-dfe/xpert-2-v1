<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <v-btn
          color="blue-lighten-3"
          prepend-icon="mdi-adjust"
          v-on:click="serverSettingsStore.getChannelSettings('a', false)"
          >A</v-btn
        >
      </v-col>
      <v-col md="3">
        <v-btn
          color="blue-lighten-2"
          prepend-icon="mdi-adjust"
          v-on:click="serverSettingsStore.getChannelSettings('b', false)"
          >B</v-btn
        >
      </v-col>
      <v-col md="3">
        <v-btn
          color="blue-lighten-3"
          prepend-icon="mdi-adjust"
          v-on:click="serverSettingsStore.getChannelSettings('c', false)"
          >C</v-btn
        >
      </v-col>
      <v-col md="3">
        <v-btn
          color="blue-lighten-2"
          prepend-icon="mdi-adjust"
          v-on:click="serverSettingsStore.getChannelSettings('e', false)"
          >E</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        
        <div class="text-h5 text-center">
          <v-btn
          :loading="serverSettingsStore.isloading"
          :readonly=true
          >Channel {{ serverSettingsStore.selectedChannel.toUpperCase() }}
          <template v-slot:loader>
          <v-progress-circular indeterminate></v-progress-circular>
          </template>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <div class="text-h6 text-center">Enabled</div>
          <v-select
            v-model="serverSettingsStore.selectedEnabledSensor"
            label="Sensor ID"
            color="success"
            density="compact"
            :items="serverSettingsStore.currentChannelSettings[0]"
            item-title="id"
            item-value="state"
            return-object
          />
      </v-col>
      <v-col md="6">
        <div class="text-h6 text-center">Disabled</div>
          <v-select
            v-model="serverSettingsStore.selectedDisabledSensor"
            label="Sensor ID"
            color="success"
            density="compact"
            :items="serverSettingsStore.currentChannelSettings[1]"
            item-title="id"
            item-value="state"
            return-object
          />
      </v-col>
    </v-row>
    <v-row>
        <v-col class="text-h6 text-center">
          Selected: {{ serverSettingsStore.selectedChannel.toUpperCase() }} :
          <!-- {{ serverSettingsStore.selectedSensor.id }} -->
            {{ (serverSettingsStore.selectedSensor != null) ? serverSettingsStore.selectedSensor.id : "" }}
        </v-col>
    </v-row>
    <v-row>
        <v-col md="12 text-center" >
            <v-btn
          color="secondary"
          prepend-icon="mdi-toggle-switch-outline"
          :loading="serverSettingsStore.toggleIsLoading"
          v-on:click="serverSettingsStore.toggleChannelSettings()"
          >Toggle
          <template v-slot:loader>
          <v-progress-circular indeterminate></v-progress-circular>
          </template>
          </v-btn
        >
        </v-col>
    </v-row>
    <v-row>
        <v-col md="12 text-center" >
        {{ serverSettingsStore.toggleMsg }}
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useServerSettingsStore } from "@/stores/serverSettings";
const serverSettingsStore = useServerSettingsStore();
</script>
