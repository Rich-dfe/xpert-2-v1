<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="12" md="6" lg="4">
        <ChannelSettings />
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="2">
        <userSettings />
      </v-col>
      <v-col xs="12" sm="12" md="4" lg="2">
        <mfrSettings />
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="12" md="4" lg="8">
        <serverDownloadSettings />
      </v-col>
    </v-row>
  </v-container>
</template>
    
  <script setup>
      import ChannelSettings from '@/components/ui/serverSettings/channelSettings.vue';
      import userSettings from '@/components/ui/serverSettings/userSettings.vue';
      import mfrSettings from '@/components/ui/serverSettings/mfrSettings.vue';
      import serverDownloadSettings from '@/components/ui/serverSettings/serverDownloadSettings.vue';
  </script>