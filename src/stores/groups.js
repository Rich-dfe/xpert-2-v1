import	{ defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useLoggerStore } from './loggers'

const loggerStore = useLoggerStore();

export const useGroupStore = defineStore('group',() => {
    // STATE PROPERTIES
    const groups = ref([])
    const selected = ref()
    const userId = ref() //Populated by the users store

    // FUNCTIONS
    async function fetchGroups() {
        try{ 
            const response = await axios.get(import.meta.env.VITE_USER_GROUPS_BASE,{
                params: { userId: userId.value }
              });
              
              response.data.splice(0, 0, {id: -1, user_id: response.data[1].user_id, group_name: "All Loggers"});
              console.log('Groups',response.data);
              //response.data.push({id: -1, group_name: "All Loggers"})
              groups.value = response.data
         }
        catch (error){
            alert(error)
        }
    }

    //WATCHERS
    watch(
        selected,
        () => {
        loggerStore.groupInfo = selected.value;
        //loggerStore.selected = null;
        }
        // { deep: true }
      );

    watch(userId, fetchGroups);

    return { groups,fetchGroups,selected,userId }
})