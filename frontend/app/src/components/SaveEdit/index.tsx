import { Text, View, TouchableHighlight, Image } from "react-native";
import styles from "../../styles";
import React from "react";

interface SaveEditProps {
  onCancel: () => void;
  onSave: () => void;
}

const SaveEdit = ({ onCancel, onSave }: SaveEditProps) => {
  return (
    <>
      <View style={styles.row}>
        <TouchableHighlight style={styles.textActions} onPress={onCancel}>
          <Image
            source={require("../../../assets/cancel.png")}
            style={styles.iconElement}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.textFocus} onPress={onSave}>
          <Text>Salvar</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default SaveEdit;
