import { defineStore } from "pinia";
import { ref, watch, toRaw, isProxy } from "vue";
import axios from "axios";
import { useLoggerStore } from "./loggers";
import { useUsersStore } from "./users";
import { signOut } from "aws-amplify/auth";
import { get } from "aws-amplify/api/server";

const loggerStore = useLoggerStore();
const userStore = useUsersStore();

export const useServerSettingsStore = defineStore("serverSettings", () => {
  //--------------------- REFS -------------------------------//
  //CHANNEL SENSOR REFS
  const currentChannelSettings = ref([]);
  const isloading = ref(false);
  const selectedChannel = ref("n/a");
  const selectedEnabledSensor = ref(null);
  const selectedDisabledSensor = ref(null);
  const selectedSensor = ref(null);
  const selectedSensorValue = ref(null);
  const toggleMsg = ref(null);
  //END OF CHANNEL SENSOR REFS

  //USER SETTINGS REFS
  const currentUserSettings = ref([]);
  const userSettingsIsloading = ref(false);
  const userSettingSelectedInUse = ref(null);
  const userSettingSelectedNotInUse = ref(null);
  const userSettingSelected = ref({"id":null, "settingValue":null});
  //END OF USER SETTINGS REFS

  //MFR SETTINGS REFS
  const currentMfrSettings = ref([]);
  const mfrSettingsIsloading = ref(false); 
  const mfrSettingSelectedInUse = ref(null);
  const mfrSettingSelectedNotInUse = ref(null);
  const mfrSettingSelected = ref({"id":null, "settingValue":null});
  //END OF MFR SETTINGS REFS

  const serverDownloadSettings = ref(null);

  //--------------------- END OF REFS -------------------------------//
  //--------------------- FUNCTIONS -------------------------------//
  //FUNCTIONS
  //CHANNEL SETTINGS
  async function getChannelSettings(channel, isToggling) {
    isloading.value = true;

    try {
      const response = await axios.get(
        import.meta.env.VITE_LOGGER_CHANNEL_SETTINGS_API_BASE,
        {
          params: {
            lid: loggerStore.selected.id,
            ch: channel,
          },
        }
      );
      console.log(response.data);
      isloading.value = false;
      currentChannelSettings.value = response.data;
      selectedChannel.value = channel;
      //If toggling the sensor we want to keep the sensor value state so the toggle button can be pressed again
      //without having to select the same sensor id again.
      if (!isToggling) {
        selectedSensor.value = "";
      }
      if (!response.data) {
        toggleMsg.value = "Some errory thing";
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        //await signOut();
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  }

  async function toggleChannelSettings() {
    // const updateMsgBox = document.querySelector('#updateStatusContainer');
    // var updateMsg = '';

    if (selectedSensor.value.state != null) {
      if (selectedSensor.value.state === 1) {
        selectedSensor.value.state = 0;
      } else if (selectedSensor.value.state === 0) {
        selectedSensor.value.state = 1;
      }
    }
    //console.log("Toggled", selectedSensor.value.id, selectedSensor.value.state);

    //isloading.value = true;
    try {
      const response = await axios.put(
        import.meta.env.VITE_LOGGER_CHANNEL_SETTINGS_API_BASE,
        {
          lid: loggerStore.selected.id,
          ch: selectedChannel.value,
          sensor_id: selectedSensor.value.id,
          value: selectedSensor.value.state,
        }
      );
      isloading.value = false;
      console.log("PUT", response.data[0].changedRows);
      if (response.data[0].changedRows === 1) {
        toggleMsg.value = selectedSensor.value.id + " Updated";
      } else if (response.data[0].changedRows === 0) {
        toggleMsg.value = "No Change";
      }

      setTimeout(function () {
        toggleMsg.value = null;
        selectedSensor.value.id = null;
      }, 2000);

      //reload channel select menus
      getChannelSettings(selectedChannel.value, true);
    } catch (error) {
      console.error(error);
    }
  }

  function setEnabledToSelectedSensor() {
    selectedSensor.value = selectedEnabledSensor.value;
  }

  function setDisabledToSelectedSensor() {
    selectedSensor.value = selectedDisabledSensor.value;
  }

  //END OF CHANNEL SETTINGS FUNCTIONS

  //USER SETTINGS FUNCTIONS
  async function fetchUserSettings() {
      userSettingsIsloading.value = true;
    try {
      const response = await axios.get(
        import.meta.env.VITE_USER_SETTINGS_API_BASE,
        {
          params: {
            lid: loggerStore.selected.id,
          },
        }
      );
      currentUserSettings.value = response.data;
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        await signOut();
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  }

  function setInUseSettingToSelected(){
    userSettingSelected.value = userSettingSelectedInUse.value;
  }

  function setNotInUseSettingToSelected(){
    userSettingSelected.value = userSettingSelectedNotInUse.value;
  }
  //END OF USER SETTINGS FUNCTIONS

  //MFR SETTINGS FUNCTIONS
  async function fetchMfrSettings() {
    mfrSettingsIsloading.value = true;
  try {
    const response = await axios.get(
      import.meta.env.VITE_MFR_SETTINGS_API_BASE,
      {
        params: {
          lid: loggerStore.selected.id,
        },
      }
    );
    currentMfrSettings.value = response.data;
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      await signOut();
    } else if (error.request) {
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
}

function setInUseMfrSettingToSelected(){
  mfrSettingSelected.value = mfrSettingSelectedInUse.value;
}

function setNotInUseMfrSettingToSelected(){
  mfrSettingSelected.value = mfrSettingSelectedNotInUse.value;
}
  //END OF MFR SETTINGS FUNCTIONS

  // SERVER SETTINGS FUNCTION
  async function getServerDownloadSettings() {
    try {
      const response = await axios.get(import.meta.env.VITE_SERVER_DOWNLOAD_SETTINGS,{
        //The authorization header is removed for this request as I don't currently know if the Xtract app can handle CORS.
        transformRequest: (data,headers) => {
          delete headers['Authorization'];
        },
        params: { 
            //email: userStore.selected.id, 
            //serial_no:loggerStore.selected.id 
            email:"r.griffithmumby@uq.edu.au",
            password: "5f1227bo",
            force_manufacturer_settings:0
          }
      });
      console.log(response.data);
      //Set the array in the store object to the database results
      serverDownloadSettings.value = response.data;
    } catch (error) {
        if (error.response) {
        console.log(error.request);
        //await signOut();
      }else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
}

  // END OF SERVER SETTINGS FUNCTION

  //--------------------- END OF FUNCTIONS -------------------------------//

  //------------------------- WATCHERS -----------------------------------//
  watch(selectedEnabledSensor, setEnabledToSelectedSensor);
  watch(selectedDisabledSensor, setDisabledToSelectedSensor);

  watch(userSettingSelectedInUse, setInUseSettingToSelected);
  watch(userSettingSelectedNotInUse, setNotInUseSettingToSelected);

  watch(mfrSettingSelectedInUse, setInUseMfrSettingToSelected);
  watch(mfrSettingSelectedNotInUse, setNotInUseMfrSettingToSelected);
  //------------------------- END OF WATCHERS ----------------------------//

  return {
    getChannelSettings,
    toggleChannelSettings,
    currentChannelSettings,
    isloading,
    selectedChannel,
    selectedEnabledSensor,
    selectedDisabledSensor,
    selectedSensor,
    selectedSensorValue,
    toggleMsg,

    fetchUserSettings,
    currentUserSettings,
    userSettingSelectedInUse,
    userSettingSelectedNotInUse,
    userSettingSelected,
    userSettingsIsloading,
    
    fetchMfrSettings,
    currentMfrSettings,
    mfrSettingSelectedInUse,
    mfrSettingSelectedNotInUse,
    mfrSettingSelected,
    mfrSettingsIsloading,

    getServerDownloadSettings,
    serverDownloadSettings,
  };
});
