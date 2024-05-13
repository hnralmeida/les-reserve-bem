import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import styles from "../../styles";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import InputDate from "../../components/InputDate";
import functionLib from "../../services/functions";
import ButtonText from "../../components/ButtonText";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";

type FormInputs = {
  id: string;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
};

export default function CadastrarPeriodo(options: any) {
  const [periodo_list, set_periodo_list] = useState<any[]>([]);
  const [editing_index, set_editing_index] = useState(null); // Estado para rastrear o índice do item sendo editado
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
      nome: "",
      dataInicio: new Date(),
      dataFim: new Date(),
    },
  });

  const utils = new functionLib();

  useFocusEffect(
    React.useCallback(() => {
      API.get("/periodos")
        .then((response) => {
          set_periodo_list(response.data);
        })
        .catch((error) => {
          alert("Erro ao carregar os dados. " + error);
        });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_editing_index(index); // Atualiza o índice do item sendo editado
    setValue("nome", periodo_list[index].nome); // Preenche o campo de edição com o nome atual do item
    setValue("dataInicio", periodo_list[index].dataInicio);
    setValue("dataFim", periodo_list[index].dataFim);
  };

  const handleDelete = (id: any) => {
    API.delete("/periodos/" + id).then(() => {
      set_periodo_list(periodo_list.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    console.log(control._formValues.dataFim.toISOString());
    if (control._formValues.nome.trim() !== "") {
      API.put("/periodos/" + periodo_list[index].id, {
        nome: control._formValues.nome,
        dataInicio: control._formValues.dataInicio,
        dataFim: control._formValues.dataFim,
      }).then(() => {
        periodo_list[index].nome = control._formValues.nome; // Atualiza o nome do item na lista
        periodo_list[index].dataInicio = control._formValues.dataInicio; 
        periodo_list[index].dataFim = control._formValues.dataFim; 

        set_editing_index(null); // Limpa o índice do item sendo editado
        setValue("nome", "")
        setValue("dataInicio", new Date())
        setValue("dataFim", new Date())
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/professores.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Período</Text>
          <Text style={[styles.text, styles.row6]}>Início</Text>
          <Text style={[styles.text, styles.row6]}>Fim</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>
        {/* Lista de periodos */}
        <ScrollView style={styles.listBox}>
          {set_periodo_list.length > 0 ? (
            periodo_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/semestres.png")}
                  style={styles.iconElement}
                />

                {editing_index === index
                  ? [
                      <TextInput
                        style={styles.boxBorder}
                        value={watch("nome")}
                        onChangeText={text => setValue("nome", text)}
                      />,
                      <InputDate
                        data_evento={watch("dataInicio")}
                        label_value="dataInicio"
                        set_data_evento={setValue}
                      />,
                      <InputDate
                        data_evento={watch("dataFim")}
                        label_value="dataFim"
                        set_data_evento={setValue}
                      />,
                    ]
                  : [
                      <Text style={styles.textLabel}>{item.nome}</Text>,
                      <Text style={styles.textLabel}>
                        {utils.toReadableDate(item.dataInicio)}
                      </Text>,
                      <Text style={styles.textLabel}>
                        {utils.toReadableDate(item.dataFim)}
                      </Text>,
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
              <Text style={styles.centerText}>Nenhum Período cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
