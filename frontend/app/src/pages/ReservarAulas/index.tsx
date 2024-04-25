import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../styles';
export default function ReservarAulas(options: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>
            <Text style={styles.text}>Cadastrar</Text>
            <TextInput style={styles.input} placeholder="Nome" />
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Senha" />
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}