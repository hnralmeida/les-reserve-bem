// EquipmentModal.js
import React, {
  useCallback,
  useState,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  RefreshControl,
  Alert,
  Image,
  TouchableHighlight,
} from "react-native";
import styles from "../../styles";
import API from "../../services/API";
import ModalComponent from "../modal";
import { Control, UseFormSetValue, UseFormWatch, set } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import EquipmentModal from "../Equipamento";
import ButtonText from "../ButtonText";
import ViewEquipamentEditting from "../EditingEquipamentoLocal";

type Props = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  local_list: any[];
  index: any;
};

const AdicionarLocal = ({
  isVisible,
  setIsVisible,
  onClose,
  watch,
  control,
  setValue,
  local_list,
  index,
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

  useEffect(() => {
    API.get("/equipamentos").then((response) => {
      set_equipamentos_list(response.data);
    });
    console.log("id", control._formValues.id);

    API.get("/locais/equipamentos/" + control._formValues.id).then(
      (response) => {
        console.log("response.data: ", response.data);
        set_equipamentos_local(response.data);
      }
    );
  }, [isVisible]);

  const onSubmit = () => {
    if (control._formValues.id) {
      API.put("/locais/" + local_list[index].id, {
        nomeLocal: control._formValues.nomeLocal,
        capacidade: control._formValues.capacidade,
        observacao: control._formValues.observacao,
        locaisEquipamentos: control._formValues.locaisEquipamentos,
      }).then(() => {
        // Atualiza o campos do item na lista
        local_list[index].nomeLocal = control._formValues.nomeLocal;
        local_list[index].capacidade = control._formValues.capacidade;
        local_list[index].observacao = control._formValues.observacao;
        local_list[index].locaisEquipamentos =
          control._formValues.locaisEquipamentos;

        onClose();
      });
    } else {
      API.post("/locais", {
        nomeLocal: control._formValues.nomeLocal,
        capacidade: control._formValues.capacidade,
        observacao: control._formValues.observacao,
        locaisEquipamentos: [],
      })
        .then((response: any) => {
          local_list.push(response.data);

          for (let i = 0; i < equipamentos_local.length; i++) {
            console.log("enviar equipamento: ", equipamentos_local);

            API.post("/locais" + "/equipamentos/" + response.data.id, {
              quantidade: equipamentos_local[i].quantidade,
              equipamento: equipamentos_local[i].equipamento,
              observacao: equipamentos_local[i].observacao,
            }).then(() => {
              onClose();
            });
          }
          set_equipamentos_local([]);
        })
        .catch((error) => {
          alert("Erro ao não identificado, contate o suporte.");
        });
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
      const itemToAdd = {
        quantidade: quantidadeEquipamentos,
        equipamento: equipamentos_list.find(
          (item) => Number(item.id) === Number(equipamentoSelecionado)
        ),
        observacao: observacao,
      };
      //setValue("locaisEquipamentos", item);
      set_equipamentos_local((prevEquipamentos) => [
        ...prevEquipamentos,
        itemToAdd,
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

  const View_equipament_read = (item: any, index: any) => {
    const item_equip = item.item;
    return (
      <>
        <View style={styles.row}>
          <View style={[styles.column, styles.numberInput]}>
            <Text style={styles.box}>{item_equip.quantidade}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.box}>
              {item_equip.equipamento.nomeEquipamento}
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

  const refreshPage = () => {
    API.get("/equipamentos").then((response) => {
      set_equipamentos_list(response.data);
    });
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
          <ViewEquipamentEditting
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            quantidadeEquipamentos={quantidadeEquipamentos}
            setQuantidadeEquipamentos={setQuantidadeEquipamentos}
            equipamentoSelecionado={equipamentoSelecionado}
            setEquipamentoSelecionado={setEquipamentoSelecionado}
            observacao={observacao}
            set_observacao={set_observacao}
            equipamentos_list={equipamentos_list}
            delete_equipamento={delete_equip}
            adicionar_equipamento={adicionarEquipamento}
            refreshPage={refreshPage}
          />
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
