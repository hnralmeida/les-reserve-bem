import React from "react";
import { Text, View, Image, TouchableHighlight  } from 'react-native';
import styles from '../../styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stack.routes";

type ConsultarScreenNavigationProp = StackNavigationProp<RootStackParamList, "Consultar">;

interface Props {
  navigation: ConsultarScreenNavigationProp;
}

export default function Consultar({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarHorarios")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/horario.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Horários</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarAlunos")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/alunos.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Alunos</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarDisciplinas")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/disciplinas.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Disciplinas</Text>
                    </>
                </TouchableHighlight>
            </View>
            <View style={styles.buttonRow}>
                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarLocais")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/salas.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Locais</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarProxAula")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/proxAula.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Próxima Aula</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ConsultarAlteracoes")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/alteracoes.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Alterações</Text>
                    </>
                </TouchableHighlight>
            </View>
        </View>
    );
}