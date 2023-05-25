import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useRef, useState} from "react"
import {Alert, Image, Modal, StyleSheet, TouchableOpacity, View,} from "react-native"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../navigators"
import {Camera, CameraType, FlashMode} from 'expo-camera';

const shutter = require('../../../assets/icons/camera-shutter.png');
const flip = require('../../../assets/icons/retry.png');
const flash = require('../../../assets/icons/flash.png');
const flashYellow = require('../../../assets/icons/flash-yellow.png');
const close = require('../../../assets/icons/close.png');
interface CameraScreenProps extends AppStackScreenProps<"ExpoCamera"> {
}

export const CameraScreen: FC<CameraScreenProps> = observer(function CameraScreen(_props) {
    const {navigation} = _props;
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isReady, setIsReady] = useState<boolean>(false);
    const cameraRef = useRef(null);
    const [currentPicture, setCurrentPicture] = React.useState('')
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [torchMode, setTorchMode] = useState<boolean>(false);

    if (permission?.status === 'denied') {
        Camera.requestCameraPermissionsAsync();
    }

    if (!permission?.granted) {
        Camera.requestCameraPermissionsAsync();
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    function toggleTorch() {
        setTorchMode(!torchMode)
    }

    async function takePicture() {
        const picture = await cameraRef.current.takePictureAsync(null)

        console.log(picture.uri);
        setCurrentPicture(picture.uri)

    }

    function exitCamera() {
        navigation.goBack();
    }

    function showPreview () {
        setModalVisible(true);
    }


    useEffect(() => {
        return () =>  {
            cameraRef.current = null;
            setIsReady(false);
            setCurrentPicture('')
        }
    }, [])


    return (
        <View style={styles.container}>
            <Camera flashMode={torchMode ? FlashMode.torch : FlashMode.off} ref={cameraRef} style={styles.camera} type={type} ratio="16:9" zoom={0} onCameraReady={() => setIsReady(true)}>
                <View style={styles.topButtonContainer}>
                    <TouchableOpacity style={styles.close} onPress={exitCamera}>
                        <Image source={close} style={styles.closeIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.flash} onPress={toggleTorch}>
                        <Image source={torchMode ? flashYellow : flash} style={styles.flipIcon} />
                    </TouchableOpacity>

                </View>
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={styles.flip} onPress={toggleCameraType}>
                        <Image source={flip} style={styles.flipIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.take} onPress={takePicture} disabled={!isReady}>
                        <Image source={shutter} style={styles.shutter} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'center'}} disabled={!currentPicture} onPress={showPreview} >
                        {
                            currentPicture &&
                            <Image source={{uri: currentPicture}} style={styles.preview} />
                        }
                    </TouchableOpacity>
                </View>
            </Camera>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <Image
                    source={{ uri: currentPicture }}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </Modal>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        position: 'relative'
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
