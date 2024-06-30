import React, { useState } from "react";
import styles from "../../styles";
import { useFocusEffect } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import {
  Image,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { useForm } from "react-hook-form";
import API from "../../services/API";
import AdicionarAluno from "../../components/AdicionarAluno";
import ActivateModalButton from "../../components/ButtonAddModal";
import { Picker } from "@react-native-picker/picker";
import SaveEdit from "../../components/SaveEdit";
import UploadArquivo from "../../components/UploadArquivo";
import ButtonVisibleModal from "../../components/ButtonVisibleModal";
import ControleAulaAluno from "../../components/ControleAulaAluno";

type FormInputs = {
  id: string;
  nome: string;
  matricula: string;
  coordenadoria: string;
  turma: string;
  email: string;
};

export default function CadastrarAluno(options: any) {
  const [coordenadoria_list, set_coordenadoria_list] = useState<any[]>([]);
  const [aluno_list, set_aluno_list] = useState<any[]>([]);
  const [turma_list, set_turma_list] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado

  const [upload_visible, set_upload_visible] = useState(false); // Estado para controlar a visibilidade do modal de importação de arquivo
  const [modal_visible, set_modal_visible] = useState(false);
  const [isAulasVisible, setIsAulasVisible] = useState(false);
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
      matricula: "",
      coordenadoria: "",
      turma: "",
      email: "",
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // Função para carregar os dados iniciais da tela

      API.get("/alunos")
        .then((response) => {
          const data = response.data;
          // sort in alphabetical order
          data.sort((a: any, b: any) => {
            return a.nome.localeCompare(b.nome);
          });
          set_aluno_list(data);
        })
        .then(() => {
          API.get("/coordenadorias").then((response) => {
            const data = response.data;
            // sort in alphabetical order
            data.sort((a: any, b: any) => {
              return a.nome.localeCompare(b.nome);
            });
            set_coordenadoria_list(data);
          });
        });
      API.get("/turmas").then((response) => {
        const data = response.data;
        // sort in alphabetical order
        data.sort((a: any, b: any) => {
          return a.nome.localeCompare(b.nome);
        });
        set_turma_list(data);
      });
    }, [])
  );

  const handleEdit = (index: any) => {
    set_modal_visible(true);
    setEditingIndex(index);
    setValue("id", aluno_list[index].id);
    setValue("nome", aluno_list[index].nome);
    setValue("matricula", aluno_list[index].matricula);
    setValue("email", aluno_list[index].email);
    setValue("turma", aluno_list[index].turma.id);
    setValue("coordenadoria", aluno_list[index].coordenadoria.id);
  };

  const handleDelete = (id: any) => {
    API.delete("/alunos/" + id).then(() => {
      set_aluno_list(aluno_list.filter((item) => item.id !== id));
    });
  };

  function onClose() {
    setValue("id", "");
    setValue("nome", "");
    setValue("matricula", "");
    setValue("email", "");
    setValue("coordenadoria", "");
    setValue("turma", "");

    setEditingIndex(null); // Limpa o índice do item sendo editado
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.rowFlexEnd, styles.marginTop]}>
          <UploadArquivo
            isVisible={upload_visible}
            setIsVisible={set_upload_visible}
            onClose={() => set_upload_visible(false)}
            list={aluno_list}
            setList={set_aluno_list}
          />
          <View style={styles.marginRight}>
            <ActivateModalButton
              modal_visible={upload_visible}
              set_modal_visible={set_upload_visible}
              text={"Importar"}
            />
          </View>

          <AdicionarAluno
            isVisible={modal_visible}
            setIsVisible={set_modal_visible}
            onClose={() => {
              set_modal_visible(!modal_visible), onClose();
            }}
            watch={watch}
            control={control}
            setValue={setValue}
            aluno_list={aluno_list}
            coordenadoria_list={coordenadoria_list}
            turma_list={turma_list}
            index={editingIndex}
          />

          <ActivateModalButton
            set_modal_visible={set_modal_visible}
            modal_visible={modal_visible}
            text={"Aluno"}
          />
        </View>
        <View style={[styles.listLine]}>
          <Image
            source={require("../../../assets/alunos.png")}
            style={[styles.iconElement]}
          />
          <Text style={[styles.text]}>Nome</Text>
          <Text style={[styles.text]}>Matricula</Text>
          <Text style={[styles.text]}>Email</Text>
          <Text style={[styles.text]}>Turma</Text>
          <Text style={[styles.text]}>Coordenadoria</Text>
          <Text style={[styles.text]}>Aulas</Text>
          <View style={styles.box128}>
            <Text style={[styles.text]}>Ações</Text>
          </View>
        </View>

        {/* Lista de alunos */}
        <ScrollView style={styles.listBox}>
          {aluno_list.length > 0 ? (
            aluno_list.map((item: any, index) => (
              <View style={styles.listLine} key={index}>
                <Image
                  source={require("../../../assets/alunos.png")}
                  style={[styles.iconElement]}
                />

                <Text style={styles.textLabel}>{item.nome}</Text>

                <Text style={styles.textLabel}>{item.matricula}</Text>

                <Text style={styles.textLabel}>{item.email}</Text>

                <Text style={styles.textLabel}>
                  {item.turma ? item.turma.nome : "Sem turma"}
                </Text>

                <Text style={styles.textLabel}>
                  {item.coordenadoria
                    ? item.coordenadoria.nome
                    : "Sem coordenadoria"}
                </Text>

                <View style={[styles.textLabel, { width: "15%" }]}>
                  <ButtonVisibleModal
                    modal_visible={isAulasVisible}
                    set_modal_visible={setIsAulasVisible}
                    origin="aula"
                  />
                  <ControleAulaAluno
                    isVisible={isAulasVisible}
                    setIsVisible={setIsAulasVisible}
                    onClose={() => setIsAulasVisible(!isAulasVisible)}
                  />
                </View>

                <View style={[styles.row]}>
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
              </View>
            ))
          ) : (
            <View>
              <Text style={styles.centerText}>Nenhum aluno cadastrado.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
