import {Snippet} from "./snippet.interface";
const record = require("../../../../assets/images/record-audio.jpeg")
const play = require("../../../../assets/images/play-audio.png")



export const AUDIO_SNIPPETS: Snippet[] = [
    {
        id: 'AS-1',
        image: play,
        label: 'Play sound',
        description: 'Expo AV primitives to play local audio',
        url: 'PlaySound',
        enabled: true
    },
    {
        id: 'AS-2',
        image: record,
        label: 'Record sound',
        description: 'Expo AV primitives to record audio and read the recording',
        url: 'RecordSound',
        enabled: true
    },
]
