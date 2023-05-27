import {Snippet} from "./snippet.interface";
const sampleImage = require("../../../../assets/images/logo.png")
const networkStatus = require('../../../../assets/images/network-state.jpeg')
const expoNetwork = require('../../../../assets/images/expo-network.png')

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
    {
        id: 'SS-4',
        label: 'Net information',
        description: '@react-native-community/netinfo',
        url: 'NetInfo',
        enabled: true,
        image: networkStatus
    },
    {
        id: 'SS-5',
        label: 'Expo network',
        description: 'Expo implementation to check network information',
        url: 'ExpoNetwork',
        enabled: true,
        image: expoNetwork
    },
    {
        id: 'SS-6',
        label: 'Expo contacts api',
        description: 'Expo implementation to check device contacts information',
        url: 'ExpoContacts',
        enabled: true,
        image: expoNetwork
    },
    {
        id: 'SS-7',
        label: 'Expo crypto api',
        description: 'Expo implementation to hash data',
        url: 'ExpoCrypto',
        enabled: true,
        image: expoNetwork
    },
]
