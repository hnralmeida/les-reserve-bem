import { TouchableHighlight, Text, Image, View } from "react-native";
import styles from "../../styles";

type Props = {
  modal_visible: React.SetStateAction<boolean>;
  set_modal_visible: React.Dispatch<React.SetStateAction<boolean>>;
  origin?: "aula";
};

export default function ButtonVisibleModal({
  modal_visible,
  set_modal_visible,
  origin,
}: Props) {
  return (
    <TouchableHighlight
      style={[styles.text, { width: "15%" }]}
      onPress={() => set_modal_visible(!modal_visible)}
    >
      <View style={[styles.listLine, { margin: 0 }]}>
        {origin == "aula" ? (
          <Image
            source={require("../../../assets/aulas.png")}
            style={styles.iconElement}
          />
        ) : (
          <Image
            source={require("../../../assets/salas.png")}
            style={styles.iconElement}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}
