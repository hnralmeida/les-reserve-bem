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
import { useForm } from "react-hook-form";
import ActivateModalButton from "../../components/ButtonActiveteModal";

type FormInputs = {
  nome: string;
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
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  const [disciplina_list, set_disciplina_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [edited_name, set_edited_name] = useState(""); // Estado para armazenar o nome editado

  useFocusEffect(
    React.useCallback(() => {
      API.get("/disciplinas").then((response) => {
        set_disciplina_list(response.data);
      });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_editing_index(index); // Atualiza o índice do item sendo editado
    set_edited_name(disciplina_list[index].nome); // Preenche o campo de edição com o nome atual do item
  };

  const handleDelete = (id: any) => {
    API.delete("/disciplinas/" + id).then(() => {
      set_disciplina_list(disciplina_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    if (edited_name.trim() !== "") {
      API.put("/disciplinas/" + disciplina_list[index].id, {
        nome: edited_name,
      }).then(() => {
        setValue("nome", "");
        disciplina_list[index].nome = edited_name; // Atualiza o nome do item na lista

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
                  <TextInput
                    style={styles.input}
                    value={edited_name}
                    onChangeText={set_edited_name}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}

                {editing_index === index ? (
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
