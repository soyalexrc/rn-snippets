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
import {Audio} from 'expo-av';

interface RecordSoundScreenProps extends AppStackScreenProps<"RecordSound"> {
}

export const RecordSoundScreen: FC<RecordSoundScreenProps> = observer(function RecordSoundScreen(_props) {
    const {navigation} = _props;
    const [recording, setRecording] = useState<Audio.Recording>();
    const [lastRecordPath, setLastRecordPath] = useState<string>('')
    const [lastRecord, setLastRecord] = useState<Audio.Sound>()

    useHeader({
        title: 'Record sound',
        leftIcon: 'back',
        onLeftPress: () => navigation.goBack()
    }, [])

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        try {
            console.log('Stopping recording..');
            const uri = recording.getURI();
            setLastRecordPath(uri);
            setTimeout(async () => {
                const {sound} = await Audio.Sound.createAsync({uri: uri})
                setLastRecord(sound);
                console.log(sound)
            }, 500)
            setRecording(undefined);
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            console.log('Recording stopped and stored at', uri);
        } catch (err) {
            console.log(err);
        }

    }

    async function playLastRecord() {
        console.log('Loading Sound');


        const playerStatus = await lastRecord.getStatusAsync();

        console.log(playerStatus);

        // Play if song is loaded successfully
        if (playerStatus.isLoaded) {
                await lastRecord.playAsync();
                const {sound} = await Audio.Sound.createAsync({uri: lastRecordPath})
                setLastRecord(sound);
        }
    }



    return (
        <Screen
            preset={"auto"}
            style={$container}>
            <Button
                text={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />
            <Text text={`Last record saved in, ${lastRecordPath}`}/>
            <Button disabled={!lastRecord} text='Play last record' onPress={playLastRecord}/>
        </Screen>
    )
})

const $container: ViewStyle = {
    padding: spacing.xs
}
