// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import ModalComponent from "../modal";

import styles from "../../styles";
import API from "../../services/API";
import { LoadingIcon } from "../LoadingIcon";
import { set } from "react-hook-form";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

const ControleAulaAluno = ({
  isVisible,
  setIsVisible,
  onClose,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handle: () => void = () => {
    setLoading(true);

    API.post("/importar/aulas")
      .then((response) => {
        alert("Importado com sucesso!");
      })
      .finally(() => {
        alert("Aconteceu um erro ou o Matheus não fez a API ainda");
        setLoading(false);
        onClose();
      });
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <View>
          <Text style={[styles.buttonText, { textDecorationStyle: "solid" }]}>
            Deseja importar dados do SAMHA?
          </Text>
          <Text style={styles.paragraphText}>
            Todas disciplinas cadastradas nele serão cadastradas neste sistema.
            Deseja continuar?
          </Text>
          <LoadingIcon loading={loading} />

          <View style={styles.spaced}>
            <TouchableHighlight
              style={[styles.button, styles.marginRight]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={handle}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Importar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    </ModalComponent>
  );
};

export default ControleAulaAluno;
