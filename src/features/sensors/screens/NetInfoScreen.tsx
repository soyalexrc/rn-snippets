import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import NetInfo from '@react-native-community/netinfo';


const sampleImage = require("../../../../assets/images/logo.png")

interface NetInfoScreenProps extends AppStackScreenProps<"NetInfo"> {
}


export const NetInfoScreen: FC<NetInfoScreenProps> = observer(function NetInfoScreen(_props) {
    const {navigation} = _props;
    const [connectionType, setConnectionType] = useState<any>();
    const [isConnected, setIsConnected] = useState<any>();
    const [details, setDetails] = useState<any>();
    const [isInternetReachable, setIsInternetReachable] = useState<any>();

    useHeader({
            title: 'Net information',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])


    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log('Connection type: ', state.type);
            console.log('Is connected?' , state.isConnected);
            console.log('Details: ', state.details);
            console.log('Is internet reachable? ', state.isInternetReachable);
            setDetails(state.details);
            setConnectionType(state.type)
            setIsConnected(state.isConnected)
            setIsInternetReachable(state.isInternetReachable)
        })

        return () => {
            unsubscribe();
        }
    }, [])


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <View>
                <Text text={details?.ipAddress || 'No ip address available'} />
                <Text text={connectionType || 'Not connection type available'} />
                <Text text={isInternetReachable ? 'Internet reachable' : 'No internet reachable'} />
                <Text text={isConnected ? 'Connected!' : 'Not connected'} />
            </View>
        </Screen>
    )
})



const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
    flex: 1,
}
