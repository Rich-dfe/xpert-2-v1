import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
import { useLoggerStore } from "./loggers";

export const useLoggerConfigStore = defineStore("loggerConfig", () => {
  const loggerStore = useLoggerStore();

  const loggerConfigFormFields = ref({
    group_name: "Home",
    notes: null,
    site: "Deployment_1584412761860",
    timezone: "NZ",
    x0000: "Spa Pool",
    x000E: 0,
    x0013: 0,
    x0018: 120,
    x0060: null,
  });

  const loggerConfigFormControlValues = ref({
    continuous: "On",
    applyToGroup: "No",
    firmwareUpdateEnabled: "Off",
  });

  const isConfigFormValid = ref(false);

  async function fetchConfigSettings() {
    if (loggerStore.selected !== null) {
      console.log("Fetch settings", loggerStore.selected.id);
      try {
        const response = await axios.get(
          import.meta.env.VITE_LOGGER_CONFIG_SETTINGS_API_BASE,
          {
            params: { loggerId: loggerStore.selected.id },
          }
        );
        loggerConfigFormFields.value = response.data[0];
        console.log("Logger config store", response.data);
      } catch (error) {
        alert("fetchConfigSettings: " + error);
      }
    }
  }

  function saveConfigSettings() {
    console.log("Save settings");
  }

  watch(
    () => loggerStore.selected,
    (n) => {
      fetchConfigSettings();
      //console.log(n, " value changed");
    }
  );

  

  // EXPOSED PROPERTIES
  return {
    loggerConfigFormFields,
    loggerConfigFormControlValues,
    isConfigFormValid,
    fetchConfigSettings,
    saveConfigSettings,
  };
});
