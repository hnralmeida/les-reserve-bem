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
import { Picker } from "@react-native-picker/picker";
import AdicionarDisciplina from "../../components/AdicionarDisciplina";
import { set, useForm } from "react-hook-form";
import ActivateModalButton from "../../components/ButtonAddModal";
import { tipoDisciplinaList } from "../../types";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
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
  const [edited_nome, set_edited_nome] = useState(""); // Estado para armazenar o nome editado
  const [edited_sigla, set_edited_sigla] = useState(""); // Estado para armazenar o nome editado
  const [edited_carga_Horaria, set_edited_carga_Horaria] = useState(""); // Estado para armazenar o nome editado
  const [edited_tipo_disciplina, set_edited_tipo_disciplina] = useState(""); // Estado para armazenar o nome editado
  const [edited_coordenadoria, set_edited_coordenadoria] = useState(0); // Estado para armazenar o nome editado

  useFocusEffect(
    React.useCallback(() => {
      API.get("/disciplinas")
        .then((response) => {
          set_disciplina_list(response.data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            set_coordenadoria_list(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_editing_index(index); // Atualiza o índice do item sendo editado
    set_edited_nome(disciplina_list[index].nome); // Preenche o campo de edição com o nome atual do item
    set_edited_sigla(disciplina_list[index].sigla); // Preenche o campo de edição com o nome atual do item
    set_edited_carga_Horaria(disciplina_list[index].cargaHoraria); // Preenche o campo de edição com o nome atual do item
    set_edited_tipo_disciplina(disciplina_list[index].tipoDisciplina); // Preenche o campo de edição com o nome atual do item)
    set_edited_coordenadoria(disciplina_list[index].coordenadoria.id); // Preenche o campo de edição com o nome atual do item
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

  const handleSaveEdit = (index: any) => {
    if (edited_nome.trim() !== "") {
      API.put("/disciplinas/" + disciplina_list[index].id, {
        nome: edited_nome,
        sigla: edited_sigla,
        cargaHoraria: edited_carga_Horaria,
        tipoDisciplina: edited_tipo_disciplina,
        coordenadoria: coordenadoria_list.filter(
          (item) => item.id == edited_coordenadoria
        )[0],
      }).then(() => {
        // Atualiza o item na lista
        disciplina_list[index].nome = edited_nome;
        disciplina_list[index].sigla = edited_sigla;
        disciplina_list[index].cargaHoraria = edited_carga_Horaria;
        disciplina_list[index].tipoDisciplina = edited_tipo_disciplina;
        disciplina_list[index].coordenadoria = coordenadoria_list.filter(
          (item) => item.id == edited_coordenadoria
        )[0];

        set_editing_index(null); // Limpa o índice do item sendo editado
        set_edited_nome("");
        set_edited_sigla("");
        set_edited_carga_Horaria("");
        set_edited_tipo_disciplina("");
        set_edited_coordenadoria(0);
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarDisciplina
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            disciplinaList={disciplina_list}
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
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>
        {/* Lista de professores */}
        <ScrollView style={styles.listBox}>
          {disciplina_list.length > 0 ? (
            disciplina_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/coordenadorias.png")}
                  style={styles.iconElement}
                />

                {editing_index === index ? (
                  [
                    <View style={[styles.column, styles.row6]}>
                      <Text>Disciplina</Text>
                      <TextInput
                        style={[styles.input]}
                        value={edited_nome}
                        onChangeText={set_edited_nome}
                      />
                    </View>,
                    <View style={[styles.column, styles.row6]}>
                      <Text>Carga Horária</Text>
                      <TextInput
                        style={[styles.input]}
                        value={edited_carga_Horaria}
                        onChangeText={set_edited_carga_Horaria}
                      />
                    </View>,
                  ]
                ) : (
                  <Text style={styles.textLabel}>
                    {item.nome} ({item.cargaHoraria}H)
                  </Text>
                )}

                {editing_index === index ? (
                  <View style={[styles.column, styles.row6]}>
                    <Text>Sigla</Text>
                    <TextInput
                      style={[styles.input]}
                      value={edited_sigla}
                      onChangeText={set_edited_sigla}
                    />
                  </View>
                ) : (
                  <Text style={styles.textLabel}>{item.sigla}</Text>
                )}

                {editing_index === index ? (
                  <View style={[styles.column, styles.row6]}>
                    <Text>Tipo</Text>
                    <Picker
                      style={[styles.input]}
                      selectedValue={edited_tipo_disciplina}
                      onValueChange={(itemValue) =>
                        set_edited_tipo_disciplina(itemValue)
                      }
                    >
                      {tipoDisciplinaList.map((item, index) => (
                        <Picker.Item key={index} label={item} value={item} />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <Text style={styles.textLabel}>{item.tipoDisciplina}</Text>
                )}

                {editing_index === index ? (
                  <View style={[styles.column, styles.row6]}>
                    <Text>Coordenadoria</Text>
                    <Picker
                      style={[styles.input]}
                      placeholder="Coordenadoria"
                      selectedValue={edited_coordenadoria}
                      onValueChange={(itemValue) =>
                        set_edited_coordenadoria(itemValue)
                      }
                    >
                      <Picker.Item
                        key={"unselectable"}
                        style={styles.boxBorder}
                        label={"Selecione um tipo"}
                        value={0}
                      />
                      {coordenadoria_list.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nome}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <Text style={styles.textLabel}>
                    {item.coordenadoria.sigla}
                  </Text>
                )}

                {editing_index === index ? (
                  <SaveEdit
                    onCancel={() => set_editing_index(null)}
                    onSave={() => handleSaveEdit(index)}
                  />
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
              <Text style={styles.centerText}>
                Nenhuma disciplina cadastrada.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
