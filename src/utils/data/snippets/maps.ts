import {Snippet} from "./snippet.interface";
const map = require("../../../../assets/images/maps.jpeg")



export const MAPS_SNIPPETS: Snippet[] = [
    {
        id: 'MAPS-1',
        image: map,
        label: 'Simple Map',
        description: 'React native maps',
        url: 'SimpleMap',
        enabled: true
    },
]
