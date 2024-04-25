// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
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
import ModalComponent from "../modal";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  cordenadoriaNome: string;
  setCordenadoriaNome: React.Dispatch<React.SetStateAction<string>>; 
  cordenadoriaList: any[];
  setCordenadoriaList: React.Dispatch<React.SetStateAction<any[]>>;
};

const AdicionarCoordenadoria = ({
  isVisible,
  setIsVisible,
  onClose,
  cordenadoriaNome,
  setCordenadoriaNome, 
  cordenadoriaList,
  setCordenadoriaList
}: Props) => {

  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (cordenadoriaNome.trim() !== "") {
      API.post("/coordenadorias", {
        nome: cordenadoriaNome,
      }).then((response: any) => {
        setCordenadoriaNome("");
        console.log(response.data);
        cordenadoriaList.push(response.data[0]);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome do equipmento não pode estar vazio.");
    }
  };

  return (
    <ModalComponent isVisible={isVisible} setIsVisible={setIsVisible} onClose={onClose}>
      <>
          <Text style={styles.title}>Nome da Coordenadoria</Text>
          <TextInput
            style={styles.boxBorder}
            placeholder="Nome da Coordenadoria"
            value={cordenadoriaNome}
            onChangeText={(text) => setCordenadoriaNome(text)}
          />

          <View style={styles.rowCenter}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarCoordenadoria;
