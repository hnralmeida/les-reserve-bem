// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import styles from "../../styles";
import API from "../../services/API";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  equipmentList: any[];
};

const EquipmentModal = ({
  isVisible,
  setIsVisible,
  equipmentList,
  onClose,
}: Props) => {
  const [equipmentName, setEquipmentName] = useState("");

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(""); // Estado para armazenar o nome editado

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (navigation.getState()?.index == 4) {
        setIsVisible(true);
        API.get("/equipamentos").then((response) => {
          equipmentList.push(response.data);
        });
      }
    }, [])
  );

  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (equipmentName.trim() !== "") {
      API.post("/equipamentos", {
        nomeEquipamento: equipmentName,
      }).then((response: any) => {
        setEquipmentName("");
        console.log(response.data);
        equipmentList.push(response.data);
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setEditedName(equipmentList[index].nomeEquipamento); // Preenche o campo de edição com o nome atual do item
  };

  const handleDelete = (index: any) => {
    const id = equipmentList[index].id;
    API.delete("/equipamentos/" + id)
      .then(() => {
        // remove o item no index no valor id de equipmentList
        equipmentList.filter((equipment) => equipment.id !== id);
      })
      .catch((error) => {
        alert(
          "Erro ao deletar equipamento, provavelmente há locais associados a ele."
        );
      });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome do item
    API.put("/equipamentos/" + equipmentList[index].id, {
      nomeEquipamento: editedName,
    }).then((data: any) => {
      console.log(
        "Salvando alterações para o item com id",
        equipmentList[index].id,
        "e novo nome",
        editedName
      );
      setEquipmentName("");

      setEditingIndex(null); // Limpa o índice do item sendo editado
      setEditedName(""); // Limpa o nome editado

      equipmentList[index].nomeEquipamento = editedName; // Atualiza o nome do item na lista
    });
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar equipamentos</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do equipmento"
            value={equipmentName}
            onChangeText={(text) => setEquipmentName(text)}
          />

          <View style={styles.edgeButton}>
            <TouchableHighlight style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableHighlight>
          </View>

          <ScrollView contentContainerStyle={styles.listBox}>
            {equipmentList?.length > 0 ? (
              equipmentList.map((item: any, index) => (
                <View style={styles.listLine} key={item.id}>
                  <Image
                    source={require("../../../assets/equipamentos.png")}
                    style={styles.iconElement}
                  />

                  {editingIndex === index ? (
                    <TextInput
                      style={styles.input}
                      value={editedName}
                      onChangeText={setEditedName}
                    />
                  ) : (
                    <Text style={styles.textLabel}>{item.nomeEquipamento}</Text>
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
                        <Text>Editar</Text>
                      </TouchableHighlight>

                      <TouchableHighlight
                        style={styles.textActions}
                        onPress={() => handleDelete(index)}
                      >
                        <Text>Excluir</Text>
                      </TouchableHighlight>
                    </>
                  )}
                </View>
              ))
            ) : (
              <View>
                <Text style={styles.centerText}>
                  Nenhum equipamento cadastrado.
                </Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.rowCenter}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => {
                setIsVisible(false), onClose();
              }}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EquipmentModal;
