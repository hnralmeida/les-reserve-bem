import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import dayjs, { Dayjs } from "dayjs";

export default function ConsultarHorarios(options: any) {
  const select_horario = [
    "Aluno",
    "Professor",
    "Semestre",
    "Sala",
    "Turma",
    "Data",
  ];
  const [modelo, set_modelo] = useState("");
  const [inputSearch, set_inputSearch] = useState("");
  const [list_eventos, set_list_eventos] = useState<any[]>([]);
  const [list_locais, set_list_locais] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [edited_nome, set_edited_nome] = useState(""); // Estado para armazenar o nome editado
  const [edited_local, set_edited_local] = useState(0); // Estado para armazenar o nome editado
  const [edited_observacao, set_edited_observacao] = useState(""); // Estado para armazenar o nome editado
  const [edited_inicio, set_edited_inicio] = useState(dayjs());
  const [edited_fim, set_edited_fim] = useState(dayjs());

  useFocusEffect(
    useCallback(() => {
      API.get("/eventos/")
        .then((response) => {
          set_list_eventos(response.data);
          console.log(response.data);
        })
        .then(() => {
          API.get("/locais/").then((response) => {
            set_list_locais(response.data);
          });
        });
    }, [])
  );

  function DependsOnModelo() {
    switch (modelo) {
      case "Aluno":
        return (
          <>
            <TextInput
              style={styles.boxBorder}
              placeholder="Código de barras"
              value={inputSearch}
              onChangeText={(text) => set_inputSearch(text)}
            />
          </>
        );
      case "Professor":
        return (
          <>
            <TextInput
              style={styles.boxBorder}
              placeholder="RFID"
              value={inputSearch}
              onChangeText={(text) => set_inputSearch(text)}
            />
          </>
        );
      case "Semestre":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione o Semestre"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione o Semestre"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Sala":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione uma sala"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione uma Sala"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Turma":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione um Curso"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione um Curso"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Data":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Escolha uma Sala"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione uma Sala"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      default:
        return <></>;
    }
  }

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    set_edited_nome(list_eventos[index].nome); // Preenche o campo de edição com o nome atual do item
    set_edited_local(list_eventos[index].id_local);
    set_edited_observacao(list_eventos[index].descricao);
  };

  const handleDelete = (id: any) => {
    API.delete("/eventos/" + id).then(() => {
      set_list_eventos(list_eventos.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coorde
    !edited_local
      ? set_edited_local(list_eventos[index].coordenadoria_id)
      : true;

    if (edited_nome.trim() !== "") {
      API.put("/eventos/" + list_eventos[index].id, {
        id_local: edited_local,
        nome: edited_nome,
        descricao: edited_observacao,
        data_inicio: edited_inicio,
        data_fim: edited_fim
      }).then(() => {
        list_eventos[index].nome = edited_nome; // Atualiza o nome do item na lista
        list_eventos[index].coordenadoria_id = edited_local; // Atualiza o nome do item na lista

        setEditingIndex(null); // Limpa o índice do item sendo editado
        set_edited_nome(""); // Limpa o nome editado
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  const onSubmit = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.spaced]}>
          <Picker
            selectedValue={modelo}
            style={styles.boxBorder}
            placeholder="modelo"
            onValueChange={(itemValue: string) => {
              set_modelo(itemValue);
            }}
          >
            {select_horario.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

          <DependsOnModelo />

          {modelo != "" && modelo ? (
            <View style={{ alignSelf: "center" }}>
              <TouchableHighlight style={styles.button} onPress={onSubmit}>
                <Text style={styles.textColorWhite}> Buscar </Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>

        {/* Listagem */}

        <ScrollView style={styles.column}>
          {list_eventos.length > 0 ? (
            list_eventos.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/eventos.png")}
                  style={styles.iconElement}
                />

                {editingIndex === index ? (
                  <TextInput
                    style={styles.boxBorder}
                    value={edited_nome}
                    onChangeText={set_edited_nome}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}
                {editingIndex === index ? (
                  <Picker
                    placeholder="Local"
                    style={styles.boxBorder}
                    onValueChange={(itemValue: string) => {
                      set_edited_local(Number(itemValue));
                    }}
                  >
                    {list_locais.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.nome}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                ) : (
                  <Text style={styles.textLabel}>
                    {
                      list_locais.find(
                        (obj) => Number(obj.id) == Number(item.id_local)
                      )?.nome
                    }
                  </Text>
                )}

                {editingIndex === index ? (
                  <TextInput
                    style={styles.boxBorder}
                    value={edited_observacao}
                    onChangeText={set_edited_observacao}
                    multiline={true}
                    numberOfLines={4}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.descricao}</Text>
                )}

                {editingIndex === index ? (
                  <TouchableOpacity
                    style={styles.textFocus}
                    onPress={() => handleSaveEdit(index)}
                  >
                    <Text>Salvar</Text>
                  </TouchableOpacity>
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
              <Text style={styles.centerText}>Nenhum horário selecionado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
