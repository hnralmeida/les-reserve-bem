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
  professorList: any[];
  coordenadoriaList: any[];
  index: any;
};

const AdicionarProfessor = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  professorList,
  coordenadoriaList,
  index,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (control._formValues.id) {
      API.put("/professores/" + professorList[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
        email: control._formValues.email,
        rfid: control._formValues.rfid,
      }).then(() => {
        professorList[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        professorList[index].coordenadoria = coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0]; // Atualiza o nome do item na lista
        professorList[index].matricula = control._formValues.matricula;
        professorList[index].email = control._formValues.email;
        professorList[index].rfid = control._formValues.rfid;

        onClose();
      });
    } else {
      API.post("/professores", {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
        email: control._formValues.email,
        rfid: control._formValues.rfid,
        // matricula: control._formValues.matricula,
      }).then((response: any) => {
        professorList.push(response.data);
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
        <Text style={styles.title}>Nome do Professor</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome do Professor"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <Text style={styles.title}>Matricula do Professor</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Matricula do Professor"
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

        <Text style={styles.title}>RFID</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="RFID"
          value={watch("rfid")}
          onChangeText={(text) => setValue("rfid", text)}
        />

        <Text style={styles.title}>Coordenadoria do Professor</Text>
        <Picker
          style={styles.boxBorder}
          placeholder="Coordenadoria"
          selectedValue={watch("coordenadoria")}
          onValueChange={(itemValue: string) => {
            setValue("coordenadoria", itemValue);
          }}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione uma coordenadoria"}
            value={0}
          />
          {coordenadoriaList.map((item, index) => (
            <Picker.Item key={index} label={item.nome} value={item.id} />
          ))}
        </Picker>

        <View style={styles.rowCenter}>
          <TouchableHighlight style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarProfessor;
