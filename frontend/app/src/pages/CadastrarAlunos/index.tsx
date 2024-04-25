import {useState} from 'react';
import styles from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Text, TouchableOpacity, View } from 'react-native';
import ImportModal from '../../components/ImportFile';
export default function CadastrarAluno(options: any) {
    const [alunoNome, setAlunoNome] = useState('');
    const [numMatricula, setNumMatricula] = useState('');
    

    const handleRegister = () => {
        
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Nome do Aluno</Text>
                <TextInput
                    style={styles.boxBorder}
                    placeholder="Nome do aluno"
                    value={alunoNome}
                    onChangeText={text=> setAlunoNome(text)}
                />
                <Text style={styles.title}>Numero de Matricula</Text>
                <TextInput
                    style={styles.boxBorder}
                    placeholder="Numero de matricula"
                    value={numMatricula}
                    onChangeText={text=> setNumMatricula(text)}
                />
                <View style={styles.rowCenter}>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity> 
                </View>

                <View>
                    <Text style={styles.centerText}>OU</Text>
                </View>

                <View style={styles.rowCenter}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Importar Arquivo</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )


}