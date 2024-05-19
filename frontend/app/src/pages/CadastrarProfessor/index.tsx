import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import styles from "../../styles";
import React, { useEffect, useState } from "react";
import API from "../../services/API";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { set, useForm } from "react-hook-form";
import AdicionarProfessor from "../../components/AdicionarProfessor";
import ActivateModalButton from "../../components/ButtonActiveteModal";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  nome: string;
  matricula: string;
  coordenadoria: string;
  email: string;
};

export default function CadastrarProfessor(options: any) {
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
  const [isVisible, setIsVisible] = useState(false);

  const [coordenadoriaList, setCoordenadoriaList] = useState<any[]>([]);
  const [professorList, setProfessorList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(""); // Estado para armazenar o nome editado
  const [editedMatricula, setEditedMatricula] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedCoordenadoria, setEditedCoordenadoria] = useState(0); // Estado para armazenar o nome editado

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela
      API.get("/professores")
        .then((response) => {
          setProfessorList(response.data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            setCoordenadoriaList(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("nome", professorList[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("matricula", professorList[index].matricula);
    setValue("email", professorList[index].email);
    setValue("coordenadoria", professorList[index].coordenadoria?professorList[index].coordenadoria.id:null);
  };

  const handleDelete = (id: any) => {
    API.delete("/professores/" + id).then(() => {
      setProfessorList(professorList.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coorde
    !editedCoordenadoria
      ? setEditedCoordenadoria(professorList[index].coordenadoria_id)
      : true;

    if (control._formValues.nome.trim() !== "") {
      API.put("/professores/" + professorList[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        coordenadoria: coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0],
        email: control._formValues.email,
      }).then(() => {
        professorList[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        professorList[index].coordenadoria = coordenadoriaList.filter(
          (item) =>
            Number(item.id) === Number(control._formValues.coordenadoria)
        )[0]; // Atualiza o nome do item na lista
        professorList[index].matricula = control._formValues.matricula;
        professorList[index].email = control._formValues.email;

        setValue("nome", "");
        setValue("matricula", "");
        setValue("email", "");
        setValue("coordenadoria", "");
        
        setEditingIndex(null); // Limpa o índice do item sendo editado
      });
    } else {
      // Handle empty equipment name
      console.error("Professor não pode ser vazio.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarProfessor
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            professorList={professorList}
            coordenadoriaList={coordenadoriaList}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Professor"}
          />
        </View>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/professores.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Matricula</Text>
          <Text style={[styles.text, styles.row6]}>Email</Text>
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>

        {/* Lista de professores */}
        <ScrollView style={styles.listBox}>
          {professorList.length > 0 ? (
            professorList.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/professores.png")}
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
                    {coordenadoriaList.map((item, index) => (
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
                Nenhum professor cadastrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
