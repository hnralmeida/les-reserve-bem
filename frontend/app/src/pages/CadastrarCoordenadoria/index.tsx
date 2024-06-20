import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
} from "react-native";
import styles from "../../styles";
import React, { useEffect, useState } from "react";
import API from "../../services/API";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import AdicionarCoordenadoria from "../../components/AdicionarCoordenadoria";
import { set } from "react-hook-form";
import ActivateModalButton from "../../components/ButtonAddModal";
import ButtonText from "../../components/ButtonText";

export default function CadastrarCoordenadoria(options: any) {
  const [cordenadoriaNome, setCordenadoriaNome] = useState("");
  const [cordenadoriaSigla, setCordenadoriaSigla] = useState("");
  const [modal_visible, set_modal_visible] = useState(false);
  const [cordenadoriaList, setCordenadoriaList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(""); // Estado para armazenar o nome editado
  const [editedSigla, setEditedSigla] = useState(""); // Estado para armazenar a sigla editada

  useFocusEffect(
    React.useCallback(() => {
      API.get("/coordenadorias").then((response) => {
        const data = response.data;
        // sort in alphabetical order
        data.sort((a: any, b: any) => {
          return a.nome.localeCompare(b.nome);
        });
        setCordenadoriaList(data);
      });
    }, [])
  );

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setEditedName(cordenadoriaList[index].nome); // Preenche o campo de edição com o nome atual do item
    setEditedSigla(cordenadoriaList[index].sigla); // Preenche o campo de edição com o nome atual do item
  };

  const handleDelete = (id: any) => {
    API.delete("/coordenadorias/" + id)
      .then(() => {
        setCordenadoriaList(cordenadoriaList.filter((item) => item.id !== id));
      })
      .catch((error) => {
        alert(
          "Erro ao deletar coordenadoria, provavelmente há professores e/ou disciplinas associadas a ela."
        );
      });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coorde
    if (editedName.trim() !== "") {
      API.put("/coordenadorias/" + cordenadoriaList[index].id, {
        nome: editedName,
        sigla: editedSigla,
      }).then(() => {
        cordenadoriaList[index].nome = editedName; // Atualiza o nome do item na lista
        cordenadoriaList[index].sigla = editedSigla;

        setEditingIndex(null); // Limpa o índice do item sendo editado
        setEditedName(""); // Limpa o nome editado
        setEditedSigla(""); // Limpa a sigla editada
      });
      setCordenadoriaNome("");
    } else {
      // Handle empty equipment name
      console.error("cordenadoriaNome name cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarCoordenadoria
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => set_modal_visible(!modal_visible)}
            cordenadoriaNome={cordenadoriaNome}
            setCordenadoriaNome={setCordenadoriaNome}
            cordenadoriaSigla={cordenadoriaSigla}
            setCordenadoriaSigla={setCordenadoriaSigla}
            cordenadoriaList={cordenadoriaList}
            setCordenadoriaList={setCordenadoriaList}
          />
          <ActivateModalButton
            modal_visible={modal_visible}
            set_modal_visible={set_modal_visible}
            text={"Coordenadoria"}
          />
        </View>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/coordenadorias.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <Text style={[styles.text, styles.row6]}>Sigla</Text>
          <Text style={[styles.text, {width: 128, marginRight: "6.25%"}]}>Ações</Text>
        </View>

        <ScrollView style={styles.listBox}>
          {cordenadoriaList.length > 0 ? (
            cordenadoriaList.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/coordenadorias.png")}
                  style={styles.iconElement}
                />

                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={editedName}
                    onChangeText={(edited_text) => setEditedName(edited_text)}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}

                {editingIndex === index ? (
                  <TextInput
                    style={styles.input}
                    value={editedSigla}
                    onChangeText={(edited_text) => setEditedSigla(edited_text)}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.sigla}</Text>
                )}

                {editingIndex === index ? (
                  <TouchableHighlight
                    style={styles.textFocus}
                    onPress={() => handleSaveEdit(index)}
                  >
                    <Text>Salvar</Text>
                  </TouchableHighlight>
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
                Nenhuma coordenadoria cadastrada.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
