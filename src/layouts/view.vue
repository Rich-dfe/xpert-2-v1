<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item
          prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
          subtitle="robrien@4d-electronics.co.nz"
          title="Richard O'Brien"
        />
      </v-list>

      <v-divider />

      <v-list
        :lines="false"
        density="compact"
        nav
      >
        <router-link
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item
            :value="item"
            color="primary"
          >
            <template #prepend>
              <v-icon :icon="item.icon" />
            </template>

            <v-list-item-title :textContent="item.text" />
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-app-bar-title class="text-blue-lighten-3">Dataflow Xpert</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <loggerFilterBar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import loggerFilterBar from "@/components/ui/loggerFilterBar.vue";

const drawer = ref(null);

const items = [
  { text: "Home", icon: "mdi-home", to: "/" },
  { text: "Settings", icon: "mdi-cog-outline", to: "/settings" },
  { text: "Calibration", icon: "mdi-wrench-outline", to: "/calibration" },
  { text: "Chart", icon: "mdi-chart-line", to: "/chart" },
  { text: "Groups", icon: "mdi-group", to: "/groups" },
  { text: "Licenses", icon: "mdi-card-account-details-outline", to: "/licenses" },
  { text: "User Guides", icon: "mdi-file-document-outline", to: "/guides" },
];
</script>

<style scoped>
a {
  text-decoration: none;
  color: #D3D3D3;
}
</style>
