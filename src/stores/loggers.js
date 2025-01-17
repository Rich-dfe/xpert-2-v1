import	{ defineStore } from 'pinia'
import { ref,watch } from 'vue'
import axios from 'axios'
import { useGroupStore } from './groups'

const groupStore = useGroupStore();

export const useLoggerStore = defineStore('logger',() => {
    // STATE PROPERTIES
    const loggers = ref([])
    const selected = ref()
    
    
    // FUNCTIONS
    async function fetchLoggersByUserId(userId) {
        try{ 
            const response = await axios.get(import.meta.env.VITE_USER_LOGGERS_BASE,{
                params: { userId: userId }
              });
              this.loggers = response.data
         }
        catch (error){
            alert(error)
        }
    }

    async function fetchLoggersByGroupId(groupId) {
        try{ 
            const response = await axios.get(import.meta.env.VITE_GROUP_LOGGERS_BASE,{
                params: { groupId: groupId }
              });
              loggers.value = response.data
              selected.value = null
         }
        catch (error){
            alert(error)
        }
    }

    watch(
        ()  => groupStore.selected,
        () =>{
        fetchLoggersByGroupId(groupStore.selected.id,self)
    })

    // COMPUTED


    // EXPOSED PROPERTIES
    return { loggers,fetchLoggersByUserId,selected,fetchLoggersByGroupId }
})