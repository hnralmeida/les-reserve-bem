import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import styles from "../../styles";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";
import ModalComponent from "../../components/modal";
import InputDate from "../../components/InputDate";
import functionLib from "../../services/functions";
import { Picker } from "@react-native-picker/picker";

type FormInputs = {
  nome: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  local: string;
};

export default function ConsultarEventos(options: any) {
  const [evento_list, set_evento_list] = useState<any[]>([]);
  const [locais_list, set_locais_list] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [isVisible, setIsVisible] = useState(false);
  const utils = new functionLib();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      nome: "",
      descricao: "",
      dataInicio: new Date(),
      dataFim: new Date(),
      local: "",
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela
      API.get("/eventos")
        .then((response) => {
          set_evento_list(response.data);
        })
        .then(() => {
          API.get("/locais").then((response) => {
            set_locais_list(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("nome", evento_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("descricao", evento_list[index].descricao);
    setValue("dataInicio", evento_list[index].dataInicio);
    setValue("dataFim", evento_list[index].dataFim);
    setValue(
      "local",
      locais_list[index].local ? locais_list[index].local.id : null
    );
  };

  const handleDelete = (id: any) => {
    API.delete("/eventos/" + id).then(() => {
      set_evento_list(evento_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    if (control._formValues.nome.trim() !== "") {
      API.put("/alunos/" + evento_list[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: locais_list.filter(
          (item) => Number(item.id) === Number(control._formValues.local)
        )[0],
        email: control._formValues.email,
      }).then(() => {
        evento_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        evento_list[index].descricao = control._formValues.descricao;
        evento_list[index].dataInicio = control._formValues.dataInicio;
        evento_list[index].dataFim = control._formValues.dataFim;
        evento_list[index].local = locais_list.filter(
          (item) => Number(item.id) === Number(control._formValues.local)
        )[0]; // Atualiza o nome do item na lista

        setValue("nome", "");
        setValue("descricao", "");
        setValue("dataInicio", new Date());
        setValue("dataFim", new Date());
        setValue("local", "");

        setEditingIndex(null); // Limpa o índice do item sendo editado
      });
    } else {
      // Handle empty equipment name
      console.error("Evento não pode ter campos vazios.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/eventos.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Início</Text>
          <Text style={[styles.text, styles.row6]}>Fim</Text>
          <Text style={[styles.text, styles.row6]}>Local</Text>
          <Text style={[styles.text, styles.row6]}>Descrição</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>

        {/* Lista de eventos */}
        <ScrollView style={styles.listBox}>
          {evento_list.length > 0 ? (
            evento_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <View style={styles.listLine} key={index}>
                  <Image
                    source={require("../../../assets/eventos.png")}
                    style={styles.iconElement}
                  />

                  {editingIndex === index ? (
                    <TextInput
                      style={styles.input}
                      value={watch("nome")}
                      onChangeText={(text) => setValue("nome", text)}
                    />
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>{item.nome}</Text>
                  )}

                  {editingIndex === index ? (
                    <InputDate
                      data_evento={watch("dataInicio")}
                      label_value="dataInicio"
                      set_data_evento={setValue}
                    />
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {utils.toReadableDate(item.dataInicio)}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <InputDate
                      data_evento={watch("dataFim")}
                      label_value="dataFim"
                      set_data_evento={setValue}
                    />
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {utils.toReadableDate(item.dataFim)}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      placeholder="Local"
                      style={styles.input}
                      selectedValue={watch("local")}
                      onValueChange={(itemValue: string) => {
                        setValue("local", itemValue);
                      }}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione uma local"}
                        value={0}
                      />
                      {locais_list.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nome}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.local ? item.local.nomeLocal : "Sem local"}
                    </Text>
                  )}

                  <TouchableHighlight
                    style={[styles.buttonText, styles.row6]}
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    <Text style={[styles.text]}>Clique para ler</Text>
                  </TouchableHighlight>
                  <ModalComponent
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    onClose={() => setIsVisible(!isVisible)}
                  >
                    <View>
                      {editingIndex === index ? (
                        <>
                          <Text style={styles.title}>Descrição</Text>
                          <TextInput
                            style={styles.boxBorder}
                            placeholder="Descrição"
                            value={watch("descricao")}
                            onChangeText={(text) => setValue("descricao", text)}
                          />
                        </>
                      ) : (
                        <Text style={styles.textLabel}>{item.descricao}</Text>
                      )}
                    </View>
                  </ModalComponent>
                  {editingIndex === index ? (
                    <SaveEdit
                      onCancel={() => setEditingIndex(null)}
                      onSave={() => handleSaveEdit(index)}
                    />
                  ) : (
                    <>
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
                    </>
                  )}
                </View>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhum evento cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
