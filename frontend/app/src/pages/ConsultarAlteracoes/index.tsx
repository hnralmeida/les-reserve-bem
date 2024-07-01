import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../../styles";
import API from "../../services/API";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import functionLib from "../../services/functions";
import ModalComponent from "../../components/modal";
export default function ConsultaAlteracoes(options: any) {
  const [alteracoes, setAlteracoes] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const utils = new functionLib();

  useEffect(() => {
    API.get("/audit")
      .then((response) => {
        setAlteracoes(response.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }, []);

  function mostrarTela(prestate: any, posstate: any) {
    const prestateObj = prestate ? prestate.replace("\n\t") : null;
    const posstateObj = posstate ? posstate.replace("\n\t") : null;

    alert("Antes: " + prestateObj + "\nDepois: " + posstateObj);
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/alteracoes.png")}
        style={[
          styles.iconElement,
          { position: "absolute", top: 8, left: 128 },
        ]}
      />
      <SafeAreaView style={styles.content}>
        <View
          style={[
            styles.listLine,
            { display: "flex", justifyContent: "flex-start" },
          ]}
        >
          <Text style={[styles.text, { width: 128 }]}>ID</Text>
          <Text style={[styles.text, { width: 128 }]}>Timestamp</Text>
          <View style={{ display: "flex", width: "80%", marginLeft: 8 }}>
            <Text style={[styles.text, { alignSelf: "center" }]}>Ver</Text>
          </View>
        </View>
        <ScrollView
          style={[styles.listBox, { maxHeight: "50%", marginBottom: 48 }]}
        >
          {alteracoes ? (
            alteracoes.map((alteracao: any, index: any) => {
              return (
                <View key={alteracao.id} style={styles.row}>
                  <Text style={[styles.textLabel, { width: 128 }]}>
                    {alteracao.id}
                  </Text>
                  <Text style={[styles.textLabel, { width: 128 }]}>
                    {utils.toReadableHour(alteracao.timestamp)}
                  </Text>
                  <TouchableHighlight
                    style={[styles.text, { width: "80%" }]}
                    onPress={() =>
                      mostrarTela(alteracao.prestate, alteracao.posstate)
                    }
                  >
                    {alteracao.prestate ? (
                      <Text style={styles.textLabel}>
                        {alteracao.operation + ": " + alteracao.prestate.split("/")[0]}
                      </Text>
                    ) : (
                      <Text style={styles.textLabel}>
                        {alteracao.operation + ": " + alteracao.posstate.split("/")[0]}
                      </Text>
                    )}
                  </TouchableHighlight>
                </View>
              );
            })
          ) : (
            <Text style={styles.textLabel}>Nenhuma alteração encontrada</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
