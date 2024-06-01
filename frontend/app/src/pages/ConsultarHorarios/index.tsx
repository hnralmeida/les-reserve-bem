import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Button,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import API from "../../services/API";
import dayjs, { Dayjs } from "dayjs";
import ModalComponent from "../../components/modal";
import SaveEdit from "../../components/SaveEdit";
import { useForm } from "react-hook-form";
import functionLib from "../../services/functions";

type FormInputs = {
  disciplina: any;
  turma: any;
  professor: any;
  local: any;
  horaInicio: string;
  horaFim: string;
  diaSemana: string;
};

export default function ConsultarHorarios(options: any) {
  const select_horario = [
    "Aluno",
    "Professor",
    "Semestre",
    "Sala",
    "Turma",
    "Data",
  ];
  const [modelo, set_modelo] = useState("");
  const [inputSearch, set_inputSearch] = useState("");
  const [list_aulas, set_list_aulas] = useState<any[]>([]);
  const [list_locais, set_list_locais] = useState<any[]>([]);
  const [list_disciplinas, set_list_disciplinas] = useState<any[]>([]);
  const [list_turmas, set_list_turmas] = useState<any[]>([]);
  const [list_professores, set_list_professores] = useState<any[]>([]);

  const utils = new functionLib();

  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      disciplina: null,
      turma: null,
      professor: null,
      local: null,
      horaInicio: "",
      horaFim: "",
      diaSemana: "",
    },
  });
  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [edited_nome, set_edited_nome] = useState(""); // Estado para armazenar o nome editado
  const [edited_local, set_edited_local] = useState(0); // Estado para armazenar o nome editado
  const [edited_observacao, set_edited_observacao] = useState(""); // Estado para armazenar o nome editado
  const [edited_inicio, set_edited_inicio] = useState(dayjs());
  const [edited_fim, set_edited_fim] = useState(dayjs());

  useFocusEffect(
    useCallback(() => {
      API.get("/aulas")
        .then((response) => {
          set_list_aulas(response.data);
          console.log(response.data);
        })
        .then(() => {
          API.get("/locais").then((response) => {
            set_list_locais(response.data);
          });
          API.get("/disciplinas").then((response) => {
            set_list_disciplinas(response.data);
          });
          API.get("/turmas").then((response) => {
            set_list_turmas(response.data);
          });
          API.get("/professores").then((response) => {
            set_list_professores(response.data);
          });
        });
    }, [])
  );

  function DependsOnModelo() {
    switch (modelo) {
      case "Aluno":
        return (
          <>
            <TextInput
              style={styles.boxBorder}
              placeholder="Código de barras"
              value={inputSearch}
              onChangeText={(text) => set_inputSearch(text)}
            />
          </>
        );
      case "Professor":
        return (
          <>
            <TextInput
              style={styles.boxBorder}
              placeholder="RFID"
              value={inputSearch}
              onChangeText={(text) => set_inputSearch(text)}
            />
          </>
        );
      case "Semestre":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione o Semestre"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione o Semestre"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Sala":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione uma sala"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione uma Sala"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Turma":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Selecione um Curso"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione um Curso"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      case "Data":
        return (
          <>
            <Picker
              selectedValue={modelo}
              style={styles.boxBorder}
              placeholder="Escolha uma Sala"
              onValueChange={(itemValue: string) => {
                set_modelo(itemValue);
              }}
            >
              <Picker.Item
                key={"unselectable"}
                label={"Selecione uma Sala"}
                value={0}
              />
              {select_horario.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
          </>
        );
      default:
        return <></>;
    }
  }

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setValue("disciplina", list_aulas[index].disciplina.id);
    setValue("turma", list_aulas[index].turma.id);
    setValue("professor", list_aulas[index].professor.id);
    setValue("local", list_aulas[index].local.id);
    setValue("horaInicio", list_aulas[index].horaInicio);
    setValue("horaFim", list_aulas[index].horaFim);
    setValue("diaSemana", list_aulas[index].diaSemana);
  };

  const handleDelete = (id: any) => {
    API.delete("/aulas/" + id).then(() => {
      set_list_aulas(list_aulas.filter((item) => item.id !== id));
    });
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome da coorde
    !edited_local ? set_edited_local(list_aulas[index].coordenadoria_id) : true;

    if (edited_nome.trim() !== "") {
      API.put("/aulas/" + list_aulas[index].id, {
        id_local: edited_local,
        nome: edited_nome,
        descricao: edited_observacao,
        data_inicio: edited_inicio,
        data_fim: edited_fim,
      }).then(() => {
        list_aulas[index].nome = edited_nome; // Atualiza o nome do item na lista
        list_aulas[index].coordenadoria_id = edited_local; // Atualiza o nome do item na lista

        setEditingIndex(null); // Limpa o índice do item sendo editado
        set_edited_nome(""); // Limpa o nome editado
      });
    } else {
      // Handle empty equipment name
      console.error("Equipment name cannot be empty.");
    }
  };

  const onSubmit = () => {};

  function Delete_after() {
    return (
      <>
        <View style={[styles.listLine, styles.padmargin]}>
          <Image
            source={require("../../../assets/eventos.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text, styles.row6]}>Nome</Text>
          <Text style={[styles.text, styles.row6]}>Local</Text>
          <Text style={[styles.text, styles.row6]}>Início</Text>
          <Text style={[styles.text, styles.row6]}>Fim</Text>
          <Text style={[styles.text, styles.row6]}>Dia</Text>
          <Text style={[styles.text, styles.row6]}>Turma</Text>
          <Text style={[styles.text, styles.row6]}>Professor</Text>
          <Text style={[styles.text, styles.row6]}>Alunos</Text>
          <Text style={[styles.text, styles.row6]}>Ações</Text>
        </View>

        {/* Lista de eventos */}
        <ScrollView style={styles.listBox}>
          {list_aulas.length > 0 ? (
            list_aulas.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <View style={styles.listLine} key={index}>
                  <Image
                    source={require("../../../assets/aulas.png")}
                    style={styles.iconElement}
                  />

                  {editingIndex === index ? (
                    <Picker
                      selectedValue={watch("disciplina")}
                      style={[styles.input, styles.row128]}
                      placeholder="Disciplina"
                      onValueChange={(itemValue: string) => {
                        setValue("disciplina", itemValue);
                      }}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione uma disciplina"}
                        value={0}
                      />
                      {list_disciplinas.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nome}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.disciplina.nome}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      selectedValue={watch("local")}
                      style={[styles.input, styles.row128]}
                      placeholder="Sala"
                      onValueChange={(itemValue: string) => {
                        setValue("local", itemValue);
                      }}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione uma Sala para a aula"}
                        value={0}
                      />
                      {list_locais.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nomeLocal}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.local.nomeLocal}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      style={[styles.input, styles.row128]}
                      selectedValue={watch("horaInicio")}
                      onValueChange={(target: any) => [
                        setValue("horaInicio", target),
                      ]}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione um Horário"}
                        value={0}
                      />
                      {utils.arrayAulas().map((item, key) => (
                        <Picker.Item
                          key={key}
                          label={utils.toHours(item)}
                          value={utils.toHours(item)}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.horaInicio}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      style={[styles.input, styles.row128]}
                      selectedValue={watch("horaFim")}
                      onValueChange={(target: any) => [
                        setValue("horaFim", target),
                      ]}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione um Horário"}
                        value={0}
                      />
                      {utils.arrayAulas().map((item, key) => (
                        <Picker.Item
                          key={key}
                          label={utils.toHours(item)}
                          value={utils.toHours(item)}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.horaFim}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      style={[styles.input, styles.row128]}
                      selectedValue={watch("diaSemana")}
                      onValueChange={(target: any) => [
                        setValue("diaSemana", target),
                      ]}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione um dia da semana"}
                        value={0}
                      />
                      {utils.arrayDiasDaSemana().map((item, key) => (
                        <Picker.Item key={key} label={item} value={item} />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.diaDaSemana}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      selectedValue={watch("turma")}
                      style={[styles.input, styles.row128]}
                      placeholder="Sala"
                      onValueChange={(itemValue: string) => {
                        setValue("turma", itemValue);
                      }}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione uma Turma"}
                        value={0}
                      />
                      {list_turmas.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nome}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.turma.nome}
                    </Text>
                  )}

                  {editingIndex === index ? (
                    <Picker
                      selectedValue={watch("professor")}
                      style={[styles.input, styles.row128]}
                      placeholder="Sala"
                      onValueChange={(itemValue: string) => {
                        setValue("professor", itemValue);
                      }}
                    >
                      <Picker.Item
                        key={"unselectable"}
                        label={"Selecione um professor"}
                        value={0}
                      />
                      {list_professores.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.nome}
                          value={item.id}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <Text style={[styles.textLabel, styles.row6]}>
                      {item.professor.nome}
                    </Text>
                  )}

                  <TouchableHighlight
                    style={[styles.buttonText, styles.row6]}
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    <Text style={[styles.text]}>Clique para ler</Text>
                  </TouchableHighlight>

                  <ModalComponent
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    onClose={() => setIsVisible(!isVisible)}
                  >
                    <View>
                      {editingIndex === index ? (
                        <>
                          <Text style={styles.title}>Não há alunos</Text>
                        </>
                      ) : (
                        <Text style={styles.title}>Não há alunos</Text>
                      )}
                    </View>
                  </ModalComponent>

                  {editingIndex === index ? (
                    <SaveEdit
                      onCancel={() => setEditingIndex(null)}
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
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhuma aula cadastrada.</Text>
            </View>
          )}
        </ScrollView>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.spaced]}>
          <Picker
            selectedValue={modelo}
            style={styles.boxBorder}
            placeholder="modelo"
            onValueChange={(itemValue: string) => {
              set_modelo(itemValue);
            }}
          >
            {select_horario.map((item, index) => (
              <Picker.Item key={index} label={item} value={item} />
            ))}
          </Picker>

          <DependsOnModelo />

          {modelo != "" && modelo ? (
            <View style={{ alignSelf: "center" }}>
              <TouchableHighlight style={styles.button} onPress={onSubmit}>
                <Text style={styles.textColorWhite}> Buscar </Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>

        {/* Listagem */}

        <ScrollView style={styles.column}>
          <Delete_after />
          {/* {list_aulas.length > 0 ? (
            list_aulas.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/aulas.png")}
                  style={styles.iconElement}
                />

                {editingIndex === index ? (
                  <TextInput
                    style={styles.boxBorder}
                    value={edited_nome}
                    onChangeText={set_edited_nome}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.nome}</Text>
                )}
                {editingIndex === index ? (
                  <Picker
                    placeholder="Local"
                    style={styles.boxBorder}
                    onValueChange={(itemValue: string) => {
                      set_edited_local(Number(itemValue));
                    }}
                  >
                    {list_locais.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.nome}
                        value={item.id}
                      />
                    ))}
                  </Picker>
                ) : (
                  <Text style={styles.textLabel}>
                    {
                      list_locais.find(
                        (obj) => Number(obj.id) == Number(item.id_local)
                      )?.nome
                    }
                  </Text>
                )}

                {editingIndex === index ? (
                  <TextInput
                    style={styles.boxBorder}
                    value={edited_observacao}
                    onChangeText={set_edited_observacao}
                    multiline={true}
                    numberOfLines={4}
                  />
                ) : (
                  <Text style={styles.textLabel}>{item.descricao}</Text>
                )}

                {editingIndex === index ? (
                  <TouchableOpacity
                    style={styles.textFocus}
                    onPress={() => handleSaveEdit(index)}
                  >
                    <Text>Salvar</Text>
                  </TouchableOpacity>
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
              <Text style={styles.centerText}>Nenhum horário selecionado.</Text>
            </View>
          )} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
