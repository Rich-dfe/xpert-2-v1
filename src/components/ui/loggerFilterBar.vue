<template>
    <v-container class="bg-blue-lighten-1 pa-0">
      <v-row no-gutters>
        <v-col cols="6">
          <v-sheet class="pa-2">
            <selectGroups />
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet class="pa-2">
            <selectLoggers />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
import selectGroups from '@/components/ui/selectGroups.vue';
import selectLoggers from '@/components/ui/selectLoggers.vue';
</script>