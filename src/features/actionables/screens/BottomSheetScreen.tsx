import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import BottomSheet, { BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";


const sampleImage = require("../../../../assets/images/logo.png")

interface BottomSheetScreenProps extends AppStackScreenProps<"BottomSheet"> {
}


export const BottomSheetScreen: FC<BottomSheetScreenProps> = observer(function BottomSheetScreen(_props) {
    const {navigation} = _props;
    const sheetRef = useRef<BottomSheet>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
    // variables
    const snapPoints = useMemo(() => ["15%", "60%", "100%"], []);

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
    const handleSnapPress = useCallback((index) => {
        sheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        sheetRef.current?.close();
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
                {/*{bottomSheetOpen && <View style={styles.backdrop} />}*/}
                {/*<View > /style={{ zIndex: bottomSheetOpen ? -1 : 1 }}>*/}
                <View>
                    <Button text="Snap To 100%" onPress={() => handleSnapPress(2)}/>
                    <Button text="Snap To 60%" onPress={() => handleSnapPress(1)}/>
                    <Button text="Snap To 15%" onPress={() => handleSnapPress(0)}/>
                    <Button text="Close" onPress={() => handleClosePress()}/>
                </View>
                    <BottomSheet

                        // backdropComponent={CustomBackdrop}
                        style={{
                            paddingHorizontal: 10,
                        }}
                        ref={sheetRef}
                        onChange={handleSheetChange}
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

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
        opacity: 0.5
    }
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
