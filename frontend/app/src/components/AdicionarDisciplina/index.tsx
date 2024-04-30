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
import { tipoDisciplinaList } from "../../types";

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
  const [cordenadoriaList, setCordenadoriaList] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      API.get("/coordenadorias").then((response) => {
        setCordenadoriaList(response.data);
      });
    }, [])
  );

  // Function to handle the registration of a new equipment
  const handleRegister = () => {
    console.log(
      cordenadoriaList.filter(
        (item) => item.id == control._formValues.coordenadoria
      )[0]
    );
    // Check if the equipment name is not empty before registering
    if (control._formValues.nome.trim() !== "") {
      API.post("/disciplinas", {
        nome: control._formValues.nome,
        sigla: control._formValues.sigla,
        cargaHorario: control._formValues.cargaHorario,
        tipoDisciplina: control._formValues.tipoDisciplina,
        coordenadoria: cordenadoriaList.filter(
          (item) => item.id == control._formValues.coordenadoria
        )[0],
      }).then((response: any) => {
        setValue("nome", "");
        setValue("sigla", "");
        setValue("cargaHorario", "");
        setValue("tipoDisciplina", "");
        setValue("coordenadoria", "");
        console.log(response.data);
        disciplinaList.push(response.data);
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
        <Text style={styles.title}>Nome da Disciplina</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome da Disciplina"
          value={watch("nome")}
          onChangeText={(text) => setValue("nome", text)}
        />

        <Text style={styles.title}>Sigla da Disciplina</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Sigla da Disciplina"
          keyboardType="numeric"
          value={watch("sigla")}
          onChangeText={(text) => setValue("sigla", text)}
        />

        <Text style={styles.title}>Carga Horária</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Carga Horária"
          keyboardType="numeric"
          value={watch("cargaHorario")}
          onChangeText={(text) => setValue("cargaHorario", text)}
        />

        <Text style={styles.title}>Tipo Disciplina</Text>
        <Picker
          style={styles.boxBorder}
          placeholder="Coordenadoria"
          selectedValue={watch("tipoDisciplina")}
          onValueChange={(text) => setValue("tipoDisciplina", text)}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione um tipo"}
            value={0}
          />
          {tipoDisciplinaList.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>

        <Text style={styles.title}>Coordenadoria</Text>
        <Picker
          style={styles.boxBorder}
          placeholder="Coordenadoria"
          selectedValue={watch("coordenadoria")}
          onValueChange={(itemValue) => setValue("coordenadoria", itemValue)}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione um tipo"}
            value={0}
          />
          {cordenadoriaList.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.nome + "(" + item.sigla + ")"}
              value={item.id}
            />
          ))}
        </Picker>

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
