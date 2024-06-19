import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
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
import ModalComponent from "../modal";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  equipamentList: any[];
  onClose: () => void;
};

const ControleEquipamentos = ({
  isVisible,
  setIsVisible,
  onClose,
  equipamentList,
}: Props) => {
  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <View style={styles.row}>
          <Text style={styles.modalTitle}>Equipamentos no Local</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Nome</Text>
          <Text style={styles.text}>Quantidade</Text>
          <Text style={styles.text}>Observação</Text>
        </View>
        {equipamentList
          ? equipamentList.map((equipament) => (
              <View style={styles.row}>
                <Text style={styles.text}>
                  {equipament.equipamento.nomeEquipamento}
                </Text>
                <Text style={styles.text}>{equipament.quantidade}</Text>
                <Text style={styles.text}>{equipament.observacao}</Text>
              </View>
            ))
          : "Nenhum equipamento cadastrado"}
      </>
    </ModalComponent>
  );
};

export default ControleEquipamentos;
