import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import { Screen, Text} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import * as Network from 'expo-network';


const sampleImage = require("../../../../assets/images/logo.png")

interface ExpoNetworkScreenProps extends AppStackScreenProps<"ExpoNetwork"> {
}


export const ExpoNetworkScreen: FC<ExpoNetworkScreenProps> = observer(function ExpoNetworkScreen(_props) {
    const {navigation} = _props;
    const [connectionState, setConnectionState] = useState<any>();
    const [ipAddress, setIpAddress] = useState<any>();

    useHeader({
            title: 'Net information',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])


    useEffect(() => {
        async function getNetworkInfo() {
            const networkState = await Network.getNetworkStateAsync();
            const ipAddress = await Network.getIpAddressAsync();
            setConnectionState(networkState);
            setIpAddress(ipAddress)
        }

        getNetworkInfo()
    }, [])


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <View>
                <Text text={ipAddress || 'No ip address available'} />
                <Text text={connectionState?.type || 'Not connectiontype available'} />
                <Text text={connectionState?.isInternetReachable ? 'Internet reachable' : 'No internet reachable'} />
                <Text text={connectionState?.isconnected ? 'Connected!' : 'Not connected'} />
            </View>
        </Screen>
    )
})



const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
    flex: 1,
}
