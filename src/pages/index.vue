<template>
  <v-container class="bg-surface-variant">
    <v-row>
      <v-col cols="3">
        <CardBatteryVoltage />
      </v-col>
      <v-col cols="3">
        <cardDaysRemaining />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CardBatteryVoltage from "@/components/ui/cardBatteryVoltage.vue";
import cardDaysRemaining from "@/components/ui/cardDaysRemaining.vue";
</script>
