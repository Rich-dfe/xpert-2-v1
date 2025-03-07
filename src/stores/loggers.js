import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";
import { signOut } from 'aws-amplify/auth';

export const useLoggerStore = defineStore("logger", () => {
 
  // STATE PROPERTIES
  const loggers = ref([]);
  const selected = ref(null);
  const selectedInfo = ref();
  const selectedDiagnosticData = ref(null);
  const groupInfo = ref(); //Populated from the groups store

  selectedInfo.value=[
    {
      "id": null,
      "product_id": null,
      "group_id": null,
      "user_id": null,
      "customer_id": null,
      "mp_user_sensor_count": null,
      "mp_sensor_id": null,
      "logger_uid": null,
      "logger_hex_uid": null,
      "logger_name": null,
      "settings_count": null,
      "sensor_spacing": null,
      "lat": -43.545286,
      "lng": 172.635785,
      "timezone": "NZ",
      "timezone_offset": null,
      "notes": null,
      "settings": null,
      "firmwareVersionInUse": null,
      "firmwareVersionDateLogged": null,
      "created_at": null,
      "updated_at": null,
      "product_name": null,
      "model": null
    }
  ];

  // FUNCTIONS
  async function fetchLoggersByUserId(userId) {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_LOGGERS_BASE, {
        params: { userId: userId },
      });
      this.loggers = response.data;
    } catch (error) {
      alert('fetchLoggersByUserId: '+error);
      await signOut();
    }
  }

  async function fetchLoggersByGroupId(groupId) {
    try {
      const response = await axios.get(
        import.meta.env.VITE_GROUP_LOGGERS_BASE,
        {
          params: { groupId: groupInfo.value.id, userId: groupInfo.value.user_id },
        }
      );
      console.log('fetchLoggersByGroupId',response.data);
      loggers.value = response.data;
      selected.value = null;
    } catch (error) {
      alert('fetchLoggersByGroupId: '+error);
      await signOut();
    }
  }

  async function fetchDiagnosticData() {
    try {
      if (selected !== null) {
        let selected_raw = toRaw(selected.value); //This is needed as the ref values are proxy objects and need to be converted to access the target properties
        const response = await axios.get(
          import.meta.env.VITE_DYNAMODB_DIAGNOSTIC_DATA_API_BASE,
          {
            params: { uidDecimal: selected_raw.logger_uid },
          }
        );
        //console.log(selected_raw);
        selectedDiagnosticData.value = response.data[0].diagnostics;
      }
    } catch (error) {
      alert('fetchDiagnosticData: '+error);
      await signOut();
    }
  }

  async function fetchLoggerInfo(){
    try {
        if (selected !== null) {
          let selected_raw = toRaw(selected.value); //This is needed as the ref values are proxy objects and need to be converted to access the target properties
          const response = await axios.get(
            import.meta.env.VITE_LOGGER_INFO_API_BASE,
            {
              params: { loggerId: selected_raw.id },
            }
          );
          
          selectedInfo.value = response.data;
          console.log('info',selectedInfo.value);
        }
      } catch (error) {
        alert('fetchLoggerInfo: '+error);
        await signOut();
      }
  }

  //WATCHERS
  // watch(
  //   () => groupStore.selected,
  //   () => {
  //     fetchLoggersByGroupId(groupStore.selected.id);
  //   }
  // );

  watch(groupInfo,fetchLoggersByGroupId);
  watch(selected, fetchDiagnosticData);
  watch(selected, fetchLoggerInfo);

  // COMPUTED
  const batteryVoltage = computed(() => {
    if (selectedDiagnosticData.value !== null) {
      let i;
      for (i = 0; i < selectedDiagnosticData.value.length; i++) {
        if (selectedDiagnosticData.value[i].type == 4099) {
          return selectedDiagnosticData.value[i].data1 / 1000+'V';
        }else{return 'n/a'}
      }
    }
  });

  const batteryVoltagePercent = computed(() => {
    if (selectedDiagnosticData.value !== null) {
      let i;
      for (i = 0; i < selectedDiagnosticData.value.length; i++) {
        if (selectedDiagnosticData.value[i].type == 4099) {
          return Math.floor((3000 / 100000) * selectedDiagnosticData.value[i].data1);
        }else{return 'n/a'}
      }
    }
  });

  const batteryDaysRemaining = computed(() => {
    if (selectedDiagnosticData.value !== null) {
      let i;
      for (i = 0; i < selectedDiagnosticData.value.length; i++) {
        if (selectedDiagnosticData.value[i].type == 4099) {
          return selectedDiagnosticData.value[i].data2;
        }else{return 'n/a'}
      }
    }
  });

  // EXPOSED PROPERTIES
  return {
    loggers,
    fetchLoggersByUserId,
    selected,
    selectedInfo,
    groupInfo,
    fetchLoggersByGroupId,
    batteryVoltage,
    batteryVoltagePercent,
    batteryDaysRemaining,
    fetchLoggerInfo
  };
});
