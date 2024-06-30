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
    set_modal_visible(true);

    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setCordenadoriaNome(cordenadoriaList[index].nome); // Preenche o campo de edição com o nome atual do item
    setCordenadoriaSigla(cordenadoriaList[index].sigla); // Preenche o campo de edição com o nome atual do item
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

  function onClose() {
    setEditingIndex(null);

    setCordenadoriaNome(""); // Limpa o nome editado
    setCordenadoriaSigla(""); // Limpa a sigla editada
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarCoordenadoria
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => {
              set_modal_visible(!modal_visible), onClose();
            }}
            cordenadoriaNome={cordenadoriaNome}
            setCordenadoriaNome={setCordenadoriaNome}
            cordenadoriaSigla={cordenadoriaSigla}
            setCordenadoriaSigla={setCordenadoriaSigla}
            cordenadoriaList={cordenadoriaList}
            setCordenadoriaList={setCordenadoriaList}
            index={editingIndex}
          />
          <ActivateModalButton
            modal_visible={modal_visible}
            set_modal_visible={set_modal_visible}
            text={"Coordenadoria"}
          />
        </View>
        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/coordenadorias.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Coordenadoria</Text>
          <Text style={[styles.text, styles.row6]}>Sigla</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
        </View>

        <ScrollView style={styles.listBox}>
          {cordenadoriaList.length > 0 ? (
            cordenadoriaList.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/coordenadorias.png")}
                  style={styles.iconElement}
                />

                <Text style={styles.textLabel}>{item.nome}</Text>

                <Text style={styles.textLabel}>{item.sigla}</Text>

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
                Nenhuma coordenadoria cadastrada.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
