import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useLoggerStore } from "./loggers";
const loggerStore = useLoggerStore();

export const useLoggerConfigStore = defineStore("loggerConfig", () => {
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
    continuous:'On',
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
        console.log(response.data);
      } catch (error) {
        alert("fetchConfigSettings: " + error);
      }
    }
  }

  function saveConfigSettings() {
    console.log("Save settings");
  }

  // EXPOSED PROPERTIES
  return {
    loggerConfigFormFields,
    loggerConfigFormControlValues,
    isConfigFormValid,
    fetchConfigSettings,
    saveConfigSettings,
  };
});
