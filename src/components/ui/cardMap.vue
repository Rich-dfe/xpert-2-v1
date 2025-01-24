<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import { useLoggerStore } from "@/stores/loggers";
const loggerStore = useLoggerStore();

const center = { lat: 40.689247, lng: -74.044502 };
</script>
<template>
  <v-card>
    <GoogleMap
      api-key="AIzaSyDRoPcbf4Yo1DbUG927GOmBvpH2F5xJ2fQ"
      style="width: 100%; height: 250px"
      :center="center"
      :zoom="15"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>
  </v-card>
</template>
