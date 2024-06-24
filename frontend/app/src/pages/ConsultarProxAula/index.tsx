import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import styles from "../../styles";
import { useCallback, useState } from "react";
import { RadioButton } from "../../components/RadioButton";
import API from "../../services/API";
import { useFocusEffect } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function ConsultarProxAula(options: any) {
  const [matricula, setMatricula] = useState("");
  const [aula, setAula] = useState<any>(null);
  const [picker, setPicker] = useState(false);

  const [list_periodos, set_list_periodos] = useState<any[]>([]);
  const [periodo, setPeriodo] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      API.get("/periodos").then((response) => {
        set_list_periodos(response.data);
      });
    }, [])
  );
  function handle() {
    if (!matricula) {
      alert("Digite a matrícula");
      return;
    }

    if (picker) {
      API.get(`/aulas/aluno/proxima/${matricula}`, {
        params: {
          periodoId: periodo,
        },
      }).then((response) => {
        console.log(response.data);
        setAula(response.data);
      });
    } else {
      API.get(`/aulas/professor/proxima/${matricula}`, {
        params: {
          periodoId: periodo,
        },
      }).then((response) => {
        console.log(response.data);
        setAula(response.data);
      });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Consultar Próxima Aula</Text>
        <View style={styles.row}>
          <View style={styles.row}>
            <RadioButton selected={picker} onSelect={setPicker} />
            <Text style={styles.textLabel}>Aluno</Text>
          </View>

          <View style={[styles.row, { marginLeft: 8 }]}>
            <RadioButton selected={!picker} onSelect={setPicker} />
            <Text style={styles.textLabel}>Professor</Text>
          </View>

          <View style={[styles.column, styles.row128]}>
            <Text style={styles.textLabel}>Matrícula</Text>
            <TextInput
              value={matricula}
              style={[styles.input]}
              onChange={(e) => setMatricula(e.nativeEvent.text)}
              placeholder="Digite a matrícula"
              keyboardType="numeric"
            />
          </View>

          <View
            style={[
              styles.column,
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Picker
              selectedValue={periodo}
              style={[
                styles.boxBorder,
                styles.marginRight,
                { marginBottom: "auto" },
              ]}
              placeholder="modelo"
              onValueChange={(itemValue: string) => {
                setPeriodo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                style={styles.boxBorder}
                label={"Periodo"}
                value={0}
              />
              {list_periodos.map((item, index) => (
                <Picker.Item key={index} label={item.nome} value={item.id} />
              ))}
            </Picker>
          </View>

          <View style={styles.column}>
            <TouchableHighlight style={[styles.button]} onPress={handle}>
              <Text style={styles.buttonText}>Consultar</Text>
            </TouchableHighlight>
          </View>
        </View>

        {aula ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Aula</Text>
              <Text style={styles.text}>
                {aula.disciplina ? aula.disciplina.nome : "Sem Disciplina"}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Professor</Text>
              <Text style={styles.text}>
                {aula.professor ? aula.professor.nome : "Sem Professor"}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Horário</Text>
              <Text style={styles.text}>
                {aula.horaInicio && aula.horaFim
                  ? aula.horaInicio + " às " + aula.horaFim
                  : "Sem horario definido"}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.text}>Local</Text>
              <Text style={styles.text}>
                {aula.local ? aula.local.nomeLocal : "Sem local"}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
