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
  coordenadoria_list: any[];
  aluno_list: any[];
  turma_list: any[];
  index?: any;
};

const AdicionarAluno = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  coordenadoria_list,
  aluno_list,
  turma_list,
  index,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    console.log(control._formValues);
    if (control._formValues.id) {
      API.put("/alunos/" + control._formValues.id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: coordenadoria_list.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
        turma: turma_list.filter(
          (item) => Number(item.id) === Number(control._formValues.turma)
        )[0],
        email: control._formValues.email,
      }).then(() => {
        aluno_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        aluno_list[index].coordenadoria = coordenadoria_list.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0];
        aluno_list[index].turma = turma_list.filter(
          (item) => Number(item.id) === Number(control._formValues.turma)
        )[0];
        aluno_list[index].matricula = control._formValues.matricula;
        aluno_list[index].email = control._formValues.email;

        onClose();
      });
    } else {
      API.post("/alunos", {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        email: control._formValues.email,
        turma: turma_list.filter(
          (item) => Number(item.id) === Number(control._formValues.turma)
        )[0],
        coordenadoria: coordenadoria_list.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
      }).then((response: any) => {
        aluno_list.push(response.data);

        onClose();
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
          {coordenadoria_list.map((item, index) => (
            <Picker.Item key={index} label={item.nome} value={item.id} />
          ))}
        </Picker>
        <Text style={styles.title}>Turma</Text>
        <Picker
          style={styles.boxBorder}
          placeholder="Turma"
          selectedValue={watch("turma")}
          onValueChange={(itemValue: string) => {
            setValue("turma", itemValue);
          }}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione uma turma"}
            value={0}
          />
          {turma_list.map((item, index) => (
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
