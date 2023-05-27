import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useState} from "react"
import {ViewStyle,} from "react-native"
import {Button, Screen, Text} from "../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../navigators"
import {spacing} from "../../theme"
import {useHeader} from "../../utils/useHeader";
import {Audio, InterruptionModeAndroid, InterruptionModeIOS} from 'expo-av';

interface PlaySoundScreenProps extends AppStackScreenProps<"PlaySound"> {
}

export const PlaySoundScreen: FC<PlaySoundScreenProps> = observer(function PlaySoundScreen(_props) {
    const {navigation} = _props;
    const [sound, setSound] = useState<Audio.Sound>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        const getPlaySoundsPermission = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
                allowsRecordingIOS: false,
                interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                playsInSilentModeIOS: true
            })
            setHasPermission(status === 'granted');
        };
        getPlaySoundsPermission();

    }, []);

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
