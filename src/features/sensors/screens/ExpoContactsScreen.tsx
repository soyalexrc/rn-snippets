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
    Modal
} from "react-native"
import {Button, Screen, Text, TextField} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import * as Contacts from 'expo-contacts';
import {FlashList} from "@shopify/flash-list";
import {ACTIONABLE_SNIPPETS} from "../../../utils/data/snippets/actionables";
import {BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView, BottomSheetView} from "@gorhom/bottom-sheet";
import CustomBackdrop from "../../actionables/components/CustomBackdrop";

interface ContactItemProps {
    contact: Contacts.Contact,
    fn: (c: Contacts.Contact) => void;
}
function ContactItem(props: ContactItemProps) {
    return (
        <Pressable
            onPress={() => props.fn(props.contact)}
            style={{
                paddingHorizontal: 10,
                paddingVertical: 20,

            }}
        >
            <Text text={props.contact.name} />
        </Pressable>
    )
}

function Divider() {
    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.separator
            }}
        />
    )
}



interface ExpoContactsScreenProps extends AppStackScreenProps<"ExpoContacts"> {
}


export const ExpoContactsScreen: FC<ExpoContactsScreenProps> = observer(function ExpoContactsScreen(_props) {
    const {navigation} = _props;
    const [contacts, setContacts] = useState<Contacts.Contact[]>([])
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentContact, setCurrentContact] = useState<Contacts.Contact>(null)

    // TODO hacer creaciones de contactos...

    // variables
    const snapPoints = useMemo(() => ["25%", "65%"], []);

    // callbacks
    const handleSheetChange = useCallback((index) => {
        if (index === -1) {
            setBottomSheetOpen(false)
        } else {
            if (bottomSheetOpen) return
            setBottomSheetOpen(true)
        }
    }, []);

    const handlePresentModalPress = useCallback((contact: Contacts.Contact) => {
        setCurrentContact(contact)
        bottomSheetModalRef.current?.present();
    }, []);

    useHeader({
            title: 'Expo contacts',
            leftIcon: 'back',
            rightText: 'Agregar',
            onLeftPress: () => navigation.goBack(),
            onRightPress: () => showNewContactForm()
        },
        [])

    useEffect(() => {
        async function getContactsInfo() {
            const {status} = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const {data} = await Contacts.getContactsAsync({
                    sort: "firstName"
                });
                console.log(data[0]);
                if (data.length > 0) {
                    setContacts(data);
                }
            }
        }
        getContactsInfo();
    }, [])

    function showNewContactForm() {
        console.log('new contact form')
        setModalVisible(true)
    }




    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <BottomSheetModalProvider>
                <FlashList
                    renderItem={({index, item}) => {
                        return <ContactItem contact={item} fn={(c) => handlePresentModalPress(c)}/>
                    }}
                    keyExtractor={(item, index) => item.id}
                    estimatedItemSize={400}
                    ItemSeparatorComponent={() => <Divider/>}
                    data={contacts}
                />
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
                        <BottomSheetScrollView>
                            <View>
                                <Text preset="bold" text="Tipo de contacto" />
                                <Text text={currentContact?.contactType} />
                            </View>

                            <View>
                                <Text preset="bold" text="Nombre" />
                                <Text text={currentContact?.firstName} />
                            </View>
                            <View>
                                <Text preset="bold" text="Segundo nombre" />
                                <Text text={currentContact?.middleName || '-'} />
                            </View>
                            <View>
                                <Text preset="bold" text="Apellido" />
                                <Text text={currentContact?.lastName} />
                            </View>
                            <View>
                                <Text preset="bold" text="Nombre completo" />
                                <Text text={currentContact?.name} />
                            </View>
                            <View>
                                <Text preset="bold" text="ID" />
                                <Text text={currentContact?.id} />
                            </View>
                            <View>
                                <Text preset="bold" text="Imagen disponible?" />
                                <Text text={currentContact?.imageAvailable ? 'Si' : 'No'} />
                            </View>
                            <View>
                                <Text preset="subheading" text="Numeros disponibles" />
                                {
                                    currentContact?.phoneNumbers.map((num, index) => (
                                        <View key={index} style={{  padding: 20, marginVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.separator}}>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="ID" />
                                                <Text text={num.id} />
                                            </View>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="Is primary?" />
                                                <Text text={num.isPrimary ? 'Si' : 'No'} />
                                            </View>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="Label" />
                                                <Text text={num.label} />
                                            </View>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="Digits" />
                                                <Text text={num.digits || '-'} />
                                            </View>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="Country code" />
                                                <Text text={num.countryCode || '-'} />
                                            </View>
                                            <View style={{  flexDirection: 'row', gap: 10}}>
                                                <Text preset="bold" text="Number" />
                                                <Text text={num.number || '-'} />
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>

                        </BottomSheetScrollView>
                </BottomSheetModal>


            </BottomSheetModalProvider>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Screen safeAreaEdges={["top"]}>
                    <View style={{  flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                        <Button text='Volver' onPress={() => setModalVisible(false)} />
                        <Button text='Guardar cambios' preset="filled" />
                    </View>
                    <TextField label='First name'/>
                    <View style={{  height: 30}} />
                    <TextField label='Middle name'/>
                    <View style={{  height: 30}} />
                    <TextField label='Last name'/>
                    <View style={{  height: 30}} />
                    <TextField label='Phone number' keyboardType="phone-pad" />
                </Screen>
            </Modal>
        </Screen>
    )
})



const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
    flex: 1,
}
