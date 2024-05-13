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
import InputDate from "../InputDate";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  periodoList: any[];
};

const AdicionarPeriodo = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  periodoList,
}: Props) => {

  const handleRegister = () => {
    console.log(control._formValues.dataFim.toISOString());
    // Check if the equipment name is not empty before registering
    if (control._formValues.nome.trim() !== "") {
      API.post("/periodos", {
        nome: control._formValues.nome,
        dataInicio: control._formValues.dataInicio.toISOString(),
        dataFim: control._formValues.dataFim.toISOString(),
      }).then((response: any) => {
        setValue("nome", ""); // Limpa os campos de input
        setValue("dataInicio", new Date()); // Limpa os campos de input
        setValue("dataFim", new Date()); // Limpa os campos de input

        console.log(response.data);
        periodoList.push(response.data);
      });
    } else {
      // Handle empty equipment name
      alert("Campos não podem estar vazios.");
    }
  };
  const handleImport = () => {
    Alert.alert("Importar", "Função ainda não implementada");
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
      <Text style={styles.label}>Período (Ano/Semestre) </Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Período (Ano/Semestre) "
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Início: </Text>
            <InputDate
              data_evento={watch("dataInicio")}
              label_value="dataInicio"
              set_data_evento={setValue}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>dataFim: </Text>
            <InputDate
              data_evento={watch("dataFim")}
              label_value="dataFim"
              set_data_evento={setValue}
            />
          </View>
        </View>

        <ButtonText handle={handleRegister} text="Salvar" />
      </>
    </ModalComponent>
  );
};

export default AdicionarPeriodo;
