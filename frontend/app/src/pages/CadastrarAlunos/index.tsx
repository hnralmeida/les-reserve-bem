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
import { useForm } from "react-hook-form";
import API from "../../services/API";
import AdicionarAluno from "../../components/AdicionarAluno";
import ActivateModalButton from "../../components/ButtonAddModal";
import { Picker } from "@react-native-picker/picker";
import SaveEdit from "../../components/SaveEdit";
import UploadArquivo from "../../components/UploadArquivo";
import ButtonVisibleModal from "../../components/ButtonVisibleModal";
import ControleAulaAluno from "../../components/ControleAulaAluno";

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

  const [modal_visible, set_modal_visible] = useState(false); // Estado para controlar a visibilidade do modal de importação de arquivo
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [isAulasVisible, setIsAulasVisible] = useState(false);
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
          const data = response.data;
          // sort in alphabetical order
          data.sort((a: any, b: any) => {
            return a.nome.localeCompare(b.nome);
          });
          set_aluno_list(data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            const data = response.data;
            // sort in alphabetical order
            data.sort((a: any, b: any) => {
              return a.nome.localeCompare(b.nome);
            });
            set_coordenadoria_list(data);
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
          <UploadArquivo
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => set_modal_visible(false)}
          />
          <View style={styles.marginRight}>
            <ActivateModalButton
              modal_visible={modal_visible}
              set_modal_visible={set_modal_visible}
              text={"Importar"}
            />
          </View>

          <AdicionarAluno
            isVisible={isUploadVisible}
            setIsVisible={setIsUploadVisible}
            onClose={() => setIsUploadVisible(!isUploadVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            alunoList={aluno_list}
            coordenadoriaList={coordenadoria_list}
          />

          <ActivateModalButton
            set_modal_visible={setIsUploadVisible}
            modal_visible={isUploadVisible}
            text={"Aluno"}
          />
        </View>
        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/alunos.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text]}>Nome</Text>
          <Text style={[styles.text]}>Matricula</Text>
          <Text style={[styles.text]}>Email</Text>
          <Text style={[styles.text]}>Coordenadoria</Text>
          <Text style={[styles.text]}>Aulas</Text>
          <Text style={[styles.text, { width: 128, marginRight: "6.25%" }]}>Ações</Text>
        </View>

        {/* Lista de alunos */}
        <ScrollView style={styles.listBox}>
          {aluno_list.length > 0 ? (
            aluno_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/alunos.png")}
                  style={[styles.iconElement]}
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

                <View style={[styles.textLabel, { width: "15%" }]}>
                  <ButtonVisibleModal
                    modal_visible={isAulasVisible}
                    set_modal_visible={setIsAulasVisible}
                    origin="aula"
                  />
                  <ControleAulaAluno
                    isVisible={isAulasVisible}
                    setIsVisible={setIsAulasVisible}
                    onClose={() => setIsAulasVisible(!isAulasVisible)}
                  />
                </View>

                {editingIndex === index ? (
                  <SaveEdit
                    onCancel={() => setEditingIndex(null)}
                    onSave={() => handleSaveEdit(index)}
                  />
                ) : (
                  <View style={[styles.row]}>
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
                )}
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhum aluno cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
