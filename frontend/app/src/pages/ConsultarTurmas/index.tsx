import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "../../styles";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import API from "../../services/API";
import { set, useForm } from "react-hook-form";
import AdicionarTurma from "../../components/AdicionarTurma";
import ActivateModalButton from "../../components/ButtonAddModal";
import SaveEdit from "../../components/SaveEdit";

type FormInputs = {
  id: string;
  nome: string;
  anoInicio: string;
};

export default function ConsultarTurmas(options: any) {
  const [turmas_list, set_turmas_list] = React.useState<any[]>([]);
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
      nome: "",
      anoInicio: "",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const [editing_index, set_editing_index] = React.useState(null); // Estado para rastrear o índice do item sendo editado

  useFocusEffect(
    React.useCallback(() => {
      API.get("/turmas").then((response) => {
        set_turmas_list(response.data);
      });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_editing_index(index); // Atualiza o índice do item sendo editado
    setValue("nome", turmas_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("anoInicio", turmas_list[index].anoInicio);
  };

  const handleDelete = (id: any) => {
    API.delete("/turmas/" + id).then(() => {
      set_turmas_list(turmas_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    if (control._formValues.nome.trim() !== "") {
      API.put("/turmas/" + turmas_list[index].id, {
        nome: control._formValues.nome,
        anoInicio: control._formValues.anoInicio,
      }).then(() => {
        turmas_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        turmas_list[index].anoInicio = control._formValues.anoInicio; // Atualiza o nome do item na lista

        setValue("nome", ""); // Limpa o campo de edição
        setValue("anoInicio", ""); // Limpa o campo de edição
        set_editing_index(null); // Limpa o índice do item sendo editado
      });
    } else {
      // Handle empty equipment name
      alert("Campos não podem estar vazios");
    }
  };

  return (
    <View style={styles.container}>
      {/* Lista de turmass */}
      <SafeAreaView style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <AdicionarTurma
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            onClose={() => setIsVisible(!isVisible)}
            watch={watch}
            control={control}
            setValue={setValue}
            turmasList={turmas_list}
          />
          <ActivateModalButton
            set_modal_visible={setIsVisible}
            modal_visible={isVisible}
            text={"Turma"}
          />
        </View>

        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/turmas.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text]}>Nome</Text>
          <Text style={[styles.text]}>Ano de Início</Text>
          <Text style={[styles.text, { width: "50%" }]}>Ações</Text>
        </View>
        <ScrollView style={styles.listBox}>
          {set_turmas_list.length > 0 ? (
            turmas_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/turmas.png")}
                  style={styles.iconElement}
                />

                {editing_index === index
                  ? [
                      <TextInput
                        style={[styles.boxBorder, { width: "20%" }]}
                        value={watch("nome")}
                        onChangeText={(text) => setValue("nome", text)}
                      />,
                      <TextInput
                        style={[styles.boxBorder, { width: "20%" }]}
                        value={watch("anoInicio")}
                        onChangeText={(text) => setValue("anoInicio", text)}
                      />,
                    ]
                  : [
                      <Text style={styles.textLabel}>{item.nome}</Text>,
                      <Text style={styles.textLabel}>{item.anoInicio}</Text>,
                    ]}

                {editing_index === index ? (
                  <SaveEdit
                    onCancel={() => set_editing_index(null)}
                    onSave={() => handleSaveEdit(index)}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.textActions}
                      onPress={() => handleEdit(index)}
                    >
                      <Image
                        source={require("../../../assets/edit.png")}
                        style={styles.iconElement}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.textActions}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Image
                        source={require("../../../assets/delete.png")}
                        style={styles.iconElement}
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhuma turma cadastrada.</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
