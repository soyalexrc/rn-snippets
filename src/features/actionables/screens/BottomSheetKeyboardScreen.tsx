import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider, BottomSheetView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";


const sampleImage = require("../../../../assets/images/logo.png")

interface BottomSheetKeyboardScreenProps extends AppStackScreenProps<"BottomSheetKeyboard"> {
}


export const BottomSheetKeyboardScreen: FC<BottomSheetKeyboardScreenProps> = observer(function BottomSheetKeyboardScreen(_props) {
    const {navigation} = _props;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState('Awesome 🎉')

    const snapPoints = useMemo(() => ["25%", "60%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
        if (index === -1) {
            setBottomSheetOpen(false)
        } else {
            if (bottomSheetOpen) return
            setBottomSheetOpen(true)
        }
    }, []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);


    useHeader({
            title: 'Bottom Sheet Keyboard',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <BottomSheetModalProvider>
                <Button text="Open bottom sheet modal" onPress={handlePresentModalPress}/>
                <BottomSheetModal
                    backdropComponent={CustomBackdrop}
                    style={{
                        paddingHorizontal: 10,
                    }}
                    ref={bottomSheetModalRef}
                    index={0}
                    onChange={handleSheetChange}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView>
                        <BottomSheetTextInput value={inputValue} onChange={(e: any) => setInputValue(e)} style={styles.textInput} />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>


        </Screen>
    )
})

const styles = StyleSheet.create({

    textInput: {
        alignSelf: "stretch",
        marginHorizontal: 12,
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "grey",
        color: "white",
        textAlign: "center",
    },
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
