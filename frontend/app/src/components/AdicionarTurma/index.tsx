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
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  turmasList: any[];
};

const AdicionarTurma = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  turmasList,
}: Props) => {
  
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (control._formValues.nome.trim() !== "") {
      API.post("/turmas", {
        nome: control._formValues.nome,
        anoInicio: control._formValues.anoInicio,
      }).then((response: any) => {
        setValue("nome", "");
        turmasList.push(response.data);
        console.log(turmasList);
        setIsVisible(false);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome do equipmento não pode estar vazio.");
    }
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <Text style={styles.title}>Turma</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Turma"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <Text style={styles.title}>Ano de Início</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Ano de Início"
          value={watch("anoInicio")}
          onChangeText={(text) => setValue("anoInicio", text)}
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

export default AdicionarTurma;
