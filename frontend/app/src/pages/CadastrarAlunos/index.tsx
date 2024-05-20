import React, { useState } from "react";
import styles from "../../styles";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import ImportModal from "../../components/ImportFile";
import { useForm } from "react-hook-form";
import API from "../../services/API";
import AdicionarAluno from "../../components/AdicionarAluno";
import ActivateModalButton from "../../components/ButtonAddModal";
import { Picker } from "@react-native-picker/picker";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  nome: string;
  matricula: string;
  coordenadoria: string;
  email: string;
};

export default function CadastrarAluno(options: any) {
  const [coordenadoria_list, set_coordenadoria_list] = useState<any[]>([]);
  const [aluno_list, set_aluno_list] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado

  const [isVisible, setIsVisible] = useState(false);
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
      matricula: "",
      coordenadoria: "",
      email: "",
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela
      API.get("/alunos")
        .then((response) => {
          set_aluno_list(response.data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            set_coordenadoria_list(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("nome", aluno_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("matricula", aluno_list[index].matricula);
    setValue("email", aluno_list[index].email);
    setValue(
      "coordenadoria",
      aluno_list[index].coordenadoria
        ? aluno_list[index].coordenadoria.id
        : null
    );
  };

  const handleDelete = (id: any) => {
    API.delete("/alunos/" + id).then(() => {
      set_aluno_list(aluno_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    if (control._formValues.nome.trim() !== "") {
      API.put("/alunos/" + aluno_list[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: coordenadoria_list.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
        email: control._formValues.email,
      }).then(() => {
        aluno_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        aluno_list[index].coordenadoria = coordenadoria_list.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0]; // Atualiza o nome do item na lista
        aluno_list[index].matricula = control._formValues.matricula;
        aluno_list[index].email = control._formValues.email;

        setValue("nome", "");
        setValue("matricula", "");
        setValue("email", "");
        setValue("coordenadoria", "");

        setEditingIndex(null); // Limpa o índice do item sendo editado
      });
    } else {
      // Handle empty equipment name
      console.error("Alunos não pode ter campos vazios.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarAluno
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            alunoList={aluno_list}
            coordenadoriaList={coordenadoria_list}
          />

          <TouchableHighlight
            style={[styles.iconButton, { marginRight: 16 }]}
            onPress={() => alert("Função ainda precisa ser revisada.")}
          >
            <Text style={[styles.buttonText]}>Importar Arquivo</Text>
          </TouchableHighlight>

          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Aluno"}
          />
        </View>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/alunos.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Matricula</Text>
          <Text style={[styles.text, styles.row6]}>Email</Text>
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>

        {/* Lista de alunos */}
        <ScrollView style={styles.listBox}>
          {aluno_list.length > 0 ? (
            aluno_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/alunos.png")}
                  style={styles.iconElement}
                />

                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={watch("nome")}
                    onChangeText={(text) => setValue("nome", text)}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}

                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={watch("matricula")}
                    onChangeText={(text) => setValue("matricula", text)}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.matricula}</Text>
                )}

                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={watch("email")}
                    onChangeText={(text) => setValue("email", text)}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.email}</Text>
                )}

                {editingIndex === index ? (
                  <Picker
                    placeholder="Coordenadoria"
                    style={styles.input}
                    selectedValue={watch("coordenadoria")}
                    onValueChange={(itemValue: string) => {
                      setValue("coordenadoria", itemValue);
                    }}
                  >
                    <Picker.Item
                      key={"unselectable"}
                      label={"Selecione uma coordenadoria"}
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
                ) : (
                  <Text style={styles.textLabel}>
                    {item.coordenadoria
                      ? item.coordenadoria.nome
                      : "Sem coordenadoria"}
                  </Text>
                )}

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
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>
                Nenhum aluno cadastrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
