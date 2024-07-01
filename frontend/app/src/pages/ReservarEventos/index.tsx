// Componentes
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import InputDate from "../../components/InputDate";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Funções
import functionLib from "../../services/functions";
import API from "../../services/API";

// Tipos
import styles from "../../styles";

// Firmulario
import { useForm } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stack.routes";

type FormInputs = {
  local: string;
  nome: string;
  data: Date;
  inicio: string;
  fim: string;
  descricao: string;
};

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ReservarEventos"
>;

export default function ReservarEventos(options: any) {
  const utils = new functionLib();
  const navigator = useNavigation<ScreenNavigationProp>();

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
    const aulashorarios = utils.arrayAulas();
    aulashorarios.map((item, index) => {
      if (
        utils.comparaHorario(
          control._formValues.inicio,
          utils.toHours(item)
        ) <= 0 &&
        utils.comparaHorario(control._formValues.fim, utils.toHours(item)) >
          0
      ) {
        const data_inicio = utils.concatenaDataHora(
          control._formValues.data,
          utils.toHours(item)
        );
        const data_fim = utils.concatenaDataHora(
          control._formValues.data,
          utils.toHours(utils.arrayAulas()[index + 1])
        );

        API.post("/eventos", {
          nome: control._formValues.nome,
          local: control._formValues.local
            ? local_list.filter(
                (item) => Number(item.id) === Number(control._formValues.local)
              )[0]
            : null,
          dataInicio: new Date(data_inicio),
          dataFim: new Date(data_fim),
          descricao: control._formValues.descricao,
        })
          .then(() => {
            control._reset();
            navigator.navigate("Consultar");
          })
          .catch((error) => {
            alert(error.response.data);
          });
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.expand}>
          <View
            style={[styles.contentReservar, styles.listBox, styles.marginTop]}
          >
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
                    onValueChange={(target: any) => [
                      setValue("inicio", target),
                    ]}
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
                <TouchableHighlight style={styles.textFocus} onPress={onSubmit}>
                  <Text>Salvar</Text>
                </TouchableHighlight>
              </View>
            </form>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
