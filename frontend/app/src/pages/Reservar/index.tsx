import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableHighlight, Image } from 'react-native';
import styles from '../../styles';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stack.routes";

type ConsultarScreenNavigationProp = StackNavigationProp<RootStackParamList, "Consultar">;

interface Props {
    navigation: ConsultarScreenNavigationProp;
}
export default function Reservar({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonRow}>
                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ReservarAulas")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/aulas.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Aulas</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ReservarEventos")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/eventos.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Eventos</Text>
                    </>
                </TouchableHighlight>

                <TouchableHighlight
                    style={[styles.buttonHome, styles.squareButton]}
                    onPress={() => navigation.navigate("ImportarAulas")}
                    underlayColor="#2F9E41"
                >
                    <>
                        <Image
                            source={require('../../../assets/importarAulas.png')}
                            style={styles.buttonImageHome}
                        />
                        <Text style={styles.buttonText}>Importar Aulas</Text>
                    </>
                </TouchableHighlight>
            </View>

        </View>
    );
}