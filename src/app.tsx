import {Platform, requireNativeComponent, Text, View} from "react-native";
import {setupReactotron} from "./services/reactotron";
import {initialWindowMetrics, SafeAreaProvider} from "react-native-safe-area-context"

import * as Linking from "expo-linking"
import * as storage from "./utils/storage"
import {useFonts} from "expo-font"
import {ErrorBoundary} from "./screens"
import {customFontsToLoad} from "./theme"
import Config from "./config"
import {AppNavigator, useNavigationPersistence} from "./navigators";
import {useEffect} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
    // clear the Reactotron window when the app loads/reloads
    clearOnLoad: true,
    // generally going to be localhost
    host: "localhost",
    // Reactotron can monitor AsyncStorage for you
    useAsyncStorage: true,
    // log the initial restored state from AsyncStorage
    logInitialState: true,
    // log out any snapshots as they happen (this is useful for debugging but slow)
    logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
    screens: {
        Login: {
            path: "",
        },
        Welcome: "welcome",
        Home: "Home",
        Demo: {
            screens: {
                DemoShowroom: {
                    path: "showroom/:queryIndex?/:itemIndex?",
                },
                DemoDebug: "debug",
                DemoPodcastList: "podcast",
                DemoCommunity: "community",
            },
        },
    },
}


interface AppProps {
    hideSplashScreen: () => Promise<boolean>
}


export default function App(props: AppProps) {
    const {hideSplashScreen} = props;
    const {
        initialNavigationState,
        onNavigationStateChange,
        isRestored: isNavigationStateRestored,
    } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

    const [areFontsLoaded] = useFonts(customFontsToLoad)

    useEffect(() => {
        setTimeout(hideSplashScreen, 500)
    }, [])

    if (!isNavigationStateRestored || !areFontsLoaded) return null

    const linking = {
        prefixes: [prefix],
        config,
    }

    const GestureHandlerRootViewNative = Platform.OS === 'android'
        ? requireNativeComponent(
            'GestureHandlerRootView',
            // @ts-note: TS is saying only one arg supported. I tested one arg, and it
            // works. But I copied this from
            // `node_modules/react-native-gesture-handler/GestureHandlerRootView.android.js`
            // and they use this 2nd argument, so I'm keeping it.
            // { name: 'GestureHandlerRootView', propTypes: { ...ViewPropTypes } }
        )
        : View;


    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <ErrorBoundary catchErrors={Config.catchErrors}>
                <AppNavigator
                    linking={linking}
                    initialState={initialNavigationState}
                    onStateChange={onNavigationStateChange}
                />
            </ErrorBoundary>
        </SafeAreaProvider>

    )
}
