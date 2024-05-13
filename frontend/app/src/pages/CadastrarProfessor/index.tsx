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
import { useForm } from "react-hook-form";
import AdicionarProfessor from "../../components/AdicionarProfessor";
import ActivateModalButton from "../../components/ButtonActiveteModal";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  nome: string;
  matricula: string;
  coordenadoria: string;
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
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const [coordenadoriaList, setCoordenadoriaList] = useState<any[]>([]);
  const [professorList, setProfessorList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(""); // Estado para armazenar o nome editado
  const [editedMatricula, setEditedMatricula] = useState("");
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

  const handleRegister = () => {
    if (
      control._formValues.nome.trim() !== "" &&
      control._formValues.matricula.trim() !== ""
    ) {
      API.post("/professores", {
        nome: control._formValues.nome,
        coordenadoria_id: Number(control._formValues.coordenadoria),
        matricula: control._formValues.matricula,
      }).then((response: any) => {
        setValue("nome", "");
        setValue("matricula", "");
        console.log(response.data);
        professorList.push(response.data[0]);
      });
    }
    if (control._formValues.matricula.trim() == "") {
      Alert.alert(
        "Campo vazio",
        "Matricula do professor não pode estar vazia."
      );
    }
    if (control._formValues.nome.trim() == "") {
      Alert.alert("Campo vazio", "Nome do professor não pode estar vazio.");
    }
  };

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setEditedName(professorList[index].nome); // Preenche o campo de edição com o nome atual do item
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

    if (editedName.trim() !== "") {
      API.put("/professores/" + professorList[index].id, {
        nome: editedName,
        coordenadoria_id: editedCoordenadoria,
      }).then(() => {
        setValue("nome", "");
        professorList[index].nome = editedName; // Atualiza o nome do item na lista
        professorList[index].coordenadoria_id = editedCoordenadoria; // Atualiza o nome do item na lista

        setEditingIndex(null); // Limpa o índice do item sendo editado
        setEditedName(""); // Limpa o nome editado
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
                    value={editedName}
                    onChangeText={setEditedName}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}
                {editingIndex === index ? (
                  <Picker
                    placeholder="Coordenadoria"
                    onValueChange={(itemValue: string) => {
                      setEditedCoordenadoria(Number(itemValue));
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
                    {
                      coordenadoriaList.find(
                        (obj) => Number(obj.id) == Number(item.coordenadoria_id)
                      )?.nome
                    }
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
