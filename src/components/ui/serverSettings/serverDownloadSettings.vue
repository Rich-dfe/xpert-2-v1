<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-actions class="pt-0">
            <v-btn
          color="red-lighten-3"
          prepend-icon="mdi-adjust"
          variant="outlined"
          v-on:click="serverSettingsStore.getServerDownloadSettings()"
          >Test Settings</v-btn
        >
          </v-card-actions>
          <v-card-text>
            <div class="text-medium-emphasis">
            {{ serverSettingsStore.serverDownloadSettings }}
            </div>
    </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useServerSettingsStore } from '@/stores/serverSettings';
const serverSettingsStore = useServerSettingsStore();
</script>
