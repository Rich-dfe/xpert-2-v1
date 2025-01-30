<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item title="Logger Information">
      <v-list disabled>
      <v-list-item v-for="(item, id) in loggerStore.selectedInfo" :key="id">
        <!-- <template v-slot:prepend>
          <v-icon :icon=icon></v-icon>
        </template> -->

        <v-list-item-title>Logger Name</v-list-item-title>
        <v-list-item-subtitle v-text="item.logger_name"></v-list-item-subtitle>
        <v-list-item-title>Type</v-list-item-title>
        <v-list-item-subtitle v-text="item.product_name"></v-list-item-subtitle>
        <v-list-item-title>Model</v-list-item-title>
        <v-list-item-subtitle v-text="item.model"></v-list-item-subtitle>
        <v-list-item-title>Serial No</v-list-item-title>
        <v-list-item-subtitle v-text="item.logger_uid"></v-list-item-subtitle>
        <v-list-item-title>Firmware Version Installed</v-list-item-title>
        <v-list-item-subtitle v-text="item.firmwareVersionInUse"></v-list-item-subtitle>
        <v-list-item-title>Settings Version</v-list-item-title>
        <v-list-item-subtitle v-text="item.firmwareVersionInUse"></v-list-item-subtitle>
      </v-list-item>
    </v-list>
    </v-card-item>
  </v-card>
</template>

<script setup>
// import { ref } from "vue";
import { useLoggerStore } from "@/stores/loggers";
const loggerStore = useLoggerStore();

// const icon = ref("mdi-home")

</script>
