<template>
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-sheet class="pa-2">
            <selectCustomers />
          </v-sheet>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-sheet class="pa-2">
            <selectUsers />
          </v-sheet>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-sheet class="pa-2">
            <selectGroups />
          </v-sheet>
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="3">
          <v-sheet class="pa-2">
            <selectLoggers />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script setup>
import selectGroups from '@/components/ui/selectGroups.vue';
import selectUsers from './selectUsers.vue';
import selectLoggers from '@/components/ui/selectLoggers.vue';
import selectCustomers from './selectCustomers.vue';
</script>