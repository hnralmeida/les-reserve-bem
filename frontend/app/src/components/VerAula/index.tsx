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
  aulasList: any[];
  index: any;
};

const VerAula = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  aulasList,
  index,
}: Props) => {
  function handle() {
    const aulas = aulasList.filter(
      (aula) =>
        aula.disciplina.nome === control._formValues.aula.disciplina.nome
    );

    aulas.map((aula) => {
      API.delete(`/aulas/${aula.id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    setIsVisible(false);
  }

  if (index)
    return (
      <ModalComponent
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onClose={onClose}
      >
        <View>
          <Text style={styles.modalTitle}>Aula</Text>
          <View style={styles.row}>
            <Text style={styles.buttonText}>Disciplina</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.disciplina
                ? control._formValues.aula.disciplina.nome
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Turma</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.turma
                ? control._formValues.aula.turma.nome
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Professor</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.professor
                ? control._formValues.aula.professor.nome
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Local</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.local
                ? control._formValues.aula.local.nomeLocal
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Período</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.periodo
                ? control._formValues.aula.periodo.nome
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Início</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.horaInicio
                ? control._formValues.aula.horaInicio
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Fim</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.horaFim
                ? control._formValues.aula.horaFim
                : ""}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.buttonText}>Dia Da Semana</Text>
            <Text style={[styles.textLabel, { justifyContent: "flex-start" }]}>
              {control._formValues.aula.diaDaSemana
                ? control._formValues.aula.diaDaSemana
                : ""}
            </Text>
          </View>

          <View style={styles.rowCenter}>
            <TouchableHighlight style={styles.buttonAlert} onPress={handle}>
              <Text style={[styles.buttonText, styles.textColorWhite]}>
                Excluir Aula
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ModalComponent>
    );
};

export default VerAula;
