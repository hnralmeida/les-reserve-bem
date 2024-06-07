// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";

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
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ModalComponent from "../modal";
import ButtonText from "../ButtonText";

import styles from "../../styles";
import API from "../../services/API";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { UseFormWatch, Control, UseFormSetValue } from "react-hook-form";
import InputDate from "../InputDate";
import IFile from "../../types";
import FileUploadService from "../../services/fileUpload";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  file: any;
  setFile?: Dispatch<SetStateAction<any>>;
};

const ImportarArquivo = ({
  isVisible,
  setIsVisible,
  onClose,
  file,
  setFile,
}: Props) => {
  const [currentFile, setCurrentFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

  const FileUpload: React.FC = () => {
    const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      const selectedFiles = files as FileList;
      setCurrentFile(selectedFiles?.[0]);
      setProgress(0);
    };

    const upload = () => {
      setProgress(0);
      if (!currentFile) return;

      FileUploadService.upload(currentFile, (event: any) => {
        setProgress(Math.round((100 * event.loaded) / event.total));
      })
        .then((response) => {
          setMessage(response.data.message);
          return FileUploadService.getFiles();
        })
        .then((files) => {
          setFileInfos(files.data);
        })
        .catch((err) => {
          setProgress(0);

          if (err.response && err.response.data && err.response.data.message) {
            setMessage(err.response.data.message);
          } else {
            setMessage("Could not upload the File!");
          }

          setCurrentFile(undefined);
        });
    };

    React.useEffect(() => {
      FileUploadService.getFiles().then((response) => {
        setFileInfos(response.data);
      });
    }, []);

    return (
      <View>
        <View style={styles.row}>
          <View style={styles.rowFlexEnd}>
            <TouchableHighlight style={styles.button} onPress={()=> upload()}>
              <Text >Escolher arquivo</Text>
            </TouchableHighlight>
            <label style={styles.text}>
              <input type="file" onChange={selectFile} />
            </label>
          </View>
        </View>

        {message && <View role="alert">{message}</View>}

        {currentFile && (
          <View>
            <View
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {progress}%
            </View>
          </View>
        )}

        <View style={styles.row}>
          <ul>
            {fileInfos ? (
              fileInfos.map((file, index) => (
                <li key={index}>
                  <a href={file.url}>{file.name}</a>
                </li>
              ))
            ) : (
              <View>
                <Text style={[styles.text, { color: "black" }]}>
                  Nenhum arquivo carregado.
                </Text>
              </View>
            )}
          </ul>
        </View>

        <View style={styles.rowCenter}>
          <button
            style={styles.button}
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </View>
      </View>
    );
  };

  const handle: () => void = () => {
    onClose();
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <FileUpload />
      </>
    </ModalComponent>
  );
};

export default ImportarArquivo;
