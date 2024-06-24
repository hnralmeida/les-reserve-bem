// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import ModalComponent from "../modal";

import styles from "../../styles";
import API from "../../services/API";
import { LoadingIcon } from "../LoadingIcon";
import { set, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from "../RadioButton";
import ButtonText from "../ButtonText";
import functionLib from "../../services/functions";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

type FormInputs = {
  turma: string;
  periodo: string;
  turmaList: any[];
  periodoList: any[];
  disciplinas: any[];
  diaDaSemana: string;
};

const ControleAulaAluno = ({ isVisible, setIsVisible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const utils = new functionLib();

  useFocusEffect(
    useCallback(() => {
      API.get("/turmas").then((response) => {
        setValue("turmaList", response.data);
      });
      API.get("/periodos").then((response) => {
        setValue("periodoList", response.data);
      });
    }, [])
  );

  function handleConsultar() {
    setLoading(true);
    API.get("/aulas/turma/" + control._formValues.turma, {
      params: {
        periodoId: watch("periodo"),
      },
    }).then((response) => {
      setValue("disciplinas", response.data);
      setLoading(false);
    });
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      turma: "",
      periodo: "",
      turmaList: [],
      periodoList: [],
      disciplinas: [],
    },
  });

  function getHorario(index: any): string {
    let horario = "";
    let disciplina = control._formValues.disciplinas;
    console.log(disciplina);

    if (disciplina.length > 0) {
      if (index < disciplina.length) {
        let i = index;
        while (
          i < disciplina.length &&
          disciplina[i].disciplina.nome == disciplina[index].disciplina.nome
        ) {
          i++;
        }
        horario =
          " - " +
          control._formValues.disciplinas[index].horaInicio +
          " às " +
          control._formValues.disciplinas[i - 1].horaFim;
      }
    }

    return horario;
  }

  function DisciplinaControl({ item, index }: any) {
    if (
      control._formValues.diaDaSemana == item.diaDaSemana &&
      (index == 0 ||
        (index > 0 &&
          control._formValues.disciplinas[index - 1].disciplina.nome !=
            control._formValues.disciplinas[index].disciplina.nome))
    ) {
      return (
        <View style={styles.rowStart}>
          <RadioButton selected={true} />
          <Text style={styles.paragraphText}>
            {item.disciplina.nome} - {item.professor.nome}
            {getHorario(index)}
          </Text>
        </View>
      );
    }
  }

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <View style={styles.row}>
          <Picker
            selectedValue={watch("turma")}
            style={[styles.boxBorder, { flex: 1, width: "30%" }]}
            onValueChange={(itemValue: string) => {
              setValue("turma", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Turma"}
              value={0}
            />
            {control._formValues.turmaList
              ? control._formValues.turmaList.map((item: any, index: any) => (
                  <Picker.Item key={index} label={item.nome} value={item.id} />
                ))
              : null}
          </Picker>

          <Picker
            selectedValue={watch("periodo")}
            style={[styles.boxBorder, { flex: 1, width: "30%" }]}
            onValueChange={(itemValue: string) => {
              setValue("periodo", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Periodo"}
              value={0}
            />
            {control._formValues.periodoList
              ? control._formValues.periodoList.map((item: any, index: any) => (
                  <Picker.Item key={index} label={item.nome} value={item.id} />
                ))
              : null}
          </Picker>

          <Picker
            style={[styles.boxBorder, { flex: 1, width: "30%" }]}
            selectedValue={watch("diaDaSemana")}
            onValueChange={(target: any) => [setValue("diaDaSemana", target)]}
          >
            <Picker.Item key={"unselectable"} label={"Dia"} value={0} />
            {utils.arrayDiasDaSemana().map((item, key) => (
              <Picker.Item key={key} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCenter}>
          <ButtonText text="Consultar" handle={handleConsultar} />
        </View>

        <View style={styles.column}>
          {control._formValues.disciplinas.length > 0
            ? control._formValues.disciplinas.map((item: any, index: any) => (
                <DisciplinaControl key={index} item={item} index={index} />
              ))
            : null}
        </View>
      </>
    </ModalComponent>
  );
};

export default ControleAulaAluno;
