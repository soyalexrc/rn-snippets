import {Snippet} from "./snippet.interface";
const draggable = require("../../../../assets/images/draggable.jpeg")
const swipeShuffle = require("../../../../assets/images/swipe-shuffle.jpeg")


export const GESTURES_SNIPPETS: Snippet[] = [
    {
        id: 'GS-1',
        label: 'Simple draggabe ball',
        description: 'React native reanimated with Pan gesture handler',
        url: 'GestureHandler',
        enabled: true,
        image: draggable
    },
    {
        id: 'GS-2',
        label: 'Swipe & shuffle',
        description: 'Swipe cards with spring animations. Auto shuffle',
        url: 'SwipeCards',
        enabled: true,
        image: swipeShuffle
    }
]
