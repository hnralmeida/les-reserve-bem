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
  alunoNome: string;
  setalunoNome: React.Dispatch<React.SetStateAction<string>>; 
  alunoList: any[];
  setAlunoList: React.Dispatch<React.SetStateAction<any[]>>;
};

const AdicionarAluno = ({
  isVisible,
  setIsVisible,
  onClose,
  alunoNome,
  setalunoNome, 
  alunoList,
  setAlunoList
}: Props) => {

  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (alunoNome.trim() !== "") {
      API.post("/alunos", {
        nome: alunoNome,
      }).then((response: any) => {
        setalunoNome("");
        console.log(response.data);
        alunoList.push(response.data[0]);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome do equipmento não pode estar vazio.");
    }
  };

  return (
    <ModalComponent isVisible={isVisible} setIsVisible={setIsVisible} onClose={onClose}>
      <>
          <Text style={styles.title}>Nome da aluno</Text>
          <TextInput
            style={styles.boxBorder}
            placeholder="Nome da aluno"
            value={alunoNome}
            onChangeText={(text) => setalunoNome(text)}
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

export default AdicionarAluno;
