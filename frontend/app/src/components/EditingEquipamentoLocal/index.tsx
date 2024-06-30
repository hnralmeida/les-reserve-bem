import React, { Dispatch, SetStateAction } from "react";
import { Image, TextInput, TouchableHighlight, View } from "react-native";
import styles from "../../styles";
import { Picker } from "@react-native-picker/picker";
import EquipmentModal from "../Equipamento";

type Props = {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  quantidadeEquipamentos: String;
  setQuantidadeEquipamentos: Dispatch<SetStateAction<String>>;
  equipamentoSelecionado: string | null;
  setEquipamentoSelecionado: Dispatch<SetStateAction<string | null>>;
  equipamentos_list: any[];
  observacao: string;
  set_observacao: Dispatch<SetStateAction<string>>;
  delete_equipamento: (index: any) => void;
  adicionar_equipamento: () => any;
  refreshPage: () => void;
};

const ViewEquipamentEditting = ({
  modalVisible,
  setModalVisible,
  quantidadeEquipamentos,
  setQuantidadeEquipamentos,
  equipamentoSelecionado,
  setEquipamentoSelecionado,
  observacao,
  set_observacao,
  delete_equipamento,
  adicionar_equipamento,
  equipamentos_list, 
  refreshPage
}: Props) => {
  const handleInputNumberChange = (text: any): string => {
    let numbersOnly = "";
    for (let i = 0; i < text.length; i++) {
      if (!isNaN(parseInt(text[i]))) {
        numbersOnly += text[i];
      }
    }
    return numbersOnly;
  };

  return (
    <View style={styles.row}>
      <View style={[styles.column, styles.numberInput]}>
        <TextInput
          style={styles.boxBorder}
          placeholder="Quantidade"
          value={String(quantidadeEquipamentos)}
          onChangeText={(target) =>
            setQuantidadeEquipamentos(handleInputNumberChange(target))
          }
          keyboardType="numeric"
          maxLength={3}
        />
      </View>
      <View style={styles.column}>
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
              label={equipamento.nomeEquipamento}
              value={equipamento.id}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.column}>
        <TextInput
          style={styles.boxBorder}
          placeholder="Observação"
          value={observacao}
          onChangeText={(text) => set_observacao(text)}
        />
      </View>
      <EquipmentModal
        isVisible={modalVisible}
        setIsVisible={setModalVisible}
        onClose={() => {setModalVisible(false), refreshPage()}}
        equipmentList={equipamentos_list}
      />
      <TouchableHighlight onFocus={() => setModalVisible(true)}>
        <Image
          source={require("../../../assets/settings.png")}
          style={styles.iconElement}
        />
      </TouchableHighlight>

      <TouchableHighlight onPress={delete_equipamento}>
        <Image
          source={require("../../../assets/delete.png")}
          style={styles.iconElement}
        />
      </TouchableHighlight>
      <TouchableHighlight onPress={adicionar_equipamento}>
        <Image
          source={require("../../../assets/save.png")}
          style={styles.iconElement}
        />
      </TouchableHighlight>
    </View>
  );
};

export default ViewEquipamentEditting;
