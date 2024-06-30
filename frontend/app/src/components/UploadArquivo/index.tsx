import React, { useState } from "react";
import { View, Text, TouchableHighlight, Alert, Pressable } from "react-native";
import ModalComponent from "../modal";
import styles from "../../styles";
import API from "../../services/API";
import { LoadingIcon } from "../LoadingIcon";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { set } from "react-hook-form";

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  list: any[];
  setList: React.Dispatch<React.SetStateAction<any[]>>;
  onClose: () => void;
};

const UploadArquivo = ({ isVisible, setIsVisible, onClose, list, setList }: Props) => {
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
        var fdata = new FormData();

        fdata.append("file", fileInfo.assets[0].file, fileInfo.name);

        API.post("alunos/importar", fdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then((response) => {
          alert("Arquivo importado com sucesso");
          for (let i = 0; i < response.data.length; i++) {
            setList((list) => [...list, response.data[i]]);
          }
        })
        .catch((error) => {
          alert(error);
        })
        .finally(() => {
          setLoading(false);
          onClose();
        });

    } catch (error: any) {
      setUploadStatus("Aconteceu um erro ou o Matheus não fez a API ainda");
      alert(
        "Aconteceu um erro ou o Matheus não fez a API ainda\n" + error.message
      );
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
            <TouchableHighlight style={styles.pick} onPress={pickDocument}>
              <Text style={styles.buttonText}>Selecionar arquivo</Text>
            </TouchableHighlight>
          </View>
          {fileInfo && (
            <View style={[styles.padmargin, { marginTop: 20 }]}>
              <>
                <Text>Nome do arquivo: {fileInfo.assets[0].name}</Text>
                <Text>
                  Tamanho do arquivo:{" "}
                  {(fileInfo.assets[0].size / 1024).toFixed(2)} MB
                </Text>
              </>
            </View>
          )}

          {loading ? <LoadingIcon loading={loading} /> : null}

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
