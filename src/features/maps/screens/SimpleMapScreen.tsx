import {observer} from "mobx-react-lite"
import React, {FC, useEffect, useMemo, useRef, useState, useCallback} from "react"
import {Image, TextInput, TextStyle, View, ViewStyle, StyleSheet, Pressable} from "react-native"
import {AutoImage, Button, Card, Icon, Screen, Text, TextField, TextFieldAccessoryProps} from "../../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../../navigators"
import {colors, spacing} from "../../../theme"
import {useHeader} from "../../../utils/useHeader";
import MapView, {Marker} from 'react-native-maps';


const sampleImage = require("../../../../assets/images/logo.png")

const markers = [
    {
        latlng: {
            latitude: 26.86012,
            longitude: -13.98417,
        },
        title: 'sample title',
        description: 'sample description',
        image: ''
    },
    {
        latlng: {
            latitude: 64.21237,
            longitude: -104.93284,
        },
        title: 'sample title 2',
        description: 'sample description 2',
        image: 'https://cdn0.iconfinder.com/data/icons/internet-glyphs-vol-1/52/custom__map__pin__location__pinned__gps__marker-512.png'
    },

]

interface SimpleMapScreenProps extends AppStackScreenProps<"SimpleMap"> {
}


export const SimpleMapScreen: FC<SimpleMapScreenProps> = observer(function SimpleMapScreen(_props) {
    const {navigation} = _props;

    useHeader({
            title: 'Simple map',
            leftIcon: 'back',
            onLeftPress: () => navigation.goBack()
        },
        [])


    return (
        <Screen
            contentContainerStyle={$screenContentContainer}
        >
            <MapView style={styles.map}>
                {markers.map((marker, index) => (
                    <Marker
                        draggable
                        key={index}
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        image={marker.image ? {uri: marker.image} : null}
                    />
                ))}
            </MapView>
        </Screen>
    )
})


const $screenContentContainer: ViewStyle = {
    flex: 1,
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
})
