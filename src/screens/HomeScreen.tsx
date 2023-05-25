import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, TouchableOpacity, Pressable, Dimensions} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../components"
// import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {FlashList} from "@shopify/flash-list";
import * as storage from '../utils/storage';
import {useNavigationState} from '@react-navigation/native';
const sadFace = require('../../assets/images/sad-face.png')

import {
    FORMS_SNIPPETS,
    AUDIO_SNIPPETS,
    CAMERA_SNIPPETS,
    CHARTS_SNIPPETS,
    FILES_SYSTEM_SNIPPETS,
    GESTURES_SNIPPETS,
    SKIA_SNIPPETS
} from '../utils/data/snippets';
import {Snippet} from "../utils/data/snippets/snippet.interface";
import {ACTIONABLE_SNIPPETS} from "../utils/data/snippets/actionables";
import {Canvas, RoundedRect} from "@shopify/react-native-skia";


interface HomeScreenProps extends AppStackScreenProps<"Home"> {}


interface ListItemProps {
    item: Snippet;
    fn: () => void;
}

function ListItem(props: ListItemProps) {
    return (
        <Pressable
            style={{minHeight: 170, minWidth: 250}}
            onPress={props.fn}>
            <Card
                style={{flex: 1, padding: 0, shadowOpacity: 0, elevation: 0}}
                HeadingComponent={
                    <View >
                        <Image
                            style={{
                                height: 80,
                                width: '100%',
                                borderTopLeftRadius: spacing.md,
                                borderTopRightRadius: spacing.md
                        }}
                            source={props.item.image}
                            resizeMode='cover'
                        />
                        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                            <Text preset="bold" size="sm" text={props.item.label} />
                            <Text preset="default" style={{ color: colors.textDim }} size="xxs" text={props.item.description} />
                        </View>
                     </View>
                }
            />
        </Pressable>
    )
}

function Divider({axis}: {axis: string}) {
    return <View style={[axis  === 'x' ? {width: 20}: {height: 20}]} />
}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
    const {navigation} = _props;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [latestSnippetConsulted, setLatestSnippetConsulted] = useState<any>({})
    const navigationState = useNavigationState(state => state);

    async function readData() {
        try {
            const data = await storage.load('latestSnippetConsulted');
            if (data != null) {
                setLatestSnippetConsulted(data);
            }
        } catch (err) {

        }
    }


    useEffect(() => {
        readData()
    }, [navigationState])

    async function goTo(item: Snippet) {
        // @ts-ignore
        navigation.navigate(item.url);
        await storage.save('latestSnippetConsulted', item)
    }

    return (
        <Screen
            preset="auto"
            safeAreaEdges={["top", "bottom"]}
        >

            {/*skia painting*/}

                <View
                    style={{
                        height: 250,
                        backgroundColor: '#ca673d',
                        flex: 1,
                        borderBottomLeftRadius: spacing.lg,
                        borderBottomRightRadius: spacing.lg,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 30,
                }} >
                    <Text
                        size={"xxl"}
                        preset={"bold"}
                        text={"Hello, there!"}
                        style={{
                            color: '#fff',
                        }}
                    />
                    <Text
                        size={"md"}
                        preset={"bold"}
                        text={"What kind of snippet are you looking for?"}
                        style={{
                            color: '#f0dad1',
                        }}
                    />
                </View>

                    <View
                        style={{
                            backgroundColor: '#fff',
                            height: 150,
                            marginTop: -80,
                            marginBottom: 20,
                            flex: 1,
                            borderRadius: spacing.lg,
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            borderWidth: 1,
                            shadowColor: colors.palette.neutral800,
                            shadowOffset: { width: 0, height: 12 },
                            shadowOpacity: 0.08,
                            shadowRadius: 12.81,
                            elevation: 16,
                        }}>
                        <View style={{
                            flex: 0.4,
                        }}>
                        <Image
                            source={latestSnippetConsulted?.image || sadFace}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderTopLeftRadius: spacing.lg,
                                borderBottomLeftRadius: spacing.lg,
                            }}
                        />
                        </View>
                        <View style={{
                            flex: 1,
                            padding: spacing.sm,
                        }}>
                            <Text size='xxs' preset='subheading' text='Latest snippet visited' />
                            <Text size='lg' preset='heading' text={latestSnippetConsulted?.label || '...'} />
                            <Text size='xs' preset='subheading' text={latestSnippetConsulted?.description || '...'} />
                        </View>



                </View>


            <View style={$screenContentContainer}>
                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Gestures' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    estimatedItemSize={50}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={GESTURES_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Actionables' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    estimatedItemSize={50}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={ACTIONABLE_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='File system' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={FILES_SYSTEM_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Formularios' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={FORMS_SNIPPETS}
                />
                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Audio' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={AUDIO_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Camera' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={CAMERA_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Charts' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={CHARTS_SNIPPETS}
                />

                <Divider axis={"y"}/>

                <Text size='lg' style={{ marginBottom: 10 }} preset="heading" text='Skia' />
                <FlashList
                    renderItem={({ index, item }) => {
                        return <ListItem
                            fn={item.url ? () => goTo(item) : null}
                            item={item}
                        />
                    }}
                    horizontal={true}
                    keyExtractor={(item, index) => item.id}
                    showsHorizontalScrollIndicator={false}
                    estimatedItemSize={50}
                    ItemSeparatorComponent={() => <Divider axis={"x"} />}
                    data={SKIA_SNIPPETS}
                />
            </View>


        </Screen>
    )
})

const $screenContentContainer: ViewStyle = {
    paddingHorizontal: spacing.xs,
}
