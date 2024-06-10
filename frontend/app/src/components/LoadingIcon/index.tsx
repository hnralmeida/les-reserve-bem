import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import styles from "../../styles";

export const LoadingIcon = ({ loading }: any) => {
  return (
    loading && (
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </View>
    )
  );
};
