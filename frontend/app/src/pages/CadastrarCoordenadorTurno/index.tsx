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
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import { ScrollView } from "react-native-gesture-handler";
import AdicionarCoordenador from "../../components/AdicionarCoordenadorTurno";
import ActivateModalButton from "../../components/ButtonActiveteModal";
import ButtonText from "../../components/ButtonText";

export default function cadastrarCoordenadorTurno(options: any) {
  const [coordenador_nome, set_coordenador_nome] = useState("");
  const [coordenador_matricula, set_coordeandor_matricula] = useState("");
  const [modal_visible, set_modal_visible] = useState(false);

  const msgAlert = "";

  const [coordenador_list, set_coordenador_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null);
  const [edited_nome, set_edited_nome] = useState<string>("");
  const [edited_matricula, set_edited_matricula] = useState();

  useFocusEffect(
    React.useCallback(() => {
      API.get("/coordenadorTurno").then((response) => {
        set_coordenador_list(response.data);
      });
    }, [])
  );

  const handleRegister = () => {
    if (coordenador_nome.trim() !== "") {
      API.post("/coordenadorTurno", {
        nome: coordenador_nome,
        matricula: coordenador_matricula,
      }).then((response: any) => {
        set_coordenador_nome("");
        set_coordeandor_matricula("");
        console.log(response.data);
        coordenador_list.push(response.data[0]);
      });
    }
    if (coordenador_matricula.trim() == "") {
      const msgAlert = "Matricula não pode ser vazia ";
    }
    if (coordenador_nome.trim() == "") {
      const msgAlert = "Nome não pode ser vazio ";
    }
    if (msgAlert.trim() !== "") {
      Alert.alert("campo Vazio", msgAlert);
    }
  };

  const handleEdit = (index: any) => {
    set_editing_index(index);
    set_edited_nome(coordenador_list[index].nome);
    set_edited_matricula(coordenador_list[index].matricula);
  };

  const handleDelete = (id: any) => {
    API.delete("/coordenadorTurno" + id).then(() => {
      set_coordenador_list(coordenador_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {};

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarCoordenador
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => set_modal_visible(!modal_visible)}
            cordenadorTurnoNome={coordenador_nome}
            setCordenadorTurnoNome={set_coordenador_nome}
            cordenadorTurnoList={coordenador_list}
            setCordenadorTurnoList={set_coordenador_list}
            coordenadorMatricula={coordenador_matricula}
            setCoordeandorMatricula={set_coordeandor_matricula}
          />
          <ActivateModalButton
            set_modal_visible={set_modal_visible}
            modal_visible={modal_visible}
            text={"Coordenador"}
          />
        </View>

        <ScrollView style={styles.listBox}>
          {coordenador_list.length > 0 ? (
            coordenador_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/turno.png")}
                  style={styles.iconElement}
                />

                {editing_index === index ? (
                  <>
                    <TextInput
                      style={styles.input}
                      value={edited_nome}
                      onChangeText={(edited_text) =>
                        set_edited_nome(edited_text)
                      }
                    />
                    <TextInput
                      style={styles.input}
                      value={edited_nome}
                      onChangeText={(edited_text) =>
                        set_edited_nome(edited_text)
                      }
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.textLabel}>{item.nome}</Text>
                    <Text style={styles.textLabel}>{item.matricula}</Text>
                  </>
                )}

                {editing_index === index ? (
                  <ButtonText
                    handle={() => handleSaveEdit(index)}
                    text="Salvar"
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
                Nenhuma coordenador de turno cadastrado.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
