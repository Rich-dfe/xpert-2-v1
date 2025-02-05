import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useLoggerStore } from "./loggers";
const loggerStore = useLoggerStore();

export const useCalibrationStore = defineStore('calibration',() =>{
    const parCalFormFields = ref({
        loggerReadingTotal:null,
        referenceReadingAverage: null,
        referenceUnits: null,
        loggerInterval: null,
        testDuration: null,
        preCalibrationReset: false,
    })

    const wlCalFormFields = ref({
        setToFactoryDefaults:null,
        firstReferenceReading:null,
        firstLoggerReading:null,
        secondReferenceReading:null,
        secondLoggerReading:null,
        loggerTemperature:null,
        sensorLength:35
    })

    const wlCalibratedParameters = ref({
        resolution:0.2,
        tempCompensation: -0.151648
    })

    const mptCalFormFields = ref()

    const conductivityCalFormFields = ref()

    const isParCalibrationFormValid = ref(false)
    const isWaterLevelCalibrationFormValid = ref(false)

    

    return{
        parCalFormFields,
        wlCalFormFields,
        mptCalFormFields,
        conductivityCalFormFields,
        isParCalibrationFormValid,
        wlCalibratedParameters
    }

})