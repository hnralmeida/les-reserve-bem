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
import AdicionarCoordenador from "../../components/AdicionarCoordenador";
import ActivateModalButton from "../../components/ButtonAddModal";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  nome: string;
  matricula: string;
  coordenadoria: string;
  email: string;
};

export default function Cadastrarcoordenador(options: any) {
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

  const [coordenadorList, setcoordenadorList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(""); // Estado para armazenar o nome editado
  const [editedMatricula, setEditedMatricula] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedCoordenadoria, setEditedCoordenadoria] = useState(0); // Estado para armazenar o nome editado

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela
      API.get("/coordenadores").then((response) => {
        const data = response.data;
        // sort in alphabetical order
        data.sort((a: any, b: any) => {
          return a.nome.localeCompare(b.nome);
        });
        setcoordenadorList(data);
      });
    }, [])
  );

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("nome", coordenadorList[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("matricula", coordenadorList[index].matricula);
    setValue("email", coordenadorList[index].email);
  };

  const handleDelete = (id: any) => {
    API.delete("/coordenadores/" + id).then(() => {
      setcoordenadorList(coordenadorList.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coordenador

    if (control._formValues.nome.trim() !== "") {
      API.put("/coordenadores/" + coordenadorList[index].id, {
        nome: control._formValues.nome,
        matricula: control._formValues.matricula,
        email: control._formValues.email,
      }).then(() => {
        coordenadorList[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        coordenadorList[index].matricula = control._formValues.matricula;
        coordenadorList[index].email = control._formValues.email;

        setValue("nome", "");
        setValue("matricula", "");
        setValue("email", "");

        setEditingIndex(null); // Limpa o índice do item sendo editado
      });
    } else {
      // Handle empty equipment name
      console.error("coordenador não pode ser vazio.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarCoordenador
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            coordenadorList={coordenadorList}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"coordenador"}
          />
        </View>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/turno.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Matricula</Text>
          <Text style={[styles.text, styles.row6]}>Email</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>

        {/* Lista de coordenadores */}
        <ScrollView style={styles.listBox}>
          {coordenadorList.length > 0 ? (
            coordenadorList.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/turno.png")}
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
                Nenhum coordenador cadastrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
