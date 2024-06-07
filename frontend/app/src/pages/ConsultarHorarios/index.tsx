import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import dayjs, { Dayjs } from "dayjs";
import ModalComponent from "../../components/modal";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";
import functionLib from "../../services/functions";
import DateTimePicker from "react-native-ui-datepicker";
import InputDate from "../../components/InputDate";

type FormInputs = {
  id: string;
  data: Date;
  input: string;
};

export default function ConsultarHorarios(options: any) {
  const select_horario = [
    "",
    "Aluno",
    "Professor",
    "Periodo",
    "Locais",
    "Turma",
    "Data",
  ];
  const [modelo, set_modelo] = useState("");
  const [input_search, set_input_search] = useState("");
  const [var1, set_var1] = useState("");
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: "",
      data: new Date(),
      input: "",
    },
  });

  const [list_aulas, set_list_aulas] = useState<any[]>([]);
  const [list_locais, set_list_locais] = useState<any[]>([]);
  const [list_disciplinas, set_list_disciplinas] = useState<any[]>([]);
  const [list_turmas, set_list_turmas] = useState<any[]>([]);
  const [list_periodos, set_list_periodos] = useState<any[]>([]);
  const [list_professores, set_list_professores] = useState<any[]>([]);

  const utils = new functionLib();

  const [isVisible, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      API.get("/aulas")
        .then((response) => {
          set_list_aulas(response.data);
          console.log(response.data);
        })
        .then(() => {
          API.get("/locais").then((response) => {
            set_list_locais(response.data);
          });
          API.get("/disciplinas").then((response) => {
            set_list_disciplinas(response.data);
          });
          API.get("/turmas").then((response) => {
            set_list_turmas(response.data);
          });
          API.get("/professores").then((response) => {
            set_list_professores(response.data);
          });
          API.get("/periodos").then((response) => {
            set_list_periodos(response.data);
          });
        });
    }, [])
  );

  const onSubmit = () => {};

  function DependsOnModelo() {
    switch (modelo) {
      case "Aluno":
        return (
          <TextInput
            editable
            style={[styles.boxBorder, { width: "100%" }]}
            value={watch("input")}
            maxLength={10}
            placeholder="Matrícula"
            onChangeText={(text) => setValue("input", text)}
          />
        );
      case "Professor":
        return (
          <TextInput
            editable
            style={[styles.boxBorder, { width: "100%" }]}
            value={watch("input")}
            maxLength={10}
            placeholder="Matrícula"
            onChangeText={(text) => setValue("input", text)}
          />
        );
      case "Periodo":
        return (
          <Picker
            selectedValue={input_search}
            style={[styles.boxBorder]}
            placeholder="Periodo"
            onValueChange={(itemValue: string) => {
              set_input_search(itemValue);
            }}
          >
            {list_periodos.map((item, index) => (
              <Picker.Item
                key={index}
                label={item.Periodo}
                value={item.Periodo}
              />
            ))}
          </Picker>
        );
      case "Locais":
        return (
          <Picker
            selectedValue={input_search}
            style={[styles.boxBorder]}
            placeholder="Locais"
            onValueChange={(itemValue: string) => {
              set_input_search(itemValue);
            }}
          >
            {list_locais.map((item, index) => (
              <Picker.Item key={index} label={item.nomeLocal} value={item.id} />
            ))}
          </Picker>
        );
      case "Turma":
        return (
          <Picker
            selectedValue={input_search}
            style={[styles.boxBorder]}
            placeholder="turma"
            onValueChange={(itemValue: string) => {
              set_input_search(itemValue);
            }}
          >
            {list_turmas.map((item, index) => (
              <Picker.Item key={index} label={item.nome} value={item.id} />
            ))}
          </Picker>
        );
      case "Data":
        return (
          <InputDate
            data_evento={watch("data")}
            label_value="data"
            set_data_evento={setValue}
          />
        );
      default:
        return null;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View
          style={[
            styles.row,
            styles.padmargin,
            { justifyContent: "flex-start" },
          ]}
        >
          <Picker
            selectedValue={modelo}
            style={[styles.boxBorder, { marginRight: 32 }]}
            placeholder="modelo"
            onValueChange={(itemValue: string) => {
              set_modelo(itemValue);
            }}
          >
            {select_horario.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

          {modelo != "" && modelo ? (
            <View style={[styles.row, { marginBottom: 0 }]}>
              <View style={[styles.column, { marginRight: 32 }]}>
                <DependsOnModelo />
              </View>

              <View style={[styles.column, { marginBottom: 16 }]}>
                <TouchableHighlight
                  style={[styles.button, { width: 128 }]}
                  onPress={onSubmit}
                >
                  <Text style={styles.textColorWhite}> Buscar </Text>
                </TouchableHighlight>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}
