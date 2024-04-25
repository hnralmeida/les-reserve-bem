import { Text, View, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import styles from '../../styles';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import API from '../../services/API';

export default function ConsultarLocais(options: any) {

    const [local_list, set_local_list] = React.useState<any[]>([]);
    const [local_titulo, set_local_titulo] = React.useState('');

    const [editing_index, set_editing_index] = React.useState(null); // Estado para rastrear o índice do item sendo editado
    const [edited_name, set_edited_name] = React.useState(''); // Estado para armazenar o nome editado
    const [edited_capacidade, set_edited_capacidade] = React.useState(''); // Estado para armazenar o nome editado
    const [edited_observacoes, set_edited_observacoes] = React.useState(''); // Estado para armazenar o nome editado

    useFocusEffect(
        React.useCallback(() => {
            API.get('/locais').then((response) => {
                set_local_list(response.data);
            })
        }, [])
    );

    const handleEdit = (index: any) => {
        set_editing_index(index); // Atualiza o índice do item sendo editado
        set_edited_name(local_list[index].nome); // Preenche o campo de edição com o nome atual do item
        set_edited_capacidade(local_list[index].capacidade);
        set_edited_observacoes(local_list[index].observacao);
    };

    const handleDelete = (id: any) => {
        API.delete('/locais/' + id).then(() => {
            set_local_list(local_list.filter(item => item.id !== id));
        })
    };

    const handleSaveEdit = (index: any) => {
        if (edited_name.trim() !== '') {
            API.put('/locais/' + local_list[index].id,
                {
                    "nome": edited_name,
                    "capacidade": edited_capacidade,
                    "observacao": edited_observacoes
                }
            ).then(() => {
                set_local_titulo('');
                local_list[index].nome = edited_name; // Atualiza o nome do item na lista

                set_editing_index(null); // Limpa o índice do item sendo editado
                set_edited_name(''); // Limpa o nome editado
            })
        } else {
            // Handle empty equipment name
            console.error('Equipment name cannot be empty.');
        }

    };

    return (
        <View style={styles.container}>
            {/* Lista de locaiss */}
            <SafeAreaView style={styles.content}>
                <ScrollView style={styles.listBox}>
                    {
                        set_local_list.length > 0 ?
                            local_list.map((item: any, index) => (
                                <View style={styles.listLine} key={index}>
                                    <Image
                                        source={require('../../../assets/salas.png')}
                                        style={styles.iconElement}
                                    />

                                    {
                                        editing_index === index ? ([
                                            <TextInput
                                                style={[styles.boxBorder, {width: '20%'}]}
                                                value={edited_name}
                                                onChangeText={set_edited_name}
                                            />,
                                            <TextInput
                                                style={[styles.boxBorder, {width: '20%'}]}
                                                value={edited_capacidade}
                                                onChangeText={set_edited_capacidade}
                                            />,
                                            <TextInput
                                                style={[styles.boxBorder, {width: '20%'}]}
                                                value={edited_observacoes}
                                                onChangeText={set_edited_observacoes}
                                            />
                                        ]) : ([
                                            <Text style={styles.textLabel}>{item.nome}</Text>,
                                            <Text style={styles.textLabel}>{item.capacidade}</Text>,
                                            <Text style={styles.textLabel}>{item.observacao}</Text>
                                        ])
                                    }

                                    {
                                        editing_index === index ? (
                                            <TouchableOpacity style={styles.textFocus} onPress={() => handleSaveEdit(index)}>
                                                <Text>Salvar</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <>
                                                <TouchableOpacity style={styles.textActions} onPress={() => handleEdit(index)}>
                                                    <Image
                                                        source={require('../../../assets/edit.png')}
                                                        style={styles.iconElement}
                                                    />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={styles.textActions} onPress={() => handleDelete(item.id)}>
                                                    <Image
                                                        source={require('../../../assets/delete.png')}
                                                        style={styles.iconElement}
                                                    />
                                                </TouchableOpacity>
                                            </>
                                        )
                                    }
                                </View>
                            )) :
                            <View>
                                <Text style={styles.centerText}>Nenhum Período cadastrado.</Text>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView>

        </View>
    );
}