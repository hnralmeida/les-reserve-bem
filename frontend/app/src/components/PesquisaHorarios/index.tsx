import React from "react";
import { TextInput, View } from "react-native";
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
        <View style={[styles.row, { marginBottom: 0 }]}>
          <TextInput
            style={[styles.boxBorder, styles.marginRight]}
            value={watch("input")}
            placeholder="Aluno"
            onChangeText={(text) => setValue("input", text)}
          />
          <Picker
            selectedValue={watch("inputAux1")}
            style={[styles.boxBorder]}
            onValueChange={(itemValue: string) => {
              setValue("inputAux1", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Selecione um periodo"}
              value={0}
            />
            {list_periodos.map((item, index) => (
              <Picker.Item key={index} label={item.nome} value={item.id} />
            ))}
          </Picker>
        </View>
      );
    case "Professor":
      return (
        <View style={[styles.row, { marginBottom: 0 }]}>
          <TextInput
            style={[styles.boxBorder, styles.marginRight]}
            value={watch("input")}
            placeholder="Professor"
            onChangeText={(text) => setValue("input", text)}
          />

          <Picker
            selectedValue={watch("inputAux1")}
            style={[styles.boxBorder]}
            onValueChange={(itemValue: string) => {
              setValue("inputAux1", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Selecione um periodo"}
              value={0}
            />
            {list_periodos.map((item, index) => (
              <Picker.Item key={index} label={item.nome} value={item.id} />
            ))}
          </Picker>
        </View>
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
            <Picker.Item key={index} label={item.nome} value={item.id} />
          ))}
        </Picker>
      );
    case "Locais":
      return (
        <View style={[styles.row, { marginBottom: 0 }]}>
          <Picker
            selectedValue={watch("input")}
            style={[styles.boxBorder, styles.marginRight]}
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

          <Picker
            selectedValue={watch("inputAux1")}
            style={[styles.boxBorder]}
            onValueChange={(itemValue: string) => {
              setValue("inputAux1", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Selecione um periodo"}
              value={0}
            />
            {list_periodos.map((item, index) => (
              <Picker.Item key={index} label={item.nome} value={item.id} />
            ))}
          </Picker>
        </View>
      );
    case "Turma":
      return (
        <View style={[styles.row, { marginBottom: 0 }]}>
          <Picker
            selectedValue={watch("input")}
            style={[styles.boxBorder, styles.marginRight]}
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

          <Picker
            selectedValue={watch("inputAux1")}
            style={[styles.boxBorder]}
            onValueChange={(itemValue: string) => {
              setValue("inputAux1", itemValue);
            }}
          >
            <Picker.Item
              key={"unselectable"}
              style={styles.boxBorder}
              label={"Selecione um periodo"}
              value={0}
            />
            {list_periodos.map((item, index) => (
              <Picker.Item key={index} label={item.nome} value={item.id} />
            ))}
          </Picker>
        </View>
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
