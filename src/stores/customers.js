import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { useUsersStore } from "./users.js";

const userStore = useUsersStore();

export const useCustomerStore = defineStore("customer", () => {
  // STATE PROPERTIES
  const customers = ref([]);
  const selected = ref();

  //NOTE: THE LAMBDA FUNCTION USES INFO IN THE AWS COGNITO JWT TO DETERMINE WHAT RESULTS TO RETURN
  // FUNCTIONS
  async function fetchCustomers() {
    try {
      const response = await axios.get(import.meta.env.VITE_CUSTOMERS_BASE, {
        params: { email: userStore.email },
      });
        console.log(response);
        this.customers = response.data;
    } catch (error) {
      alert("customer request error");
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
