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
import { tipoDisciplinaList } from "../../types";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  disciplina_list: any[];
  coordenadoria_list: any[];
  index: any;
};

const AdicionarDisciplina = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  disciplina_list,
  coordenadoria_list,
  index,
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
    if (control._formValues.id) {
      API.put("/disciplinas/" + disciplina_list[index].id, {
        nome: control._formValues.nome,
        sigla: control._formValues.sigla,
        cargaHoraria: control._formValues.cargaHoraria,
        tipoDisciplina: control._formValues.tipoDisciplina,
        coordenadoria: coordenadoria_list.filter(
          (item) => item.id == control._formValues.coordenadoria
        )[0],
      }).then(() => {
        // Atualiza o item na lista
        disciplina_list[index].nome = control._formValues.nome;
        disciplina_list[index].sigla = control._formValues.sigla;
        disciplina_list[index].cargaHoraria = control._formValues.cargaHoraria;
        disciplina_list[index].tipoDisciplina =
          control._formValues.tipoDisciplina;
        disciplina_list[index].coordenadoria = coordenadoria_list.filter(
          (item) => item.id == control._formValues.coordenadoria
        )[0];

        onClose();
      });
    } else {
      API.post("/disciplinas", {
        nome: control._formValues.nome,
        sigla: control._formValues.sigla,
        cargaHoraria: control._formValues.cargaHoraria,
        tipoDisciplina: control._formValues.tipoDisciplina,
        coordenadoria: cordenadoriaList.filter(
          (item) => item.id == control._formValues.coordenadoria
        )[0],
      }).then((response: any) => {
        disciplina_list.push(response.data);
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
          value={watch("cargaHoraria")}
          onChangeText={(text) => setValue("cargaHoraria", text)}
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
          <TouchableHighlight style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableHighlight>
        </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarDisciplina;
