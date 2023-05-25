import {Snippet} from "./snippet.interface";
const sampleImage = require("../../../../assets/images/logo.png")


export const SENSORS_SNIPPETS: Snippet[] = [
    {
        id: 'SS-1',
        label: 'Expo haptics',
        description: '',
        url: '',
        enabled: false,
        image: sampleImage
    },
    {
        id: 'SS-2',
        label: 'Expo biometrics',
        description: '',
        url: '',
        enabled: false,
        image: sampleImage
    },
    {
        id: 'SS-3',
        label: 'Expo localization',
        description: '',
        url: '',
        enabled: false,
        image: sampleImage
    },
]
