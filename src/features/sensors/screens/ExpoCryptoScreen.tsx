import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {
    Image,
    TextInput,
    TextStyle,
    View,
    ViewStyle,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Modal,
    Platform,
    Keyboard
} from "react-native"
import {Button, Icon, Screen, Text, TextField} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import * as Crypto from 'expo-crypto';
import {useForm, Controller} from "react-hook-form";
import {Picker} from '@react-native-picker/picker';

interface AlgorithmOption {
    value: Crypto.CryptoDigestAlgorithm,
    label: string
}


const algorithms: AlgorithmOption[] = [
    {
        value: Crypto.CryptoDigestAlgorithm.MD5,
        label: 'MD5'
    },
    {
        value: Crypto.CryptoDigestAlgorithm.SHA1,
        label: 'SHA-1'
    },
    {
        value: Crypto.CryptoDigestAlgorithm.SHA256,
        label: 'SHA-256'
    },
    {
        value: Crypto.CryptoDigestAlgorithm.SHA384,
        label: 'SHA-384'
    },
    {
        value: Crypto.CryptoDigestAlgorithm.SHA512,
        label: 'SHA-512'
    }
]


interface ExpoCryptoScreenProps extends AppStackScreenProps<"ExpoCrypto"> {
}


export const ExpoCryptoScreen: FC<ExpoCryptoScreenProps> = observer(function ExpoCryptoScreen(_props) {
    const {navigation} = _props;
    const [text, setText] = useState<string>('')
    const {control, handleSubmit, setValue, watch, formState: {errors}, getValues} = useForm({
        defaultValues: {
            data: '',
            algorithm: '',

        }
    });
    const [lastData, setLastData] = useState<string>('')
    const [dataEncrypted, setDataEncrypted] = useState<string>('')
    const [algorithm, setAlgorithm] = useState<Crypto.CryptoDigestAlgorithm>(Crypto.CryptoDigestAlgorithm.SHA256)
    const [showPicker, setShowPicker] = useState<boolean>(true);

    const onSubmit = data => console.log(data);


    useHeader({
            title: 'Expo Crypto',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack(),
        },
        [])


    async function encrypt() {
        try {
            const crypt = await Crypto.digestStringAsync(algorithm, lastData);
            setLastData(getValues('data'))
            setDataEncrypted(crypt);
            setValue('data', '')
            Keyboard.dismiss()
            setShowPicker(false)
        } catch (err) {
            console.log(err)
        }
    }

    function resetAll() {
        setShowPicker(true)
        setDataEncrypted('')
    }


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <Controller
                control={control}
                name='data'
                rules={{
                    required: true
                }}
                render={({field: {onChange, onBlur, value}}) => (
                    <TextField
                        value={value}
                        placeholder="Data to hash"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        RightAccessory={() => <TouchableOpacity onPress={encrypt}
                                                                style={{alignSelf: 'center', marginHorizontal: 10}}>
                            <Icon icon='debug'/>
                        </TouchableOpacity>}
                    />
                )}
            />

            {errors?.data && <Text text='This is required'/>}

            {
                dataEncrypted &&
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text preset='bold' text='Texto ingresado: '/>
                            <Text text={lastData}/>
                        </View>

                        <View>
                            <Text preset='bold' text='Algorithmo utilizado: '/>
                            <Text text={algorithm}/>
                        </View>

                        <View>
                            <Text preset='bold' text='Resultado: '/>
                            <Text text={dataEncrypted}/>
                        </View>
                    </View>
                    <Button text='Reset' style={{ marginVertical: 30 }} onPress={resetAll}/>
                </View>
            }


            {
                showPicker &&
                <View style={[{
                    flex: 1,
                    justifyContent: 'flex-end',
                }, Platform.OS === 'android' && {marginBottom: 30}]}>
                    <Text preset='subheading' style={{textAlign: 'center'}} text='Select crypto algorithm'/>
                    <Picker
                        selectedValue={algorithm}
                        onValueChange={(itemValue, itemIndex) =>
                            setAlgorithm(itemValue)
                        }>
                        {
                            algorithms.map((algorithm, index) => (
                                <Picker.Item key={index} label={algorithm.label} value={algorithm.value}/>
                            ))
                        }
                    </Picker>
                </View>
            }


        </Screen>
    )
})


const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
    flex: 1,
}
