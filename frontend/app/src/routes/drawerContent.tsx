import { Image, LayoutAnimation, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, UIManager, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import { DrawerNavigationState, ParamListBase, useNavigation } from '@react-navigation/native'
import { DrawerItemList } from '@react-navigation/drawer'
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Props = {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
};

const DrawerContent = (props: Props) => {
    const navigation = useNavigation()
    const [menuIndex, setMenuIndex] = useState(-1);
    return (
        <>
            {/* profile header */}
            <TouchableOpacity onPress={() => console.log('Home')}>
                <Text>Software Engineer</Text>
            </TouchableOpacity>
        </>
    )
}

export default DrawerContent;