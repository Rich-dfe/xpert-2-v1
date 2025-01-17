import	{ defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useGroupStore = defineStore('group',() => {
    // STATE PROPERTIES
    const groups = ref([])
    const selected = ref()

    // FUNCTIONS
    async function fetchGroups(userId) {
        try{ 
            const response = await axios.get(import.meta.env.VITE_USER_GROUPS_BASE,{
                params: { userId: userId }
              });

              this.groups = response.data
         }
        catch (error){
            alert(error)
        }
    }

    // COMPUTED
    return { groups,fetchGroups,selected }
})