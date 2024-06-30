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
import AdicionarProfessor from "../../components/AdicionarProfessor";
import ActivateModalButton from "../../components/ButtonAddModal";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  id: string;
  nome: string;
  matricula: string;
  coordenadoria: string;
  email: string;
  rfid: string;
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
      id: "",
      nome: "",
      matricula: "",
      coordenadoria: "",
      email: "",
      rfid: "",
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const [coordenadoriaList, setCoordenadoriaList] = useState<any[]>([]);
  const [professorList, setProfessorList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela
      API.get("/professores")
        .then((response) => {
          const data = response.data;
          // sort in alphabetical order
          data.sort((a: any, b: any) => {
            return a.nome.localeCompare(b.nome);
          });
          setProfessorList(data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            setCoordenadoriaList(response.data);
          });
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    setIsVisible(true);
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("id", professorList[index].id);
    setValue("nome", professorList[index].nome);
    setValue("matricula", professorList[index].matricula);
    setValue("email", professorList[index].email);
    setValue("rfid", professorList[index].rfid);
    setValue("coordenadoria", professorList[index].coordenadoria.id);
  };

  const handleDelete = (id: any) => {
    API.delete("/professores/" + id).then(() => {
      setProfessorList(professorList.filter((item) => item.id !== id));
    });
  };

  function onClose() {
    setEditingIndex(null);
    setValue("id", "");
    setValue("nome", "");
    setValue("matricula", "");
    setValue("email", "");
    setValue("rfid", "");
    setValue("coordenadoria", "");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarProfessor
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => {
              setIsVisible(!isVisible), onClose();
            }}
            watch={watch}
            control={control}
            setValue={setValue}
            professorList={professorList}
            coordenadoriaList={coordenadoriaList}
            index={editingIndex}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Professor"}
          />
        </View>
        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/professores.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Matricula</Text>
          <Text style={[styles.text, styles.row6]}>Email</Text>
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
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

                <Text style={styles.textLabel}>{item.nome}</Text>

                <Text style={styles.textLabel}>{item.matricula}</Text>

                <Text style={styles.textLabel}>{item.email}</Text>

                <Text style={styles.textLabel}>
                  {item.coordenadoria
                    ? item.coordenadoria.nome
                    : "Sem coordenadoria"}
                </Text>

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
                Nenhum professor cadastrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
