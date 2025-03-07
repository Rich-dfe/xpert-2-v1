import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { useUsersStore } from "./users.js";
import { signOut } from "aws-amplify/auth";

const userStore = useUsersStore();

export const useCustomerStore = defineStore("customer", () => {
  // STATE PROPERTIES
  const customers = ref([]);
  const selected = ref(null);

  //NOTE: THE LAMBDA FUNCTION USES INFO IN THE AWS COGNITO JWT TO DETERMINE WHAT RESULTS TO RETURN
  // FUNCTIONS
  
  async function fetchCustomers() {
    //console.log('Fetching customers here');
    var idToken = localStorage.getItem("CognitoIdentityServiceProvider.417oaji5dthgle2rtahqdmjmm8.499e6468-e041-7064-d3a2-9bdeb87f84d0.idToken");
   
    try {
      const response = await axios.get(import.meta.env.VITE_CUSTOMERS_BASE, {
        params: { email: userStore.email },
        headers: {Authorization: idToken}
      });
      const statusCode = response?.status
      if (statusCode === 200) {
        console.log(response);
        this.customers = response.data;
      }
    } catch (error) {
      //alert('fetchCustomers: '+error);
      await signOut();
    }
  }

  // COMPUTED

  //WATCHERS
  watch(
    selected,
    () => {
      //console.log('Watching stuff 1',selected.value.id);
      userStore.customerId = selected.value.id;
      //userStore.selected = null;
    },
    { deep: true }
  );

  return { customers, fetchCustomers, selected };
});
