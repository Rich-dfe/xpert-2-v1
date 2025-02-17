import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";

export const useUsersStore = defineStore("user", () => {

const users = ref([]);
const userGroup = ref('');
const email = ref('');
const apiResp = ref('');
const cognitoUserId = ref('');
const customerId = ref(''); //Populated through the customer store

async function fetchUsers() {
    console.log('Fetching users function', customerId.value)
    try{ 
        const response = await axios.get(import.meta.env.VITE_CUSTOMER_USERS_BASE,{
            params: { customerId: customerId.value }
          });
          console.log(response)
          users.value = response.data
     }
    catch (error){
        alert('customer/users request error')
    }
}


watch(customerId,fetchUsers)

return{
    users,
    userGroup,
    email,
    apiResp,
    cognitoUserId,
    customerId
}
})