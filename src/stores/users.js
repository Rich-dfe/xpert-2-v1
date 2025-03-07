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
    var idToken = localStorage.getItem("CognitoIdentityServiceProvider.417oaji5dthgle2rtahqdmjmm8.499e6468-e041-7064-d3a2-9bdeb87f84d0.idToken");
    try {
      const response = await axios.get(
        import.meta.env.VITE_CUSTOMER_USERS_BASE,
        {
          params: { customerId: customerId.value },
          headers: {Authorization: idToken}
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
},
{
  persist: {
    pick: ['email'],
  }
}
);
