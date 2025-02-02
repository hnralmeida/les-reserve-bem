// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
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
  periodo_list: any[];
  index: any;
};

const AdicionarPeriodo = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  periodo_list,
  index,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (control._formValues.id) {
      API.put("/periodos/" + periodo_list[index].id, {
        nome: control._formValues.nome,
        dataInicio: control._formValues.dataInicio,
        dataFim: control._formValues.dataFim,
      })
        .then(() => {
          periodo_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
          periodo_list[index].dataInicio = control._formValues.dataInicio;
          periodo_list[index].dataFim = control._formValues.dataFim;
          console.log(control._formValues.id);
          onClose();
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      API.post("/periodos", {
        nome: control._formValues.nome,
        dataInicio: control._formValues.dataInicio.toISOString(),
        dataFim: control._formValues.dataFim.toISOString(),
      })
        .then((response: any) => {
          console.log(response.data);
          periodo_list.push(response.data);

          onClose();
        })
        .catch((error) => {
          alert(error.response.data);
        });
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
            <Text style={styles.label}>Fim: </Text>
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
