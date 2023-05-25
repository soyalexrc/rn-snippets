import {Snippet} from "./snippet.interface";
const bottomSheet = require("../../../../assets/images/bottom-sheet.png")
const sampleImage = require("../../../../assets/images/logo.png")



export const ACTIONABLE_SNIPPETS: Snippet[] = [
    {
        id: 'ACS-1',
        image: bottomSheet,
        label: 'Bottom sheet drawer',
        description: 'gorhom/bottom-sheet library to manage bottom sheet actions',
        url: 'BottomSheet',
        enabled: true
    },
    {
        id: 'ACS-2',
        image: sampleImage,
        label: 'React native modal',
        description: '',
        url: '',
        enabled: false
    },
    {
        id: 'ACS-3',
        image: sampleImage,
        label: 'Expo picker',
        description: '',
        url: '',
        enabled: false
    },
    {
        id: 'ACS-4',
        image: sampleImage,
        label: 'Expo datepicker',
        description: '',
        url: '',
        enabled: false
    },
]
