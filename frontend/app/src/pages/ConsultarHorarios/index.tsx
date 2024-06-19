import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { Children, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import dayjs, { Dayjs } from "dayjs";
import ModalComponent from "../../components/modal";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";
import functionLib from "../../services/functions";
import DateTimePicker from "react-native-ui-datepicker";
import InputDate from "../../components/InputDate";
import { PesquisaHorarios } from "../../components/PesquisaHorarios";

type FormInputs = {
  id: string;
  data: Date;
  input: string;
  inputAux1: string;
  modelo: string;
  horarios: string[];
};

const diasSemana = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
];

export default function ConsultarHorarios(options: any) {
  const select_horario = [
    "Aluno",
    "Professor",
    //"Periodo",
    "Locais",
    "Turma",
    //"Data",
  ];

  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: "",
      data: new Date(),
      input: "",
      modelo: "",
    },
  });

  const [list_aulas, set_list_aulas] = useState<any[]>([]);
  const [list_alunos, set_list_alunos] = useState<any[]>([]);
  const [list_locais, set_list_locais] = useState<any[]>([]);
  const [list_disciplinas, set_list_disciplinas] = useState<any[]>([]);
  const [list_turmas, set_list_turmas] = useState<any[]>([]);
  const [list_periodos, set_list_periodos] = useState<any[]>([]);
  const [list_professores, set_list_professores] = useState<any[]>([]);

  const utils = new functionLib();

  useFocusEffect(
    useCallback(() => {
      setValue("horarios", utils.arrayHorarios());
      API.get("/locais").then((response) => {
        set_list_locais(response.data);
      });
      API.get("/disciplinas").then((response) => {
        set_list_disciplinas(response.data);
      });
      API.get("/turmas").then((response) => {
        set_list_turmas(response.data);
      });
      API.get("/professores").then((response) => {
        set_list_professores(response.data);
      });
      API.get("/periodos").then((response) => {
        set_list_periodos(response.data);
      });
    }, [])
  );

  function fillCell(dia: any, horario: any): string {
    const aula = list_aulas
      ? list_aulas.find(
          (aula) =>
            aula.diaDaSemana == dia &&
            aula.horaInicio == control._formValues.horarios[horario]
        )
      : null;
    return aula ? aula.disciplina.sigla + "\n" + aula.professor.nome : "";
  }

  function line1define(): string {
    switch (control._formValues.modelo) {
      case "Aluno":
        return list_alunos.filter(
          (aluno) => aluno.id == control._formValues.input
        )[0]?.nome;
      case "Professor":
        return list_professores.filter(
          (professor) => professor.id == control._formValues.input
        )[0]?.nome;
      case "Locais":
        return list_locais.filter(
          (local) => local.id == control._formValues.input
        )[0]?.nomeLocal;
      case "Turma":
        return list_turmas.filter(
          (turma) => turma.id == control._formValues.input
        )[0]?.nome;
    }
    return "";
  }

  function line2define(): string {
    switch (control._formValues.modelo) {
      case "Aluno":
        return list_alunos.filter(
          (aluno) => aluno.id == control._formValues.input
        )[0]?.coordenadoria.nome;
      case "Professor":
        return list_professores.filter(
          (professor) => professor.id == control._formValues.input
        )[0]?.coordenadoria.nome;
      case "Locais":
      case "Turma":
        return list_periodos.find(
          (periodo) => periodo.id == control._formValues.inputAux1
        )[0]?.nome;
    }
    return "";
  }

  function line3define(): string {
    switch (control._formValues.modelo) {
      case "Aluno":
      case "Professor":
        return list_periodos.find(
          (periodo) => periodo.id == control._formValues.inputAux1
        )[0]?.nome;
        case "Locais":
          return list_locais.filter(
            (local) => local.id == control._formValues.input
          )[0]?.capacidade;
        case "Turma":
          return list_turmas.filter(
            (turma) => turma.id == control._formValues.input
          )[0]?.nome;
    }
    return "";
  }

  const GridHeader = ({ horarios }: any) => (
    <>
      <View style={[styles.row, { marginBottom: 0 }]}>
        <View style={styles.headerCell}>
          <Text style={[styles.headerText, styles.cellText]}> IFES </Text>
        </View>
        <View style={styles.headerCell}>
          <View style={styles.column}>
            {control._formValues.control?.input ? line1define() : ""}
            {control._formValues.control?.input ? line2define() : ""}
            {control._formValues.control?.input ? line3define() : ""}
          </View>
        </View>
      </View>
      <View style={[styles.row, { marginBottom: 0 }]}>
        <View style={styles.cell}>
          <Text style={styles.headerText}> </Text>
        </View>
        {horarios.map((horario: any, index: any) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.headerText}>{horario}</Text>
          </View>
        ))}
      </View>
    </>
  );

  const GridRow = ({ dia, horarios }: any) => (
    <View style={[styles.row, { marginBottom: 0 }]}>
      <View style={[styles.cell, { height: 64 }]}>
        <Text style={styles.cellText}>{dia}</Text>
      </View>
      {horarios.map((_: any, index: any) => (
        <View key={index} style={[styles.cell, { height: 64, width: 48 }]}>
          <Text style={styles.cellText}>{fillCell(dia, index)}</Text>
        </View>
      ))}
    </View>
  );

  const onSubmit = () => {
    switch (control._formValues.modelo) {
      case "Aluno":
        API.get("/aulas/aluno/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        }).then((response) => {
          set_list_alunos(response.data);
          console.log(response.data);
        });
        break;
      case "Professor":
        break;
      case "Locais":
        API.get("/aulas/local/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        }).then((response) => {
          set_list_aulas(response.data);
          console.log(response.data);
        });
        break;
      case "Turma":
        API.get("/aulas/turma/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        }).then((response) => {
          set_list_aulas(response.data);
          console.log(response.data);
        });
        break;
      case "Data":
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={[
            styles.row,
            styles.padmargin,
            { justifyContent: "flex-start" },
          ]}
        >
          <Picker
            selectedValue={watch("modelo")}
            style={[styles.boxBorder, styles.marginRight]}
            placeholder="modelo"
            onValueChange={(itemValue: string) => {
              setValue("modelo", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Selecione uma consulta"}
              value={0}
            />
            {select_horario.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

          {control._formValues.modelo != "" && control._formValues.modelo ? (
            <View style={[styles.row, { marginBottom: 0 }]}>
              <View style={[{ marginRight: 32 }]}>
                <>
                  <PesquisaHorarios
                    control={control}
                    setValue={setValue}
                    modelo={control._formValues.modelo}
                    watch={watch}
                    list_periodos={list_periodos}
                    list_locais={list_locais}
                    list_turmas={list_turmas}
                  />
                </>
              </View>

              <View style={[styles.column, { marginBottom: 16 }]}>
                <TouchableHighlight
                  style={[styles.button, { width: 128 }]}
                  onPress={onSubmit}
                >
                  <Text style={styles.textColorWhite}> Buscar </Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : null}
        </View>

        {control._formValues.modelo != "" && control._formValues.modelo ? (
          <ScrollView style={styles.listBox}>
            <GridHeader horarios={control._formValues.horarios} />
            {diasSemana.map((dia, index) => (
              <GridRow
                key={index}
                dia={dia}
                horarios={control._formValues.horarios}
              />
            ))}
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
