import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import BottomSheet, {BottomSheetModal, BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";


const sampleImage = require("../../../../assets/images/logo.png")

interface BottomSheetModalScreenProps extends AppStackScreenProps<"BottomSheetModal"> {
}


export const BottomSheetModalScreen: FC<BottomSheetModalScreenProps> = observer(function BottomSheetModalScreen(_props) {
    const {navigation} = _props;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
    // variables
    const snapPoints = useMemo(() => ["25%", "60%", "100%"], []);

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
            title: 'Bottom Sheet modal',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            {/*{bottomSheetOpen && <View style={styles.backdrop} />}*/}
            {/*<View  style={{ zIndex: bottomSheetOpen ? -1 : 1 }} />*/}
            <BottomSheetModalProvider>
                <View>
                    <Button text="Open bottom sheet modal" onPress={handlePresentModalPress}/>
                </View>
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
                        <Text>Awesome 🔥</Text>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>


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
