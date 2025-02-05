<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-if="loggerStore.selected !== null && loggerStore.selected.product_id === 18"> 
        <h3>Calibration</h3>
        <calibrationPAR/>
      </v-col>
      <v-col cols="12" v-else-if="loggerStore.selected !== null && loggerStore.selected.product_id <= 7"> 
        <h3>Calibration</h3>
        <calibrationWL/>
      </v-col>
      <v-col cols="12" v-else> 
        <noActionRequired/>
      </v-col>
    </v-row>
  </v-container>
</template>
    
  <script setup>
      import { useLoggerStore } from '@/stores/loggers';
      import calibrationMPT from '@/components/forms/calibrationMPT.vue';
      import calibrationTemp from '@/components/forms/calibrationTemp.vue';
      import calibrationPAR from '@/components/forms/calibrationPAR.vue';
      import calibrationWL from '@/components/forms/calibrationWL.vue';
      import noActionRequired from '@/components/ui/noActionRequired.vue';
    
      const loggerStore = useLoggerStore();

  </script>