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
import { Audio } from 'expo-av';
interface PlaySoundScreenProps extends AppStackScreenProps<"PlaySound"> {
}

export const PlaySoundScreen: FC<PlaySoundScreenProps> = observer(function PlaySoundScreen(_props) {
    const {navigation} = _props;
    const [sound, setSound] = useState<Audio.Sound>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    console.log(permissionResponse)

    useHeader({
        title: 'Play sound',
        leftIcon: 'back',
        onLeftPress: () => navigation.goBack()
    }, [])
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../../../assets/sound/retro-game-sound.mp3')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);



    return (
        <Screen
            preset={"auto"}
            style={$container}>
            <Text text='play audio' />
            <Button text="Play Sound" onPress={playSound} />

        </Screen>
    )
})

const $container: ViewStyle = {
    padding: spacing.xs
}
