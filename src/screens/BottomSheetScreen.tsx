import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, TouchableOpacity, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../navigators"
import {colors, spacing} from "../theme"
import {useHeader} from "../utils/useHeader";
import BottomSheet, { BottomSheetView} from '@gorhom/bottom-sheet';


const sampleImage = require("../../assets/images/logo.png")

interface BottomSheetScreenProps extends AppStackScreenProps<"BottomSheet"> {
}


export const BottomSheetScreen: FC<BottomSheetScreenProps> = observer(function BottomSheetScreen(_props) {
    const {navigation} = _props;
    const sheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ["15%", "60%", "100%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
    }, []);


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useHeader({
            title: 'Bottom Sheet',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])

    return (
            <Screen
                contentContainerStyle={$screenContentContainer}
            >
                <Button text="Snap To 100%" onPress={() => handleSnapPress(2)}/>
                <Button text="Snap To 60%" onPress={() => handleSnapPress(1)}/>
                <Button text="Snap To 15%" onPress={() => handleSnapPress(0)}/>
                <Button text="Close" onPress={() => handleClosePress()}/>
                <BottomSheet
                    style={{
                        marginHorizontal: 5,
                        paddingHorizontal: 10
                    }}
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView>
                        <Text>Awesome 🔥</Text>
                    </BottomSheetView>
                </BottomSheet>

            </Screen>
    )
})

const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
    flex: 1,
}

const $signIn: TextStyle = {
    marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
    marginBottom: spacing.lg,
}

const $hint: TextStyle = {
    color: colors.tint,
    marginBottom: spacing.md,
}

const $textField: ViewStyle = {
    marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = {
    marginTop: spacing.xs,
}

// @demo remove-file
