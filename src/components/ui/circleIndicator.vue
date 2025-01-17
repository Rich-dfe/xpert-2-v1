<template>
  <v-card class="mx-auto" max-width="368">
    <v-card-item title="Battery">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18"
        ></v-icon>

        Extreme Weather Alert
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h3" cols="6"> 2.96V </v-col>

        <v-col class="text-right" cols="6">
          <v-progress-circular
            model-value=""
            :size="100"
            :width="12"
            color="success"
            >20</v-progress-circular
          >
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-weather-windy">
        <v-list-item-subtitle>123 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script setup></script>
