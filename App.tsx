import App from "./src/app";
import {registerRootComponent} from "expo";

import * as SplashScreen from "expo-splash-screen";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync()

export default function BoilerplateApp() {
  return (
      <GestureHandlerRootView style={{flex: 1}}>
        <App hideSplashScreen={SplashScreen.hideAsync} />
      </GestureHandlerRootView>
  )
}

registerRootComponent(BoilerplateApp);
