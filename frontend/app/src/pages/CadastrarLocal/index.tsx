import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EquipmentModal from "../../components/Equipamento";
import { ScrollView } from "react-native-gesture-handler";
import API from "../../services/API";
import ButtonText from "../../components/ButtonText";
import { useForm } from "react-hook-form";
import AdicionarLocal from "../../components/AdicionarLocal";
import ActivateModalButton from "../../components/ButtonAddModal";
import SaveEdit from "../../components/SaveEdit";
import ButtonVisibleModal from "../../components/ButtonVisibleModal";
import ControleEquipamentos from "../../components/ControleEquipamentos";

interface Equipamento {
  quantidade: string;
  observacao: string;
  equipamento: any;
}

type FormInputs = {
  id: string;
  nomeLocal: string;
  capacidade: string;
  observacao: string;
  locaisEquipamentos: Equipamento[];
};

const CadastrarLocal = () => {
  const navigation = useNavigation();

  // input
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      id: "",
      nomeLocal: "",
      capacidade: "",
      observacao: "",
      locaisEquipamentos: [],
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [is_equipamentos_visible, set_is_equipamentos_visible] =
    useState(false);

  const [local_list, set_local_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      API.get("/locais").then((response) => {
        const data = response.data;
        // sort in alphabetical order
        data.sort((a: any, b: any) => {
          return a.nomeLocal.localeCompare(b.nomeLocal);
        });
        set_local_list(data);
      });
    }, [is_equipamentos_visible])
  );

  const handleEdit = (index: any) => {
    setIsVisible(true);

    set_editing_index(index); // Atualiza o índice do item sendo editado
    setValue("id", local_list[index].id);
    setValue("nomeLocal", local_list[index].nomeLocal);
    setValue("capacidade", local_list[index].capacidade);
    setValue("observacao", local_list[index].observacao);
    setValue("locaisEquipamentos", local_list[index].locaisEquipamentos);
  };

  const handleDelete = (id: any) => {
    API.delete("/locais/" + id)
      .then(() => {
        set_local_list(local_list.filter((item) => item.id !== id));
      })
      .catch((error) => {
        alert(
          "Erro ao deletar local, provavelmente há equipamentos associadas a ele."
        );
      });
  };

  function onClose() {
    set_editing_index(null); // Limpa o índice do item sendo editado
    setValue("id", "");
    setValue("nomeLocal", "");
    setValue("capacidade", "");
    setValue("observacao", "");
    setValue("locaisEquipamentos", []);
  }

  function LabelControleEquipamentos({
    item,
  }: {
    item: any;
  }) {
    API.get("/locais/equipamentos/" + item.id).then((response) => {
      item.locaisEquipamentos = response.data;
    });
    return (
      <>
        <ButtonVisibleModal
          modal_visible={is_equipamentos_visible}
          set_modal_visible={set_is_equipamentos_visible}
        />
        <ControleEquipamentos
          isVisible={is_equipamentos_visible}
          setIsVisible={set_is_equipamentos_visible}
          equipamentList={item.locaisEquipamentos}
          onClose={() => set_is_equipamentos_visible(!is_equipamentos_visible)}
        />
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarLocal
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => {
              setIsVisible(!isVisible), onClose();
            }}
            watch={watch}
            control={control}
            setValue={setValue}
            local_list={local_list}
            index={editing_index}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Local"}
          />
        </View>
        <View style={[styles.row]}>
          <Image
            source={require("../../../assets/salas.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text]}>Nome</Text>
          <Text style={[styles.text]}>Capacidade</Text>
          <Text style={[styles.text]}>Observação</Text>
          <Text style={[styles.text, { width: "15%", marginRight: "6.25%" }]}>
            Equipamentos
          </Text>
          <View style={styles.box128}>
            <Text style={[styles.textActions]}>Ações</Text>
          </View>
        </View>

        <ScrollView style={styles.listBox}>
          {local_list.length > 0 ? (
            local_list.map((item: any, index: any) => (
              <View style={[styles.row]} key={index}>
                <Image
                  source={require("../../../assets/salas.png")}
                  style={[styles.iconElement]}
                />
                <Text style={styles.textLabel}>{item.nomeLocal}</Text>
                <Text style={styles.textLabel}>{item.capacidade}</Text>
                <Text style={styles.textLabel}>
                  {item.observacao || "Sem observação"}
                </Text>
                <LabelControleEquipamentos
                  item={local_list[index]}
                />
                <TouchableHighlight
                  style={styles.textActions}
                  onPress={() => handleEdit(index)}
                >
                  <Image
                    source={require("../../../assets/edit.png")}
                    style={styles.iconElement}
                  />
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.textActions}
                  onPress={() => handleDelete(item.id)}
                >
                  <Image
                    source={require("../../../assets/delete.png")}
                    style={styles.iconElement}
                  />
                </TouchableHighlight>
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhum local cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default CadastrarLocal;
