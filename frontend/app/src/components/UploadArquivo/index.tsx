import React, { useState } from "react";
import { View, Text, TouchableHighlight, Button, Alert } from "react-native";
import ModalComponent from "../modal";
import styles from "../../styles";
import API from "../../services/API";
import { LoadingIcon } from "../LoadingIcon";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
};

const UploadArquivo = ({ isVisible, setIsVisible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync();

    if (result.canceled === false) {
      setFileInfo(result);
    } else {
      setUploadStatus("Nenhum arquivo selecionado.");
    }
  };

  const handleUpload = async () => {
    if (!fileInfo) {
      Alert.alert("Erro", "Por favor, selecione um arquivo primeiro.");
      return;
    }

    setLoading(true);
    setUploadStatus("");

    try {
      const fileUri = fileInfo.uri;
      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log(fileBase64);

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
        .catch((error) => {
          alert("Aconteceu um erro ou o Matheus não fez a API ainda");
          alert(error);
        })
        .finally(() => {
          alert("Importação termianda.");
          setLoading(false);
          onClose();
        });

      setUploadStatus("Importado com sucesso!");
      Alert.alert("Sucesso", "Importado com sucesso!");
    } catch (error) {
      setUploadStatus("Aconteceu um erro ou o Matheus não fez a API ainda");
      Alert.alert("Erro", "Aconteceu um erro ou o Matheus não fez a API ainda");
    } finally {
      setLoading(false);
      onClose();
    }
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
              <Text>
                Tamanho do arquivo:{" "}
                {(fileInfo.assets[0].size / 1024).toFixed(2)} MB
              </Text>
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
              onPress={handleUpload}
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
