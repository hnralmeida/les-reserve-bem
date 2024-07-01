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
import { set, useForm } from "react-hook-form";
import functionLib from "../../services/functions";
import DateTimePicker from "react-native-ui-datepicker";
import InputDate from "../../components/InputDate";
import { PesquisaHorarios } from "../../components/PesquisaHorarios";
import { onPrint } from "../../components/PrintViewer";
import VerAula from "../../components/VerAula";

type aula = {
  disciplina: any;
  turma: any;
  professor: any;
  local: any;
  periodo: any;
  horaInicio: any;
  horaFim: any;
  diaDaSemana: string;
};

type FormInputs = {
  id: string;
  data: Date;
  input: string;
  inputAux1: string;
  modelo: string;
  horarios: string[];
  aula: aula;
};

const diasSemana = [
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
];

export default function ConsultarHorarios(options: any) {
  const select_horario = ["Aluno", "Professor", "Local", "Turma"];
  const [modal_visible, set_modal_visible] = useState<boolean>(false);
  const [index, set_index] = useState(0);

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
  const [list_locais, set_list_locais] = useState<any[]>([]);
  const [list_turmas, set_list_turmas] = useState<any[]>([]);
  const [list_periodos, set_list_periodos] = useState<any[]>([]);

  const utils = new functionLib();

  useFocusEffect(
    useCallback(() => {
      setValue("horarios", utils.arrayHorarios());
      API.get("/locais").then((response) => {
        set_list_locais(response.data);
      });

      API.get("/turmas").then((response) => {
        set_list_turmas(response.data);
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

  const GridHeader = ({ horarios }: any) => (
    <>
      <View style={[styles.row, { marginBottom: 0 }]}>
        <View style={styles.headerCell}>
          <Text style={[styles.headerText, styles.cellText]}> IFES </Text>
        </View>
        <View style={styles.headerCell}>
          <View style={[styles.column, { justifyContent: "center" }]}>
            <Text style={[styles.headerText, styles.cellText]}> Horário </Text>
            <Text style={[styles.headerText, styles.cellText]}>
              {control._formValues.modelo}{" "}
            </Text>
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

  function handlePress(dia: any, horario: any) {
    const aula = list_aulas
      ? list_aulas.find(
          (aula) =>
            aula.diaDaSemana == dia &&
            aula.horaInicio == control._formValues.horarios[horario]
        )
      : null;

    if (aula) {
      const aulas = list_aulas.filter(
        (item) =>
          item.disciplina.nome === aula.disciplina.nome &&
          item.professor.nome === aula.professor.nome &&
          item.diaDaSemana === aula.diaDaSemana
      );

      const primeiraAula = aulas.reduce(
        (min: aula, aula: aula, index: number) => {
          set_index(index);
          return aula.horaInicio < min.horaInicio ? aula : min;
        },
        aulas[0]
      );

      const ultimaAula =
        aulas.length > 0
          ? aulas.reduce(
              (max: aula, aula: aula) =>
                aula.horaFim > max.horaFim ? aula : max,
              aulas[0]
            )
          : null;

      setValue("aula", {
        disciplina: primeiraAula.disciplina,
        turma: primeiraAula.turma,
        professor: primeiraAula.professor,
        local: primeiraAula.local,
        periodo: primeiraAula.periodo,
        horaInicio: primeiraAula.horaInicio,
        horaFim: ultimaAula.horaFim,
        diaDaSemana: primeiraAula.diaDaSemana,
      });
      set_modal_visible(true);
    }
  }

  const GridRow = ({ dia, horarios }: any) => (
    <View style={[styles.row, { marginBottom: 0 }]}>
      <View style={[styles.cell, { height: 64 }]}>
        <Text style={styles.cellText}>{dia}</Text>
      </View>
      {horarios.map((_: any, index: any) => (
        <View key={index} style={[styles.cell, { height: 64, width: 48 }]}>
          <TouchableHighlight onPress={() => handlePress(dia, index)}>
            <Text style={styles.cellText}>{fillCell(dia, index)}</Text>
          </TouchableHighlight>
        </View>
      ))}
    </View>
  );

  const onSubmit = () => {
    switch (control._formValues.modelo) {
      case "Aluno":
        API.get("/aulas/aluno/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        })
          .then((response) => {
            set_list_aulas(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            set_list_aulas([]);
          });
        break;
      case "Professor":
        API.get("/aulas/professor/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        })
          .then((response) => {
            set_list_aulas(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            set_list_aulas([]);
          });
        break;
      case "Local":
        API.get("/aulas/local/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        })
          .then((response) => {
            set_list_aulas(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            set_list_aulas([]);
          });
        break;
      case "Turma":
        API.get("/aulas/turma/" + control._formValues.input, {
          params: { periodoId: control._formValues.inputAux1 },
        })
          .then((response) => {
            set_list_aulas(response.data);
          })
          .catch((error) => {
            set_list_aulas([]);
          });
        break;
      case "Data":
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {list_aulas.length > 0 ? (
        <TouchableHighlight
          style={styles.printButton}
          onPress={() =>
            onPrint({
              modelo: control._formValues.modelo,
              local: list_locais,
              turma: list_turmas,
              horarioIndividual: list_aulas,
            })
          }
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/printer.png")}
          />
        </TouchableHighlight>
      ) : null}
      <VerAula
        isVisible={modal_visible}
        setIsVisible={set_modal_visible}
        onClose={() => {
          set_modal_visible(false);
        }}
        watch={watch}
        control={control}
        setValue={setValue}
        aulasList={list_aulas}
        index={index}
      />
      <View style={styles.content}>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          <Picker
            selectedValue={watch("modelo")}
            style={[styles.boxBorder, styles.marginRight]}
            placeholder="modelo"
            onValueChange={(itemValue: string) => {
              setValue("modelo", itemValue);
              setValue("input", "");
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
