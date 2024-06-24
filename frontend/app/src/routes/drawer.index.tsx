import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  UIManager,
  View,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import {
  DrawerNavigationState,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import styles from "../styles";
import { useAuth } from "../context/AuthProvider";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const DrawerIndex = (props: Props) => {
  const navigation = useNavigation();
  const [menuIndex, setMenuIndex] = useState(-1);
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} style={{ margin: 0, padding: 0 }}>
        <Image source={require("../../assets/ifes.png")} style={styles.logo} />
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableHighlight onPress={signOut}>
          <View style={[styles.rowFlexEnd, { height: 32 }]}>
            <Image
              source={require("../../assets/logout.png")}
              style={styles.iconElement}
            />
            <Text style={[styles.centerText, { paddingLeft: 8 }]}>
              Sign Out
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default DrawerIndex;
