<template>
  <v-container>
    <v-empty-state
    v-if="loggerStore.selected === null"
  headline="Nothing to do here"
  title="Calibration Not Required"
  text="This logger does not require calibration"
  image="https://vuetifyjs.b-cdn.net/docs/images/logos/v.png"
></v-empty-state>
    <v-row>
      <v-col cols="12" v-if="loggerStore.selected !== null && loggerStore.selected.product_id === 16"> 
        <h3>Calibration</h3>
        <calibrationTemp/>
      </v-col>
      <v-col cols="12" v-if="loggerStore.selected !== null && loggerStore.selected.product_id === 18"> 
        <h3>Calibration</h3>
        <calibrationPAR/>
      </v-col>
      <v-col cols="12" v-if="loggerStore.selected !== null && loggerStore.selected.product_id === 22"> 
        <h3>Calibration</h3>
        <calibrationMPT/>
      </v-col>
    </v-row>
  </v-container>
</template>
    
  <script setup>
      import { useLoggerStore } from '@/stores/loggers';
      import calibrationMPT from '@/components/forms/calibrationMPT.vue';
      import calibrationTemp from '@/components/forms/calibrationTemp.vue';
      import calibrationPAR from '@/components/forms/calibrationPar.vue';
    
      const loggerStore = useLoggerStore();

      console.log(loggerStore.selected);
  </script>