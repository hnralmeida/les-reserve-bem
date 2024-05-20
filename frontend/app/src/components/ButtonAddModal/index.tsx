import { TouchableHighlight, Text, Image, View } from "react-native";
import styles from "../../styles";

type Props = {
  modal_visible: React.SetStateAction<boolean>;
  set_modal_visible: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
};

export default function ActivateModalButton({
  modal_visible,
  set_modal_visible,
  text,
}: Props) {
  return (
    <TouchableHighlight
      style={styles.iconButton}
      onPress={() => set_modal_visible(!modal_visible)}
    >
      <View style={[styles.row, {margin: 0}]}>
        <Image
          source={require("../../../assets/plus.png")}
          style={[styles.iconElement, {marginRight: 16}]}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
}
