import { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles";

type Props ={
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    onClose: () => void
}

const ImportModal =({isVisible, setIsVisible, onClose}: Props) => {
    return (
        <View style={styles.modalContainer}>
            
        </View>
    );
};




export default ImportModal;