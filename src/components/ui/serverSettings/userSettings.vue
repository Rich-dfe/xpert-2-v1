<template>
  <v-container>
    <v-row>
      <v-col class="text-center">
        <v-btn
          color="blue-lighten-3"
          prepend-icon="mdi-adjust"
          v-on:click="serverSettingsStore.fetchUserSettings()"
          >User Settings</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-select
          v-model="serverSettingsStore.userSettingSelectedInUse"
          label="In use"
          color="success"
          density="compact"
          :items="serverSettingsStore.currentUserSettings[0]"
          item-title="id"
          item-value="settingValue"
          return-object
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-select
          v-model="serverSettingsStore.userSettingSelectedNotInUse"
          label="Not in use"
          color="success"
          density="compact"
          :items="serverSettingsStore.currentUserSettings[1]"
          item-title="id"
          item-value="settingValue"
          return-object
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center" md="12">
        Selected ID: {{ serverSettingsStore.userSettingSelected.id }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="Value"
          density="compact"
          v-model="serverSettingsStore.userSettingSelected.settingValue"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12 text-center">
        <v-btn
          color="secondary"
          prepend-icon="mdi-toggle-switch-outline"
          v-on:click=""
          >Update</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useServerSettingsStore } from "@/stores/serverSettings";
const serverSettingsStore = useServerSettingsStore();
</script>
