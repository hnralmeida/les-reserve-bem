// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import styles from "../../styles";
import API from "../../services/API";
import ModalComponent from "../modal";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import EquipmentModal from "../Equipamento";
import ButtonText from "../ButtonText";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  localList: any[];
};

const AdicionarLocal = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  localList,
}: Props) => {
  // modal equipamentos
  const [modalVisible, setModalVisible] = useState(false);

  // auxiliares
  const [add_equip, set_add_equip] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState<
    string | null
  >(null);
  const [observacao, set_observacao] = useState("");
  const [quantidadeEquipamentos, setQuantidadeEquipamentos] =
    useState<String>("");

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

  const closeModal = () => {
    setModalVisible(false);
  };

  const onSubmit = () => {
    if (control._formValues.nomeLocal.trim() !== "") {
      API.post("/locais", {
        nomeLocal: control._formValues.nomeLocal,
        capacidade: control._formValues.capacidade,
        observacao: control._formValues.observacao,
        locaisEquipamentos: equipamentos_local,
      })
        .then((response: any) => {
          setValue("capacidade", "");
          setValue("observacao", "");
          setValue("nomeLocal", "");
          set_equipamentos_local([]);

          // controle de interface
          localList.push(response.data);
          setIsVisible(false);
        })
        .catch((error) => {
          alert("Erro ao não identificado, contate o suporte.");
        });
    } else {
      // Handle empty equipment name
      alert("Campos de local não podem estar vazios.");
    }
  };

  const delete_equip = (index: any) => {
    console.log(index);
    add_equip
      ? set_add_equip(false)
      : set_equipamentos_local(
          equipamentos_local.filter(
            (item, position) => Number(position) !== Number(index)
          )
        );
        set_observacao("");
        setEquipamentoSelecionado(null);
  };

  const adicionarEquipamento = () => {
    if (quantidadeEquipamentos) {
      set_equipamentos_local((prevEquipamentos) => [
        ...prevEquipamentos,
        {
          quantidade: quantidadeEquipamentos,
          observacao: observacao,
          equipamento: equipamentos_list.filter(
            (item) => item.id == equipamentoSelecionado
          )[0],
        },
      ]);

      // Resetar o valor selecionado após adicionar o equipamento
      setQuantidadeEquipamentos("0");
      setEquipamentoSelecionado(null);
      set_observacao("");
      // Fecha o estado de edição
      set_add_equip(false);
    }
  };

  const Label_adicionar_equipamento = () => {
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

  const handleInputNumberChange = (text: string): string => {
    let numbersOnly = "";
    for (let i = 0; i < text.length; i++) {
      if (!isNaN(parseInt(text[i]))) {
        numbersOnly += text[i];
      }
    }
    return numbersOnly;
  };

  const ViewEquipament_editting = () => {
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
    );
  };

  const View_equipament_read = (item: any, index: any) => {
    console.log(item);
    const item_equip = item.item;
    return (
      <>
        <View style={styles.row}>
          <View style={[styles.column, styles.numberInput]}>
            <Text style={styles.box}>{item_equip.quantidade}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.box}>
              {item_equip.equipamento[0].nomeEquipamento}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.box}>
              {item_equip.observacao ? item_equip.observacao : "..."}
            </Text>
          </View>

          <TouchableHighlight
            onPress={() => delete_equip(item.index)}
            style={[styles.rowCenter, styles.column]}
          >
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
    <ModalComponent
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onClose}
    >
      <>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Local</Text>
            <TextInput
              style={styles.boxBorder}
              placeholder="Nome"
              value={watch("nomeLocal")}
              onChangeText={(text) => setValue("nomeLocal", text)}
            />
          </View>
          <View style={[styles.column, styles.numberInput]}>
            <Text style={styles.label}>Capacidade</Text>
            <TextInput
              style={styles.boxBorder}
              placeholder="0"
              value={watch("capacidade")}
              onChangeText={(text) =>
                setValue("capacidade", handleInputNumberChange(text))
              }
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantidade</Text>
          <Text style={styles.label}>Equipamento</Text>
          <Text style={styles.label}>Observação</Text>
          <Text style={[styles.label, styles.centerText]}>Ação</Text>
        </View>
        {equipamentos_local ? (
          equipamentos_local.map((item, index) => {
            return <View_equipament_read item={item} index={index} />;
          })
        ) : (
          <Text>Não há equipamentos no local</Text>
        )}

        {add_equip ? (
          <ViewEquipament_editting />
        ) : (
          <>
            <TouchableHighlight onPress={() => set_add_equip(true)}>
              <Label_adicionar_equipamento />
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
            value={watch("observacao")}
            onChangeText={(text) => setValue("observacao", text)}
          />
        </View>

        <View style={styles.rowCenter}>
          <ButtonText handle={onSubmit} text="Salvar" />
        </View>
      </>
    </ModalComponent>
  );
};

export default AdicionarLocal;
