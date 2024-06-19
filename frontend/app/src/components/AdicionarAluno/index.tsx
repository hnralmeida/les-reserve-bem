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
import { Picker } from "@react-native-picker/picker";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  coordenadoriaList: any[];
  alunoList: any[];
};

const AdicionarAluno = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  coordenadoriaList,
  alunoList,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    console.log(control._formValues);
    if (control._formValues.nome.trim() !== "") {
      API.post("/alunos", {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        email: control._formValues.email,
        coordenadoria: coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
      }).then((response: any) => {
        alunoList.push(response.data);

        setValue("nome", "");
        setValue("matricula", "");
        setValue("email", "");
        setValue("coordenadoria", "");

        onClose();
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
        <Text style={styles.title}>Nome do Aluno</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome do Aluno"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <Text style={styles.title}>Matricula do Aluno</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Matricula do Aluno"
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
        <Text style={styles.title}>Curso</Text>
        <Picker
          style={styles.boxBorder}
          placeholder="Coordenadoria"
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

export default AdicionarAluno;
