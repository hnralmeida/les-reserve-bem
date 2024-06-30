// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight,
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
  cordenadoriaSigla: string;
  setCordenadoriaSigla: React.Dispatch<React.SetStateAction<string>>;
  cordenadoriaList: any[];
  setCordenadoriaList: React.Dispatch<React.SetStateAction<any[]>>;
  index: any;
};

const AdicionarCoordenadoria = ({
  isVisible,
  setIsVisible,
  onClose,
  cordenadoriaNome,
  setCordenadoriaNome,
  cordenadoriaSigla,
  setCordenadoriaSigla,
  cordenadoriaList,
  setCordenadoriaList,
  index,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (index) {
      API.put("/coordenadorias/" + cordenadoriaList[index].id, {
        nome: cordenadoriaNome,
        sigla: cordenadoriaSigla,
      }).then(() => {
        cordenadoriaList[index].nome = cordenadoriaNome; // Atualiza o nome do item na lista
        cordenadoriaList[index].sigla = cordenadoriaSigla;

        onClose();
      });
      setCordenadoriaNome("");
    } else {
      API.post("/coordenadorias", {
        nome: cordenadoriaNome,
        sigla: cordenadoriaSigla,
      }).then((response: any) => {
        onClose();

        cordenadoriaList.push(response.data);
      });
    }
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <Text style={styles.title}>Nome da Coordenadoria</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome da Coordenadoria"
          value={cordenadoriaNome}
          onChangeText={(text) => setCordenadoriaNome(text)}
        />

        <Text style={styles.title}>Sigla da Coordenadoria</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Sigla da Coordenadoria"
          value={cordenadoriaSigla}
          onChangeText={(text) => setCordenadoriaSigla(text)}
        />

        <View style={styles.rowCenter}>
          <TouchableHighlight style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarCoordenadoria;
