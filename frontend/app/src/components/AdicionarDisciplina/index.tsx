// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
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
import { Picker } from "@react-native-picker/picker";
import ModalComponent from "../modal";
import ButtonText from "../ButtonText";

import styles from "../../styles";
import API from "../../services/API";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UseFormWatch, Control, UseFormSetValue } from "react-hook-form";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  disciplinaList: any[];
};

const AdicionarDisciplina = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  disciplinaList,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (control._formValues.nome.trim() !== "") {
      API.post("/disciplinas", {
        nome: control._formValues.nome,
      }).then((response: any) => {
        setValue('nome', '');
        console.log(response.data);
        disciplinaList.push(response.data[0]);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome da displina não pode estar vazio.");
    }
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <Text style={styles.title}>Nome do Professor</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome da Disciplina"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
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

export default AdicionarDisciplina;
