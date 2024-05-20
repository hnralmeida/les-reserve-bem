import { TouchableHighlight, Text, Image, View } from "react-native";
import styles from "../../styles";

type Props = {
  modal_visible: React.SetStateAction<boolean>;
  set_modal_visible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ButtonVisibleModal({
  modal_visible,
  set_modal_visible,
}: Props) {
  return (
    <TouchableHighlight
      style={[styles.textActions, { width: '15%' }]}
      onPress={() => set_modal_visible(!modal_visible)}
    >
      <View style={[styles.listLine, { margin: 0 }]}>
        <Image
          source={require("../../../assets/salas.png")}
          style={styles.iconElement}
        />
      </View>
    </TouchableHighlight>
  );
}
