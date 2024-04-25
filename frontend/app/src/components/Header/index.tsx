import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import your icon library (e.g., Ionicons)
import styles from "../../styles";

type Props = {
  navigation: any;
};

const BackHeader = ({ navigation }: Props) => {
  return (
    <View style={styles.headerButton}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.bgHeader, styles.rowCenter]}
      >
        <Image source={require("../../../assets/arrow_back.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default BackHeader;
