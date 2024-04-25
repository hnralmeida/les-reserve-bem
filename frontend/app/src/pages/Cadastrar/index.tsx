import React from "react";
import { Text, View, Image, TouchableHighlight  } from 'react-native';
import styles from '../../styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stack.routes";

type CadastrarScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cadastrar">;

interface Props {
  navigation: CadastrarScreenNavigationProp;
}

export default function Cadastrar({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarLocal")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/salas.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Local</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarCoordenadoria")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/coordenadorias.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Coordenadoria</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarProfessor")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/professores.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Professores</Text>
                    </>
                </TouchableHighlight>
            </View>
            <View style={styles.buttonRow}>
                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarCoordenadorTurno")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/turno.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Coordenador de Turno</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarPeriodo")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/semestres.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Período</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("CadastrarAlunos")}
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
            </View>
        </View>
    );
}