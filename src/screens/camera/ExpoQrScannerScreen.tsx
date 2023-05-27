import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useRef, useState} from "react"
import {Alert, Image, Modal, StyleSheet, TouchableOpacity, View,} from "react-native"
// import { useStores } from "../models"
import {AppStackScreenProps, goBack} from "../../navigators"
import {Camera, CameraType, FlashMode} from 'expo-camera';
import * as Haptics from 'expo-haptics';
import Animated, {
    Easing,
    BounceIn,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
    useAnimatedStyle, withRepeat
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import AnimatedView from "react-native-reanimated/lib/types/lib/reanimated2/component/View";
import {BarCodeScanner} from "expo-barcode-scanner";
import {Button, Text} from "../../components";

const shutter = require('../../../assets/icons/camera-shutter.png');
const flip = require('../../../assets/icons/retry.png');
const flash = require('../../../assets/icons/flash.png');
const flashYellow = require('../../../assets/icons/flash-yellow.png');
const close = require('../../../assets/icons/close.png');
const DURATION = 250;

const qrFrame = require('../../../assets/icons/qr-frame.png');

interface ExpoQrScannerScreenProps extends AppStackScreenProps<"ExpoQrScanner"> {
}

export const ExpoQrScannerScreen: FC<ExpoQrScannerScreenProps> = observer(function ExpoQrScannerScreen(_props) {
    const {navigation} = _props;
    const scale = useSharedValue(1);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [type, setType] = useState(CameraType.back);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isReady, setIsReady] = useState<boolean>(false);
    const cameraRef = useRef(null);
    const [currentPicture, setCurrentPicture] = React.useState('')
    const [qr, setQr] = useState<string>('');
    const [torchMode, setTorchMode] = useState<boolean>(false);


    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function toggleTorch() {
        setTorchMode(!torchMode)
    }


    const style = useAnimatedStyle(() => ({
        transform: [
            {scale: scale.value},
        ],
    }));

    scale.value = withRepeat(
        withTiming(0.9, {duration: 1000}, (finished, currentValue) => {
            if (finished) {
            } else {
            }
        }),
        -1,
        true,
        (finished, current) => {
        }
    );

    function exitCamera() {
        navigation.goBack();
    }


    async function onBarcodeScanned(event: any) {
        await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
        setQr(event.data);
        setScanned(true);
        setModalVisible(true);
        console.log(event);
    }

    useEffect(() => {
        return () => {
            cameraRef.current = null;
            setIsReady(false);
            setCurrentPicture('')
            scale.value = 1;
        }
    }, [])

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text text='Requesting for camera permission'/>;
    }
    if (hasPermission === false) {
        return <Text text='No access to camera'/>;
    }


    return (
        <View style={styles.container}>
            <Camera
                barCodeScannerSettings={{
                    barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                }}
                onBarCodeScanned={scanned ? undefined : onBarcodeScanned}
                flashMode={torchMode ? FlashMode.torch : FlashMode.off}
                ref={cameraRef}
                style={styles.camera}
                type={type}
                ratio="16:9"
                zoom={0}
                onCameraReady={() => setIsReady(true)}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity style={styles.close} onPress={exitCamera}>
                        <Image source={close} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flash} onPress={toggleTorch}>
                        <Image source={torchMode ? flashYellow : flash} style={styles.flipIcon} />
                    </TouchableOpacity>

                </View>
                <Animated.View style={[style]}>
                    <Image source={qrFrame} style={[styles.qrFrame]}/>
                </Animated.View>
            </Camera>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setScanned(false)
                    setQr('')
                    setModalVisible(!modalVisible);
                }}>
                <View style={{flex: 1, marginHorizontal: 20, marginTop: 50, marginBottom: 20}}>
                    <Text text="QR Scanned:"/>
                    <Text text={qr}/>
                    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
                        <Button text='Volver' onPress={() => {
                            setScanned(false)
                            setQr('')
                            setModalVisible(!modalVisible);
                        }}/>
                    </View>
                </View>
            </Modal>

        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    qrFrame: {
        width: 300,
        height: 300
    },
    bottomButtonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
    },
    topButtonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 60,
    },
    flip: {
        flex: 1,
        alignItems: 'center',
    },
    flash: {
        flex: 1,
        alignItems: 'flex-end',
        marginHorizontal: 30
    },
    close: {
        flex: 1,
        alignItems: 'flex-start',
        marginHorizontal: 30
    },
    take: {
        flex: 1,
        alignItems: 'center',
    },
    shutter: {
        width: 80,
        height: 80
    },
    flipIcon: {
        width: 40,
        height: 40
    },
    closeIcon: {
        width: 25,
        height: 25
    },
    preview: {
        width: 60,
        height: 60
    }
})
