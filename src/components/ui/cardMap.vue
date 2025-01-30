<script setup>
import { GoogleMap, Marker } from "vue3-google-map";
import { useLoggerStore } from "@/stores/loggers";
const loggerStore = useLoggerStore();
</script>
<template>
  <v-card class="mx-auto" max-width="368">
    <GoogleMap
      api-key="AIzaSyDRoPcbf4Yo1DbUG927GOmBvpH2F5xJ2fQ"
      style="width: 100%; height: 250px"
      :center="{
        lat: loggerStore.selectedInfo[0].lat,
        lng: loggerStore.selectedInfo[0].lng,
      }"
      :zoom="15"
    >
      <Marker
        :options="{
          position: {
            lat: loggerStore.selectedInfo[0].lat,
            lng: loggerStore.selectedInfo[0].lng,
          },
          title: loggerStore.selectedInfo[0].logger_name,
        }"
      />
    </GoogleMap>
  </v-card>
</template>
