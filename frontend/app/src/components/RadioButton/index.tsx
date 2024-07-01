// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

type Props = {
  style?: any;
  selected: boolean;
  onSelect: Dispatch<SetStateAction<boolean>>;
};

export function RadioButton(props: Props) {
  return (
    <TouchableHighlight onPress={props.onSelect}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          },
          props.style ? props.style : {},
        ]}
      >
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#000",
            }}
          />
        ) : null}
      </View>
    </TouchableHighlight>
  );
}
