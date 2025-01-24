import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";
import { useGroupStore } from "./groups";

const groupStore = useGroupStore();

export const useLoggerStore = defineStore("logger", () => {
  // STATE PROPERTIES
  const loggers = ref([]);
  const selected = ref(null);
  const selectedInfo = ref([
    {
      "id": 524,
      "product_id": 1,
      "group_id": 66,
      "user_id": 32,
      "customer_id": 16,
      "mp_user_sensor_count": 5,
      "mp_sensor_id": null,
      "logger_uid": 261360397436195,
      "logger_hex_uid": null,
      "logger_name": "EDB4B5A5C523 - New Blue WL",
      "settings_count": 0,
      "sensor_spacing": null,
      "lat": -43.545286,
      "lng": 172.635785,
      "timezone": "NZ",
      "timezone_offset": "13.00",
      "notes": null,
      "settings": null,
      "firmwareVersionInUse": 128,
      "firmwareVersionDateLogged": 1721691901,
      "created_at": "2021-12-01T03:16:24.000Z",
      "updated_at": null
    }
  ]);
  const selectedDiagnosticData = ref(null);

  // FUNCTIONS
  async function fetchLoggersByUserId(userId) {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_LOGGERS_BASE, {
        params: { userId: userId },
      });
      this.loggers = response.data;
    } catch (error) {
      alert('fetchLoggersByUserId: '+error);
    }
  }

  async function fetchLoggersByGroupId(groupId) {
    try {
      const response = await axios.get(
        import.meta.env.VITE_GROUP_LOGGERS_BASE,
        {
          params: { groupId: groupId },
        }
      );
      //console.log('fetchLoggersByGroupId',response.data);
      loggers.value = response.data;
      selected.value = null;
    } catch (error) {
      alert('fetchLoggersByGroupId: '+error);
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
        console.log(selected_raw);
        selectedDiagnosticData.value = response.data[0].diagnostics;
      }
    } catch (error) {
      alert('fetchDiagnosticData: '+error);
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
          
          selectedInfo.value = response.data[0];
          console.log('info',selectedInfo.value);
        }
      } catch (error) {
        alert('fetchLoggerInfo: '+error);
      }
  }

  //WATCHERS
  watch(
    () => groupStore.selected,
    () => {
      fetchLoggersByGroupId(groupStore.selected.id);
    }
  );

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
    fetchLoggersByGroupId,
    batteryVoltage,
    batteryVoltagePercent,
    batteryDaysRemaining,
    fetchLoggerInfo
  };
});
