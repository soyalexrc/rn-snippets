import {Snippet} from "./snippet.interface";
const draggable = require("../../../../assets/images/draggable.jpeg")


export const GESTURES_SNIPPETS: Snippet[] = [
    {
        id: 'GS-1',
        label: 'Simple draggabe ball',
        description: 'React native reanimated with Pan gesture handler',
        url: 'GestureHandler',
        enabled: true,
        image: draggable
    }
]
