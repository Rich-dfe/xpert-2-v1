<template >
  <authenticator hideSignUp>
    <template v-slot="{ user, signOut }">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
            :subtitle="userStore.userGroup"
            :title="userStore.email"
          />
        </v-list>
        <v-divider />

        <v-list :lines="false" density="compact" nav>
          <router-link v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item :value="item" color="primary">
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

        <v-app-bar-title class="text-blue-lighten-3"
          >Dataflow Xpert</v-app-bar-title
        >
        <v-btn type="button" color="success" variant="outlined" @click="signOut">Sign Out</v-btn>
      </v-app-bar>

      <v-main>
        <loggerFilterBar />
        <router-view />
      </v-main>
    </v-app>
  </template>
  <template v-slot:header>
      <div style="padding: var(--amplify-space-large); text-align: center">
        <img
          alt="Dataflow Logo"
          src="https://ody-media.s3.ap-southeast-2.amazonaws.com/xpert+logo+124+x+109+trans-bg.png"
        />
      </div>
    </template>

    <template v-slot:sign-in-header>
      <h2
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 0; font-size: var(--amplify-font-sizes-xl); text-align: center;"
      >
        Dataflow Xpert
      </h2>
    </template>

  <template v-slot:footer>
      <div style="padding: var(--amplify-space-large); text-align: center">
        <p class="amplify-text" style="color: var(--amplify-colors-neutral-80)">
          © All Rights Reserved 
        </p>
      </div>
    </template>
  </authenticator>
</template>

<script setup>
//window.location.href = window.location.origin+"/";
console.log('LOC',window.location);
console.log('LOC2',window.location.origin+"/");


import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import '@aws-amplify/ui/dist/styles.css'; 
import { Amplify } from "aws-amplify"
import { Hub } from "aws-amplify/utils";
import { jwtDecode } from "jwt-decode";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import loggerFilterBar from "@/components/ui/loggerFilterBar.vue";
import { useUsersStore } from "@/stores/users";
import { useLoggerStore } from "@/stores/loggers";
import axios from "axios";

const userStore = useUsersStore();
const loggerStore = useLoggerStore();
const drawer = ref(null);

const items = [
  { text: "Home", icon: "mdi-home", to: "/" },
  { text: "Settings", icon: "mdi-cog-outline", to: "/settings" },
  { text: "Calibration", icon: "mdi-calculator-variant-outline", to: "/calibration" },
  { text: "Chart", icon: "mdi-chart-line", to: "/chart" },
  { text: "Groups", icon: "mdi-group", to: "/groups" },
  {
    text: "Licenses",
    icon: "mdi-card-account-details-outline",
    to: "/licenses",
  },
  { text: "User Guides", icon: "mdi-file-document-outline", to: "/guides" },
  { text: "Server Settings", icon: "mdi-server-outline", to: "/serverSettings" },
];

// const navDrawUserDetails = [
//   {name: null, group: null}
// ]

Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
        userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
        // identityPoolId: "<your-cognito-identity-pool-id>",
        loginWith: {
          email: true,
        },
        // signUpVerificationMethod: "code",
        userAttributes: {
          email: {
            required: true,
          },
        },
        // allowGuestAccess: true,
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireNumbers: true,
        },
      },
    },
  })

async function currentSession() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    axios.defaults.headers.common["Authorization"] = idToken;
    //console.log('Running currentSession()');
    console.log(`Access Token: ${accessToken}`);
    console.log(`ID Token: ${idToken}`);

    const decoded = jwtDecode(idToken.toString());
    const userGroup = decoded["cognito:groups"][0];
    const userEmail = decoded.email;

    userStore.userGroup = userGroup;
    userStore.email = userEmail;

    console.log("GROUP : ", userGroup);
    console.log("EMAIL : ", userEmail);
    //navDrawUserDetails[0].name = userEmail;
    //navDrawUserDetails[0].group = userGroup;

    //email.value = decoded.email
    //axios.defaults.headers.common["Authorization"] = idToken;
    //axios.defaults.headers.common['AllowHeader'] = ['Content-Type', 'X-Amz-Date', 'X-Amz-Security-Token', 'Authorization', 'X-Api-Key', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'];
  } catch (err) {
    console.log(err);
  }
}

Hub.listen("auth", (data) => {
  const { payload } = data;
  //console.log('Hub',payload.event);
  switch (payload.event) {
    case "signedIn":
      currentSession();
      break;
  }
});

</script>

<style scoped>
a {
  text-decoration: none;
  color: #d3d3d3;
}
</style>
