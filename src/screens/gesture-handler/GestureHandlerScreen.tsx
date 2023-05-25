import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {
    Image,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
    TouchableOpacity,
    Pressable,
    StyleSheet,
} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../navigators"
import {colors, spacing} from "../../theme"
import {useHeader} from "../../utils/useHeader";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";


interface GestureHandlerScreenProps extends AppStackScreenProps<"GestureHandler"> {
}

export const GestureHandlerScreen: FC<GestureHandlerScreenProps> = observer(function GestureHandlerScreen(_props) {
    const {navigation} = _props;
    useHeader({
        title: 'Gesture handler',
        leftIcon: 'back',
        onLeftPress: () => navigation.goBack()
    }, [])

    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 0, y: 0});
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offset.value.x},
                {translateY: offset.value.y},
                {scale: withSpring(isPressed.value ? 1.2 : 1)},
            ],
            backgroundColor: isPressed.value ? 'red' : 'blue',
        };
    });

    const start = useSharedValue({x: 0, y: 0});
    const translateX = useSharedValue(0)

    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]
        }
    })
    const gesture = Gesture.Pan()
        .onBegin(() => {
            isPressed.value = true;
        })
        .onUpdate((e) => {
            translateX.value = e.translationX;
            offset.value = {
                x: e.translationX + start.value.x,
                y: e.translationY + start.value.y,
            };
        })
        .onEnd(() => {
            start.value = {
                x: offset.value.x,
                y: offset.value.y,
            };
        })
        .onFinalize(() => {
            isPressed.value = false;
        });



    return (
        <View style={$container}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[$circle, animatedStyles]}></Animated.View>
            </GestureDetector>
        </View>
    )
})

const $container: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
}

const $circle: TextStyle = {
    height: 80,
    aspectRatio: 1,
    backgroundColor: 'blue',
    borderRadius: 40,
    opacity: 0.8
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
