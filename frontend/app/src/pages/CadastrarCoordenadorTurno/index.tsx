import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
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
  id: string;
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
      id: "",
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
    setIsVisible(true);
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("id", coordenadorList[index].id);
    setValue("nome", coordenadorList[index].nome);
    setValue("matricula", coordenadorList[index].matricula);
    setValue("email", coordenadorList[index].email);
  };

  const handleDelete = (id: any) => {
    API.delete("/coordenadores/" + id).then(() => {
      setcoordenadorList(coordenadorList.filter((item) => item.id !== id));
    });
  };

  function onClose() {
    setValue("id", "");
    setValue("nome", "");
    setValue("matricula", "");
    setValue("email", "");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarCoordenador
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => {
              setIsVisible(!isVisible), onClose();
            }}
            watch={watch}
            control={control}
            setValue={setValue}
            coordenadorList={coordenadorList}
            index={editingIndex}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"coordenador"}
          />
        </View>
        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/turno.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Matricula</Text>
          <Text style={[styles.text, styles.row6]}>Email</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
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

                <Text style={styles.textLabel}>{item.nome}</Text>

                <Text style={styles.textLabel}>{item.matricula}</Text>

                <Text style={styles.textLabel}>{item.email}</Text>

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
