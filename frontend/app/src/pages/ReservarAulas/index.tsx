// Componentes
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import InputDate from "../../components/InputDate";
import { useFocusEffect } from "@react-navigation/native";

// Funções
import functionLib from "../../services/functions";
import API from "../../services/API";

// Tipos
import styles from "../../styles";

// Firmulario
import { set, useForm } from "react-hook-form";

type FormInputs = {
  disciplina: any;
  turma: any;
  professor: any;
  local: any;
  horaInicio: string;
  horaFim: string;
};

export default function ReservarEventos(options: any) {
  const utils = new functionLib();

  const [disciplina_list, set_disciplina_list] = useState<any[]>([]);
  const [local_list, set_local_list] = useState<any[]>([]);
  const [professor_list, set_professor_list] = useState<any[]>([]);
  const [turma_list, set_turma_list] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      disciplina: null,
      turma: null,
      professor: null,
      local: null,
      horaInicio: "",
      horaFim: "",
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      API.get("/locais")
        .then((response) => {
          const data = response.data;
          data.sort((a: any, b: any) => {
            return a.nomeLocal.localeCompare(b.nomeLocal);
          });
          set_local_list(data);
        })
        .then(() => {
          API.get("/turmas").then((response) => {
            const data = response.data;
            data.sort((a: any, b: any) => {
              return a.nome.localeCompare(b.nome);
            });
            set_turma_list(data);
          });
          API.get("/professores").then((response) => {
            const data = response.data;
            data.sort((a: any, b: any) => {
              return a.nome.localeCompare(b.nome);
            });
            set_professor_list(data);
          });
          API.get("/disciplinas").then((response) => {
            const data = response.data;
            data.sort((a: any, b: any) => {
              return a.nome.localeCompare(b.nome);
            });
            set_disciplina_list(data);
          });
        });
    }, [])
  );

  const onSubmit = () => {
    console.log({
      disciplina: disciplina_list.filter(
        (item) => Number(item.id) === Number(control._formValues.disciplina)
      )[0],
      turma: turma_list.filter(
        (item) => Number(item.id) === Number(control._formValues.turma)
      )[0],
      professor: professor_list.filter(
        (item) => Number(item.id) === Number(control._formValues.professor)
      )[0],
      local: local_list.filter(
        (item) => Number(item.id) === Number(control._formValues.local)
      )[0],
      horaInicio: control._formValues.horaInicio,
      horaFim: control._formValues.horaFim,
    });
    // API.post("/aulas", {
    //   disciplina: disciplina_list.filter(
    //     (item) => Number(item.id) === Number(control._formValues.disciplina)
    //   )[0],
    //   turma: turma_list.filter(
    //     (item) => Number(item.id) === Number(control._formValues.turma)
    //   )[0],
    //   professor: professor_list.filter(
    //     (item) => Number(item.id) === Number(control._formValues.professor)
    //   )[0],
    //   local: local_list.filter(
    //     (item) => Number(item.id) === Number(control._formValues.local)
    //   )[0],
    //   horaInicio: control._formValues.horaInicio,
    //   horaFim: control._formValues.horaFim,
    // }).then(() => {
    //   control._reset();
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.expand}>
        <View style={styles.contentReservar}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Disciplina: </Text>
                <Picker
                  selectedValue={watch("disciplina")}
                  style={styles.boxBorder}
                  placeholder="Disciplina"
                  onValueChange={(itemValue: string) => {
                    setValue("disciplina", itemValue);
                  }}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione uma Sala para a aula"}
                    value={0}
                  />
                  {disciplina_list.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.nome}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Sala: </Text>
                <Picker
                  selectedValue={watch("local")}
                  style={styles.boxBorder}
                  placeholder="Sala"
                  onValueChange={(itemValue: string) => {
                    setValue("local", itemValue);
                  }}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione uma Sala para a aula"}
                    value={0}
                  />
                  {local_list.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.nomeLocal}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Início: </Text>
                <Picker
                  onValueChange={(target: any) =>
                    setValue("horaInicio", target)
                  }
                  selectedValue={watch("horaInicio")}
                  style={[styles.boxBorder]}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione um Horário"}
                    value={0}
                  />
                  {utils.arrayAulas().map((item) => (
                    <Picker.Item
                      key={item.h + item.m}
                      label={utils.toHours(item)}
                      value={utils.toHours(item)}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.column}>
                <Text style={styles.label}>Fim: </Text>
                <Picker
                  style={[styles.boxBorder]}
                  selectedValue={watch("horaFim")}
                  onValueChange={(target: any) => [setValue("horaFim", target)]}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione um Horário"}
                    value={0}
                  />
                  {utils.arrayAulas().map((item, key) => (
                    <Picker.Item
                      key={key}
                      label={utils.toHours(item)}
                      value={utils.toHours(item)}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Turma: </Text>
                <Picker
                  selectedValue={watch("turma")}
                  style={styles.boxBorder}
                  placeholder="Sala"
                  onValueChange={(itemValue: string) => {
                    setValue("turma", itemValue);
                  }}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione uma Turma"}
                    value={0}
                  />
                  {turma_list.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.nome}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>

              <View style={styles.column}>
                <Text style={styles.label}>Professor: </Text>
                <Picker
                  selectedValue={watch("professor")}
                  style={styles.boxBorder}
                  placeholder="Sala"
                  onValueChange={(itemValue: string) => {
                    setValue("professor", itemValue);
                  }}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione um professor"}
                    value={0}
                  />
                  {professor_list.map((item, index) => (
                    <Picker.Item
                      key={index}
                      label={item.nome}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.rowCenter}>
              <TouchableOpacity style={styles.textFocus} onPress={onSubmit}>
                <Text>Salvar</Text>
              </TouchableOpacity>
            </View>
          </form>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
