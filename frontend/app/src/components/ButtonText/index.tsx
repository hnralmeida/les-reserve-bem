import { TouchableHighlight, Text, Image, View, StyleProp } from "react-native";
import styles from "../../styles";

type Props = {
  handle: () => any;
  text: string;
  style?: StyleProp<any>;
};

export default function ButtonText({ handle, text }: Props) {
  return (
    <>
      <TouchableHighlight style={styles.button} onPress={handle}>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
    </>
  );
}
