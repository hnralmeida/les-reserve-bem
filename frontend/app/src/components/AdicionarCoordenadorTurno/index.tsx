// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Alert,
  Image,
} from "react-native";
import styles from "../../styles";
import API from "../../services/API";
import ModalComponent from "../modal";
import ButtonText from "../ButtonText";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  cordenadorTurnoNome: string;
  setCordenadorTurnoNome: React.Dispatch<React.SetStateAction<string>>;
  coordenadorMatricula: string;
  setCoordeandorMatricula: React.Dispatch<React.SetStateAction<string>>;
  cordenadorTurnoList: any[];
  setCordenadorTurnoList: React.Dispatch<React.SetStateAction<any[]>>;
};

const AdicionarCoordenador = ({
  isVisible,
  setIsVisible,
  onClose,
  cordenadorTurnoNome,
  setCordenadorTurnoNome,
  coordenadorMatricula,
  setCoordeandorMatricula,
  cordenadorTurnoList,
  setCordenadorTurnoList,
}: Props) => {
  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (cordenadorTurnoNome.trim() !== "") {
      API.post("/coordenadorTurnos", {
        nome: cordenadorTurnoNome,
      }).then((response: any) => {
        setCordenadorTurnoNome("");
        console.log(response.data);
        cordenadorTurnoList.push(response.data[0]);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Nome do equipmento não pode estar vazio.");
    }
  };

  const handleImport = () => {
    Alert.alert("Importar", "Função ainda não implementada");
  }

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <Text style={styles.title}>Nome do Coordenador</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Nome do Coordenador"
          value={cordenadorTurnoNome}
          onChangeText={(text) => setCordenadorTurnoNome(text)}
        />

        <Text style={styles.title}>Matricula do Coordenador</Text>
        <TextInput
          style={styles.boxBorder}
          placeholder="Matricula do coordenador"
          value={coordenadorMatricula}
          onChangeText={(text) => setCoordeandorMatricula(text)}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <ButtonText handle={handleImport} text="Importar"/>
          <View style={{marginRight: 8}} />
          <ButtonText handle={handleRegister} text="Salvar" />
        </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarCoordenador;
