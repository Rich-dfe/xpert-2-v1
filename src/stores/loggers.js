async function fetchDiagnosticData() {
  console.log("Hello selected", selected.value);
  try {
    if (selected.value !== null) {
      const response = await axios.get(
        import.meta.env.VITE_DYNAMODB_DIAGNOSTIC_DATA_API_BASE,
        {
          params: { uidDecimal: selected.value },
        }
      );
      console.log("DX", response.data[0].diagnostics);
      selectedDiagnosticData.value = response.data[0].diagnostics;
    }

    //loggers.value = response.data
    //selected.value = null
  } catch (error) {
    alert(error);
  }
}
import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";
import { useGroupStore } from "./groups";

const groupStore = useGroupStore();

export const useLoggerStore = defineStore("logger", () => {
  // STATE PROPERTIES
  const loggers = ref([]);
  const selected = ref(null);
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

        selectedDiagnosticData.value = response.data[0].diagnostics;
      }
    } catch (error) {
      alert('fetchDiagnosticData: '+error);
    }
  }

  watch(
    () => groupStore.selected,
    () => {
      fetchLoggersByGroupId(groupStore.selected.id);
    }
  );

  watch(selected, fetchDiagnosticData);

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
    fetchLoggersByGroupId,
    batteryVoltage,
    batteryVoltagePercent,
    batteryDaysRemaining
  };
});
