import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import styles from "../../styles";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import InputDate from "../../components/InputDate";
import dayjs, { Dayjs } from "dayjs";
import functionLib from "../../services/functions";
import ButtonText from "../../components/ButtonText";

export default function CadastrarPeriodo(options: any) {
  const [periodo_titulo, set_periodo_titulo] = useState("");
  const [data_evento_inicio, set_data_evento_inicio] = useState<Dayjs>(dayjs());
  const [data_evento_fim, set_data_evento_fim] = useState<Dayjs>(dayjs());
  const [periodo_list, set_periodo_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [edited_name, set_edited_name] = useState(""); // Estado para armazenar o nome editado
  const [edited_inicio, set_edited_inicio] = useState(dayjs());
  const [edited_fim, set_edited_fim] = useState(dayjs());

  const utils = new functionLib();

  useFocusEffect(
    React.useCallback(() => {
      API.get("/periodos").then((response) => {
        set_periodo_list(response.data);
      });
    }, [])
  );

  const handleRegister = () => {
    console.log(data_evento_fim.toISOString());
    // Check if the equipment name is not empty before registering
    if (periodo_titulo.trim() !== "") {
      API.post("/periodos", {
        nome: periodo_titulo,
        data_inicio: data_evento_inicio.toISOString(),
        data_fim: data_evento_fim.toISOString(),
      }).then((response: any) => {
        set_periodo_titulo("");
        set_edited_inicio(dayjs());
        set_edited_fim(dayjs());

        console.log(response.data);
        periodo_list.push(response.data[0]);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome do equipmento não pode estar vazio.");
    }
  };

  const handleEdit = (index: any) => {
    set_editing_index(index); // Atualiza o índice do item sendo editado
    set_edited_name(periodo_list[index].nome); // Preenche o campo de edição com o nome atual do item
    set_edited_inicio(dayjs(periodo_list[index].data_inicio));
    console.log(periodo_list[index].data_inicio);
    set_edited_fim(dayjs(periodo_list[index].data_fim));
    console.log(periodo_list[index].data_fim);
  };

  const handleDelete = (id: any) => {
    API.delete("/periodos/" + id).then(() => {
      set_periodo_list(periodo_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    console.log(edited_inicio.toISOString());
    if (edited_name.trim() !== "") {
      API.put("/periodos/" + periodo_list[index].id, {
        nome: edited_name,
        data_inicio: edited_inicio.toISOString(),
        data_fim: edited_fim.toISOString(),
      }).then(() => {
        set_periodo_titulo("");
        periodo_list[index].nome = edited_name; // Atualiza o nome do item na lista

        set_editing_index(null); // Limpa o índice do item sendo editado
        set_edited_name(""); // Limpa o nome editado
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Período (Ano/Semestre) </Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Período (Ano/Semestre) "
          value={periodo_titulo}
          onChangeText={(text) => set_periodo_titulo(text)}
        />

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Início: </Text>
            <InputDate
              data_evento={data_evento_inicio}
              set_data_evento={set_data_evento_inicio}
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Fim: </Text>
            <InputDate
              data_evento={data_evento_fim}
              set_data_evento={set_data_evento_fim}
            />
          </View>
        </View>

        <ButtonText handle={handleRegister} text="Salvar" />

        {/* Lista de periodos */}
        <ScrollView style={styles.listBox}>
          {set_periodo_list.length > 0 ? (
            periodo_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/semestres.png")}
                  style={styles.iconElement}
                />

                {editing_index === index
                  ? [
                      <TextInput
                        style={styles.boxBorder}
                        value={edited_name}
                        onChangeText={set_edited_name}
                      />,
                      <InputDate
                        data_evento={edited_inicio}
                        set_data_evento={set_edited_inicio}
                      />,
                      <InputDate
                        data_evento={edited_fim}
                        set_data_evento={set_edited_fim}
                      />,
                    ]
                  : [
                      <Text style={styles.textLabel}>{item.nome}</Text>,
                      <Text style={styles.textLabel}>
                        {utils.toReadableDate(item.data_inicio)}
                      </Text>,
                      <Text style={styles.textLabel}>
                        {utils.toReadableDate(item.data_fim)}
                      </Text>,
                    ]}

                {editing_index === index ? (
                  <View style={styles.rowCenter}>
                    <ButtonText
                      handle={() => handleSaveEdit(index)}
                      text="Salvar"
                    />
                  </View>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.textActions}
                      onPress={() => handleEdit(index)}
                    >
                      <Image
                        source={require("../../../assets/edit.png")}
                        style={styles.iconElement}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.textActions}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Image
                        source={require("../../../assets/delete.png")}
                        style={styles.iconElement}
                      />
                    </TouchableOpacity>
                  </>
                )}
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
