<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="12" md="6" lg="3">
        <cardLoggerInfo />
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="3">
       <cardMap />
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="12" md="6" lg="3">
        <CardBatteryVoltage />
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="3">
        <cardDaysRemaining />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CardBatteryVoltage from "@/components/ui/cardBatteryVoltage.vue";
import cardDaysRemaining from "@/components/ui/cardDaysRemaining.vue";
import cardLoggerInfo from "@/components/ui/cardLoggerInfo.vue";
import cardMap from "@/components/ui/cardMap.vue";
</script>
