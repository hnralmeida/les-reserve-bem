// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";

import {
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Button,
} from "react-native";
import ModalComponent from "../modal";

import styles from "../../styles";
import API from "../../services/API";
import { LoadingIcon } from "../LoadingIcon";
import { set } from "react-hook-form";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
};

const UploadArquivo = ({ isVisible, setIsVisible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if (result.assets != null) {
      setFileInfo(result);
    }
  };

  const handle: () => void = async () => {
    setLoading(true);

    console.log(fileInfo);
    const fileUri = fileInfo.uri;
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    API.post(
      "alunos/importar/",
      JSON.stringify({
        name: fileInfo.name,
        type: fileInfo.mimeType,
        data: fileBase64,
      })
    )
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
            Selecione arquivo para upload
          </Text>
          <View style={styles.padmargin}>
            <Button title="Selecione um arquivo" onPress={pickDocument} />
          </View>
          {fileInfo && (
            <View style={[styles.padmargin, { marginTop: 20 }]}>
              <Text>Nome do arquivo: {fileInfo.assets[0].name}</Text>
              <Text>Tamanho do arquivo: {fileInfo.assets[0].size} bytes</Text>
            </View>
          )}
          {uploadStatus && (
            <View style={{ marginTop: 20 }}>
              <Text>{uploadStatus}</Text>
            </View>
          )}
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
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </>
    </ModalComponent>
  );
};

export default UploadArquivo;
