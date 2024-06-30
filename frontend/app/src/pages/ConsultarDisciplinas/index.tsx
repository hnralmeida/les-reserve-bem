import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../../styles";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import { Picker } from "@react-native-picker/picker";
import AdicionarDisciplina from "../../components/AdicionarDisciplina";
import { set, useForm } from "react-hook-form";
import ActivateModalButton from "../../components/ButtonAddModal";
import { tipoDisciplinaList } from "../../types";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  id: string;
  nome: string;
  cargaHoraria: string;
  tipoDisciplina: string;
  coordenadoria: any;
  sigla: string;
};

export default function ConsultarDisciplinas(options: any) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: "",
      nome: "",
      cargaHoraria: "",
      tipoDisciplina: "",
      coordenadoria: {},
      sigla: "",
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const [disciplina_list, set_disciplina_list] = useState<any[]>([]);
  const [coordenadoria_list, set_coordenadoria_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null); // Estado para rastrear o índice do item sendo editado

  useFocusEffect(
    React.useCallback(() => {
      API.get("/disciplinas")
        .then((response) => {
          const data = response.data;
          // sort in alphabetical order
          data.sort((a: any, b: any) => {
            return a.nome.localeCompare(b.nome);
          });
          set_disciplina_list(data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            set_coordenadoria_list(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    setIsVisible(true);

    set_editing_index(index); // Atualiza o índice do item sendo editado
    setValue("id", disciplina_list[index].id); // Preenche o campo de edição com o id atual do item
    setValue("nome", disciplina_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("sigla", disciplina_list[index].sigla); // Preenche o campo de edição com o nome atual do item
    setValue("cargaHoraria", disciplina_list[index].cargaHoraria); // Preenche o campo de edição com o nome atual do item
    setValue("tipoDisciplina", disciplina_list[index].tipoDisciplina); // Preenche o campo de edição com o nome atual do item)
    setValue("coordenadoria", disciplina_list[index].coordenadoria.id); // Preenche o campo de edição com o nome atual do item
  };

  const handleDelete = (id: any) => {
    API.delete("/disciplinas/" + id)
      .then(() => {
        set_disciplina_list(disciplina_list.filter((item) => item.id !== id));
      })
      .catch((error) => {
        alert("Não é possível deletar disciplina com aulas");
      });
  };

  function onClose() {
    set_editing_index(null); // Limpa o índice do item sendo editado
    setValue("nome", "");
    setValue("sigla", "");
    setValue("cargaHoraria", "");
    setValue("tipoDisciplina", "");
    setValue("coordenadoria", 0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarDisciplina
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => {
              setIsVisible(!isVisible), onClose();
            }}
            watch={watch}
            control={control}
            setValue={setValue}
            disciplina_list={disciplina_list}
            coordenadoria_list={coordenadoria_list}
            index={editing_index}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Disciplina"}
          />
        </View>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/coordenadorias.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Sigla</Text>
          <Text style={[styles.text, styles.row6]}>Currículo</Text>
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
        </View>
        {/* Lista de professores */}
        <ScrollView style={[styles.listBox]}>
          {disciplina_list.length > 0 ? (
            disciplina_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/coordenadorias.png")}
                  style={styles.iconElement}
                />

                <Text style={styles.textLabel}>
                  {item.nome} ({item.cargaHoraria}H)
                </Text>

                <Text style={styles.textLabel}>{item.sigla}</Text>

                <Text style={styles.textLabel}>{item.tipoDisciplina}</Text>

                <Text style={styles.textLabel}>{item.coordenadoria.sigla}</Text>

                <TouchableHighlight
                  style={styles.textActions}
                  onPress={() => handleEdit(index)}
                >
                  <Image
                    source={require("../../../assets/edit.png")}
                    style={styles.iconElement}
                  />
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.textActions}
                  onPress={() => handleDelete(item.id)}
                >
                  <Image
                    source={require("../../../assets/delete.png")}
                    style={styles.iconElement}
                  />
                </TouchableHighlight>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>
                Nenhuma disciplina cadastrada.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
