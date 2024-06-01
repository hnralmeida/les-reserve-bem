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
  local: string;
  nome: string;
  data: Date;
  inicio: string;
  fim: string;
  descricao: string;
};

export default function ReservarEventos(options: any) {
  const utils = new functionLib();

  const [local_list, set_local_list] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      local: "",
      nome: "",
      data: new Date(),
      inicio: "",
      fim: "",
      descricao: "",
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      API.get("/locais").then((response) => {
        set_local_list(response.data);
      });
    }, [])
  );

  const onSubmit = () => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coorde
    const data_inicio = utils.concatenaDataHora(
      control._formValues.data,
      control._formValues.inicio
    );
    const data_fim = utils.concatenaDataHora(
      control._formValues.data,
      control._formValues.fim
    );

    console.log(data_inicio, {
      nome: control._formValues.nome,
      local: control._formValues.local ? local_list.filter(
        (item) =>
          Number(item.id) === Number(control._formValues.local)
      )[0] : null,
      dataInicio: new Date(data_inicio),
      dataFim: new Date(data_fim),
      descricao: control._formValues.descricao,
    })

    API.post("/eventos", {
      nome: control._formValues.nome,
      local: control._formValues.local ? local_list.filter(
        (item) =>
          Number(item.id) === Number(control._formValues.local)
      )[0] : null,
      dataInicio: new Date(data_inicio),
      dataFim: new Date(data_fim),
      descricao: control._formValues.descricao,
    }).then(() => {
      control._reset();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.expand}>
        <View style={styles.contentReservar}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.label}>Nome: </Text>
                <TextInput
                  style={[styles.boxBorder]}
                  value={watch("nome")}
                  onChangeText={(text) => setValue("nome", text)}
                />
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>Local: </Text>
                <Picker
                  selectedValue={watch("local")}
                  style={styles.boxBorder}
                  placeholder="Local"
                  onValueChange={(itemValue: string) => {
                    setValue("local", itemValue);
                  }}
                >
                  <Picker.Item
                    key={"unselectable"}
                    label={"Selecione um local para o evento"}
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
                <Text style={styles.label}>Data: </Text>

                <InputDate
                  data_evento={watch("data")}
                  set_data_evento={setValue}
                  label_value={"data"}
                />
              </View>

              <View style={styles.column}>
                <Text style={styles.label}>Início: </Text>
                <Picker
                  onValueChange={(target: any) => [setValue("inicio", target)]}
                  selectedValue={watch("inicio")}
                  style={[styles.boxBorder]}
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

              <View style={styles.column}>
                <Text style={styles.label}>Fim: </Text>
                <Picker
                  onValueChange={(target: any) => [setValue("fim", target)]}
                  selectedValue={watch("fim")}
                  style={[styles.boxBorder]}
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
                <Text style={styles.label}>Observações</Text>
                <TextInput
                  style={styles.boxBorder}
                  multiline={true}
                  placeholder="Escrever observação..."
                  value={watch("descricao")}
                  onChangeText={(target) => setValue("descricao", target)}
                />
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
