import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import styles from "../../styles";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import InputDate from "../../components/InputDate";
import functionLib from "../../services/functions";
import ButtonText from "../../components/ButtonText";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";
import ActivateModalButton from "../../components/ButtonAddModal";
import AdicionarCoordenadoria from "../../components/AdicionarCoordenadoria";
import AdicionarPeriodo from "../../components/AdicionarPeriodo";

type FormInputs = {
  id: string;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
};

export default function CadastrarPeriodo(options: any) {
  const [periodo_list, set_periodo_list] = useState<any[]>([]);
  const [editing_index, set_editing_index] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [modal_visible, set_modal_visible] = useState(false);

  // input
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
      dataInicio: new Date(),
      dataFim: new Date(),
    },
  });

  const utils = new functionLib();

  useFocusEffect(
    React.useCallback(() => {
      API.get("/periodos")
        .then((response) => {
          const data = response.data;
          // sort in alphabetical order
          data.sort((a: any, b: any) => {
            return a.nome.localeCompare(b.nome);
          });
          set_periodo_list(data);
        })
        .catch((error) => {
          alert("Erro ao carregar os dados. " + error);
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_modal_visible(true);
    set_editing_index(index); // Atualiza o índice do item sendo editado
    setValue("id", periodo_list[index].id); // Preenche o campo de edição com o nome atual do item
    setValue("nome", periodo_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("dataInicio", periodo_list[index].dataInicio);
    setValue("dataFim", periodo_list[index].dataFim);
  };

  const handleDelete = (id: any) => {
    API.delete("/periodos/" + id).then(() => {
      set_periodo_list(periodo_list.filter((item) => item.id !== id));
    });
  };

  function onClose() {
    setValue("nome", ""); // Limpa os campos de input
    setValue("dataInicio", new Date()); // Limpa os campos de input
    setValue("dataFim", new Date()); // Limpa os campos de input
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarPeriodo
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => {
              set_modal_visible(!modal_visible), onClose();
            }}
            control={control}
            watch={watch}
            setValue={setValue}
            periodo_list={periodo_list}
            index={editing_index}
          />
          <ActivateModalButton
            modal_visible={modal_visible}
            set_modal_visible={set_modal_visible}
            text={"Periodo"}
          />
        </View>

        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/professores.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Período</Text>
          <Text style={[styles.text, styles.row6]}>Início</Text>
          <Text style={[styles.text, styles.row6]}>Fim</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
        </View>
        {/* Lista de periodos */}
        <ScrollView style={styles.listBox}>
          {set_periodo_list.length > 0 ? (
            periodo_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/semestres.png")}
                  style={styles.iconElement}
                />
                <Text style={styles.textLabel}>{item.nome}</Text>
                <Text style={styles.textLabel}>
                  {utils.toReadableDate(item.dataInicio)}
                </Text>
                <Text style={styles.textLabel}>
                  {utils.toReadableDate(item.dataFim)}
                </Text>
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
              <Text style={styles.centerText}>Nenhum Período cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
