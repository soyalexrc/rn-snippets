import {Snippet} from "./snippet.interface";
const sampleImage = require("../../../../assets/images/logo.png")
const expoCamera = require("../../../../assets/images/expo-camera.png")

export const CAMERA_SNIPPETS: Snippet[] = [
    {
        id: 'CS-1',
        label: 'Expo camera',
        description: 'Take pictures. preview via modal. switch camera types. permissions',
        url: 'ExpoCamera',
        enabled: true,
        image: expoCamera
    },
    {
        id: 'CS-2',
        label: 'Expo QR Scanner',
        description: '',
        url: 'ExpoQrScanner',
        enabled: true,
        image: expoCamera
    },
    {
        id: 'CS-3',
        label: 'Expo Codebar Scanner',
        description: '',
        url: '',
        enabled: false,
        image: expoCamera
    },
    {
        id: 'CS-4',
        label: 'Vision camera',
        description: '',
        url: '',
        enabled: false,
        image: sampleImage
    },
    {
        id: 'CS-5',
        label: 'Expo Face Detector',
        description: '',
        url: '',
        enabled: false,
        image: sampleImage
    },
]
