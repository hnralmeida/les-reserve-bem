import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EquipmentModal from "../../components/Equipamento";
import { ScrollView } from "react-native-gesture-handler";
import API from "../../services/API";
import ButtonText from "../../components/ButtonText";

interface Equipamento {
  quantidade: string;
  equipamento: string;
}

const CadastrarLocal = () => {
  const navigation = useNavigation();

  // modal equipamentos
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  // input
  const [numeroLocal, setNumeroLocal] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [add_equip, set_add_equip] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<
    string | null
  >(null);
  const [quantidadeEquipamentos, setQuantidadeEquipamentos] = useState<any>(0);

  // list
  const [equipamentos_local, set_equipamentos_local] = useState<any[]>([]);
  const [equipamentos_list, set_equipamentos_list] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      API.get("/equipamentos").then((response) => {
        set_equipamentos_list(response.data);
      });
    }, [])
  );

  const adicionarEquipamento = () => {
    if (quantidadeEquipamentos) {
      set_equipamentos_local((prevEquipamentos) => [
        ...prevEquipamentos,
        {
          quantidade: quantidadeEquipamentos,
          equipamento: equipamentos_list.filter(
            (item) => item.id == equipamentoSelecionado
          ),
        },
      ]);

      // Resetar o valor selecionado após adicionar o equipamento
      setQuantidadeEquipamentos("0");
      setEquipamentoSelecionado(null);
      // Fecha o estado de edição
      set_add_equip(false);
    }
  };

  const onSubmit = () => {
    if (numeroLocal.trim() !== "") {
      API.post("/locais", {
        nomeLocal: numeroLocal,
        capacidade: capacidade,
        observacao: observacoes,
        locaisEquipamentos: equipamentos_local,
      }).then((response: any) => {
        setCapacidade("");
        setObservacoes("");
        setNumeroLocal("");
        set_equipamentos_local([]);
        console.log(response.data);
      });
    } else {
      // Handle empty equipment name
      Alert.alert("Campo vazio", "Campos de local não podem estar vazios.");
    }
  };

  const delete_equip = (id: any) => {
    add_equip
      ? set_add_equip(false)
      : set_equipamentos_list(
          equipamentos_list.filter((item) => Number(item.id) !== Number(id))
        );
  };

  const Adicionar_Equipamento = () => {
    return (
      <View style={[styles.buttonRowHome, styles.modalInput]}>
        <View style={[styles.marginRight]}>
          <Image
            source={require("../../../assets/plus.png")}
            style={[styles.iconElement]}
          />
        </View>
        <Text style={styles.modalInput}>Adicionar Equipamento</Text>
      </View>
    );
  };

  const ViewEquipament_editting = () => {
    return (
      <>
        <View style={styles.row}>
          <View style={styles.column && styles.numberInput}>
            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              style={styles.boxBorder}
              placeholder="Quantidade"
              value={quantidadeEquipamentos}
              onChangeText={(target) =>
                setQuantidadeEquipamentos(Number(target))
              }
              keyboardType="numeric"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Equipamento</Text>
            <Picker
              selectedValue={equipamentoSelecionado}
              style={styles.boxBorder}
              onValueChange={(itemValue: any | null) =>
                setEquipamentoSelecionado(itemValue)
              }
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione um Equipamento"}
                value={0}
              />
              {equipamentos_list.map((equipamento) => (
                <Picker.Item
                  key={equipamento.id}
                  label={equipamento.nome}
                  value={equipamento.id}
                />
              ))}
            </Picker>
          </View>
          <EquipmentModal
            isVisible={modalVisible}
            setIsVisible={setModalVisible}
            onClose={closeModal}
          />
          <TouchableHighlight onFocus={() => setModalVisible(!modalVisible)}>
            <Image
              source={require("../../../assets/settings.png")}
              style={styles.iconElement}
            />
          </TouchableHighlight>

          <TouchableHighlight onPress={delete_equip}>
            <Image
              source={require("../../../assets/delete.png")}
              style={styles.iconElement}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={adicionarEquipamento}>
            <Image
              source={require("../../../assets/save.png")}
              style={styles.iconElement}
            />
          </TouchableHighlight>
        </View>
      </>
    );
  };

  const ViewEquipament_read = (item: any, index: any) => {
    return (
      <>
        {console.log(item.item)}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Quantidade</Text>
            <Text style={styles.boxBorder}>{item.item.quantidade}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Equipamento</Text>
            <Text style={styles.boxBorder}>
              {item.item.equipamento[0]?.nome}
            </Text>
          </View>

          <TouchableHighlight onPress={() => delete_equip(item.id)}>
            <Image
              source={require("../../../assets/delete.png")}
              style={styles.iconElement}
            />
          </TouchableHighlight>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.expand}>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Local</Text>
              <TextInput
                style={styles.boxBorder}
                placeholder="Número"
                value={numeroLocal}
                onChangeText={setNumeroLocal}
              />
            </View>
            <View style={[styles.column, styles.numberInput]}>
              <Text style={styles.label}>Capacidade</Text>
              <TextInput
                style={styles.boxBorder}
                placeholder="0"
                value={capacidade}
                onChangeText={setCapacidade}
              />
            </View>
          </View>

          <View style={styles.line} />

          {equipamentos_local.map((item, index) => {
            return <ViewEquipament_read item={item} index={index} />;
          })}

          {add_equip ? (
            <>
              <ViewEquipament_editting />
            </>
          ) : (
            <>
              <TouchableHighlight onPress={() => set_add_equip(true)}>
                <Adicionar_Equipamento />
              </TouchableHighlight>
            </>
          )}

          <View style={styles.line} />

          <View style={styles.column}>
            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={styles.boxBorder}
              multiline={true}
              placeholder="Escrever observação..."
              value={observacoes}
              onChangeText={setObservacoes}
            />
          </View>

          <View style={styles.rowCenter}>
            <ButtonText handle={onSubmit} text="Salvar" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CadastrarLocal;
