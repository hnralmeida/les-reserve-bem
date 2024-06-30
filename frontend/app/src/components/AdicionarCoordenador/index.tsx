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

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  coordenadorList: any[];
  index: any;
};

const AdicionarCoordenador = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  coordenadorList,
  index,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (control._formValues.id) {
      API.put("/coordenadores/" + coordenadorList[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        email: control._formValues.email,
      }).then(() => {
        coordenadorList[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        coordenadorList[index].matricula = control._formValues.matricula;
        coordenadorList[index].email = control._formValues.email;

        onClose();
      });
    } else {
      API.post("/coordenadores", {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        email: control._formValues.email,
        // matricula: control._formValues.matricula,
      }).then((response: any) => {
        setValue("nome", "");
        coordenadorList.push(response.data);
        onClose();
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
        <Text style={styles.title}>Nome do Coordenador</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome do Coordenador"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <Text style={styles.title}>Matricula do Coordenador</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Matricula do Coordenador"
          value={watch("matricula")}
          onChangeText={(text) => setValue("matricula", text)}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Email"
          value={watch("email")}
          onChangeText={(text) => setValue("email", text)}
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

export default AdicionarCoordenador;
