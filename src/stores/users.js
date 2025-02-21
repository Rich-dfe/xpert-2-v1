import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";
import { useGroupStore } from "./groups";

const groupStore = useGroupStore();

export const useUsersStore = defineStore("user", () => {
  const users = ref([]);
  const userGroup = ref("");
  const email = ref("");
  const apiResp = ref("");
  const cognitoUserId = ref("");
  const customerId = ref(""); //Populated through the customer store
  const selected = ref(null);

  async function fetchUsers() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_CUSTOMER_USERS_BASE,
        {
          params: { customerId: customerId.value },
        }
      );
      console.log(response);
      users.value = response.data;
    } catch (error) {
      alert("customer/users request error");
    }
  }

  //WATCHERS
  watch(customerId, fetchUsers);

  watch(
    selected,
    () => {
    groupStore.userId = selected.value.id;
    //groupStore.selected = null;
    }
    // { deep: true }
  );

  return {
    users,
    userGroup,
    email,
    apiResp,
    cognitoUserId,
    customerId,
    selected
  };
});
