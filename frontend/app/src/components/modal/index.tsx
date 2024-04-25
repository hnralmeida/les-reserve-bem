// EquipmentModal.js
import React, {
  useCallback,
  useState,
  SetStateAction,
  Dispatch,
  Children,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Image,
} from "react-native";
import styles from "../../styles";
import API from "../../services/API";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  children: React.ReactElement;
};

const ModalComponent = ({ isVisible, setIsVisible, onClose, children }: Props) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={[styles.rowFlexEnd]}>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../../../assets/cancel.png")}
                style={styles.iconElement}
              />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
