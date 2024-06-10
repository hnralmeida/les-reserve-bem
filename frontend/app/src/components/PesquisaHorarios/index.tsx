import React from "react";
import { TextInput } from "react-native";
import styles from "../../styles";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import InputDate from "../InputDate";

type Props = {
  watch: UseFormWatch<any>;
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  modelo: string;
  list_periodos: any[];
  list_locais: any[];
  list_turmas: any[];
};

export function PesquisaHorarios({
  watch,
  control,
  setValue,
  modelo,
  list_periodos,
  list_locais,
  list_turmas,
}: Props) {
  switch (modelo) {
    case "Aluno":
      return (
        <>
          <TextInput
            style={[styles.boxBorder, { width: "100%" }]}
            value={watch("input")}
            placeholder="Aluno"
            onChangeText={(text) => setValue("input", text)}
          />
        </>
      );
    case "Professor":
      return (
        <TextInput
          style={[styles.boxBorder, { width: "100%" }]}
          value={watch("input")}
          placeholder="Professor"
          onChangeText={(text) => setValue("input", text)}
        />
      );
    case "Periodo":
      return (
        <Picker
          style={[styles.boxBorder]}
          selectedValue={watch("input")}
          onValueChange={(itemValue: string) => {
            setValue("input", itemValue);
          }}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione um período"}
            value={0}
          />
          {list_periodos.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.Periodo}
              value={item.Periodo}
            />
          ))}
        </Picker>
      );
    case "Locais":
      return (
        <Picker
          selectedValue={watch("input")}
          style={[styles.boxBorder]}
          onValueChange={(itemValue: string) => {
            setValue("input", itemValue);
          }}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione um local"}
            value={0}
          />
          {list_locais.map((item, index) => (
            <Picker.Item key={index} label={item.nomeLocal} value={item.id} />
          ))}
        </Picker>
      );
    case "Turma":
      return (
        <Picker
          selectedValue={watch("input")}
          style={[styles.boxBorder]}
          placeholder="turma"
          onValueChange={(itemValue: string) => {
            setValue("input", itemValue);
          }}
        >
          <Picker.Item
            key={"unselectable"}
            style={styles.boxBorder}
            label={"Selecione uma turma"}
            value={0}
          />
          {list_turmas.map((item, index) => (
            <Picker.Item key={index} label={item.nome} value={item.id} />
          ))}
        </Picker>
      );
    case "Data":
      return (
        <InputDate
          data_evento={watch("data")}
          label_value="data"
          set_data_evento={setValue}
        />
      );
    default:
      return null;
  }
}
