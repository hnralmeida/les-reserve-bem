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
  observacoes: string;
  equipamento: any;
}

type FormInputs = {
  nomeLocal: string;
  capacidade: string;
  observacoes: string;
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
      nomeLocal: "",
      capacidade: "",
      observacoes: "",
      locaisEquipamentos: [],
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const [is_equipamentos_visible, set_is_equipamentos_visible] =
    useState(false);

  const [local_list, set_local_list] = useState<any[]>([]);

  const [editing_index, set_editing_index] = useState(null);
  const [edited_nome_local, set_edited_nome_local] = useState("");
  const [edited_capacidade, set_edited_capacidade] = useState("");
  const [edited_observacao, set_edited_observacao] = useState("");
  const [edited_equipamentos_local, set_edited_equipamentos_local] = useState(
    []
  );

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
    set_editing_index(index); // Atualiza o índice do item sendo editado
    set_edited_nome_local(local_list[index].nomeLocal); // Preenche o campo de edição com o nome atual do item
    set_edited_capacidade(local_list[index].capacidade);
    set_edited_observacao(local_list[index].observacao);
    set_edited_equipamentos_local(local_list[index].locaisEquipamentos);
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

  const handleSaveEdit = (index: any) => {
    if (edited_nome_local.trim() !== "") {
      API.put("/locais/" + local_list[index].id, {
        nomeLocal: edited_nome_local,
        capacidade: edited_capacidade,
        observacao: edited_observacao,
        locaisEquipamentos: edited_equipamentos_local,
      }).then(() => {
        // Atualiza o campos do item na lista
        local_list[index].nomeLocal = edited_nome_local;
        local_list[index].capacidade = edited_capacidade;
        local_list[index].observacao = edited_observacao;
        local_list[index].locaisEquipamentos = edited_equipamentos_local;

        set_editing_index(null); // Limpa o índice do item sendo editado
        set_edited_nome_local("");
        set_edited_capacidade("");
        set_edited_observacao("");
        set_edited_equipamentos_local([]);
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  function LabelControleEquipamentos({
    locaisList,
    index,
  }: {
    locaisList: any[];
    index: any;
  }) {
    return (
      <>
        <ButtonVisibleModal
          modal_visible={is_equipamentos_visible}
          set_modal_visible={set_is_equipamentos_visible}
        />
        <ControleEquipamentos
          isVisible={is_equipamentos_visible}
          setIsVisible={set_is_equipamentos_visible}
          equipamentList={locaisList[index].locaisEquipamentos}
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
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            localList={local_list}
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
          <Text style={[styles.text, { width: "15%", marginRight: "6.25%" }]}>Equipamentos</Text>
          <Text style={[styles.textActions, {marginRight: "6.25%"}]}>Ações</Text>
        </View>

        <ScrollView style={styles.listBox}>
          {local_list.length > 0 ? (
            local_list.map((item: any, index) => (
              <View style={[styles.row]} key={index}>
                <Image
                  source={require("../../../assets/salas.png")}
                  style={[styles.iconElement]}
                />

                {editing_index === index
                  ? [
                      <TextInput
                        style={[styles.boxBorder, { width: "20%" }]}
                        value={edited_nome_local}
                        onChangeText={set_edited_nome_local}
                      />,
                      <TextInput
                        style={[styles.boxBorder, { width: "20%" }]}
                        value={edited_capacidade}
                        onChangeText={set_edited_capacidade}
                      />,
                      <TextInput
                        style={[styles.boxBorder, { width: "20%" }]}
                        value={edited_observacao}
                        onChangeText={set_edited_observacao}
                      />,
                    ]
                  : [
                      <Text style={styles.textLabel}>{item.nomeLocal}</Text>,
                      <Text style={styles.textLabel}>{item.capacidade}</Text>,
                      <Text style={styles.textLabel}>
                        {item.observacao || "Sem observação"}
                      </Text>,
                      <LabelControleEquipamentos
                        locaisList={local_list}
                        index={index}
                      />,
                    ]}

                {editing_index === index ? (
                  <SaveEdit
                    onCancel={() => set_editing_index(null)}
                    onSave={() => handleSaveEdit(index)}
                  />
                ) : (
                  <>
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
                  </>
                )}
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
