import { Text, View, TouchableOpacity, Image } from "react-native";
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
        <TouchableOpacity style={styles.textActions} onPress={onCancel}>
          <Image
            source={require("../../../assets/cancel.png")}
            style={styles.iconElement}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textFocus} onPress={onSave}>
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SaveEdit;
