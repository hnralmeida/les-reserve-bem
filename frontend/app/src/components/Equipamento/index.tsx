// EquipmentModal.js
import React, { useCallback, useState, SetStateAction, Dispatch } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Modal, View, Text, TextInput, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import styles from '../../styles';
import API from '../../services/API';

type Props = {
  isVisible: boolean,
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onClose: () => void
}

const EquipmentModal = ({ isVisible, setIsVisible, onClose }: Props) => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentList, setEquipmentList] = useState<any[]>([]);

  const [editingIndex, setEditingIndex] = useState(null); // Estado para rastrear o índice do item sendo editado
  const [editedName, setEditedName] = useState(''); // Estado para armazenar o nome editado

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [refreshing]);

  useFocusEffect(
    React.useCallback(() => {
      if (navigation.getState()?.index == 4)
        setIsVisible(true);
      API.get('/equipamentos/').then((response) => {
        setEquipmentList(response.data);
      });
    }, [])
  );

  const handleRegister = () => {
    // Check if the equipment name is not empty before registering
    if (equipmentName.trim() !== '') {
      API.post('/equipamentos',
        {
          "nome": equipmentName
        }
      ).then((response: any) => {
        setEquipmentName('');
        console.log(response.data);
        equipmentList.push(response.data[0]);

        onRefresh();
      })

    } else {
      // Handle empty equipment name
      console.error('Equipment name cannot be empty.');
    }
  };

  const handleEdit = (index: any) => {
    setEditingIndex(index); // Atualiza o índice do item sendo editado
    setEditedName(equipmentList[index].nome); // Preenche o campo de edição com o nome atual do item
  };

  const handleDelete = (id: any) => {
    API.delete('/equipamentos/' + id);
    // remove o item no index no valor id de equipmentList
    setEquipmentList(equipmentList.filter(equipment => equipment.id !== id));

    onRefresh();
  };

  const handleSaveEdit = (index: any) => {
    // Aqui você pode adicionar lógica para salvar as alterações feitas no nome do item
    API.put('/equipamentos/' + equipmentList[index].id,
      {
        "nome": editedName
      }
    ).then((data: any) => {
      console.log('Salvando alterações para o item com id', equipmentList[index].id, 'e novo nome', editedName);
      setEquipmentName('');

      setEditingIndex(null); // Limpa o índice do item sendo editado
      setEditedName(''); // Limpa o nome editado

      equipmentList[index].nome = editedName; // Atualiza o nome do item na lista
      onRefresh();
    })
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar equipamentos</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome do equipmento"
            value={equipmentName}
            onChangeText={text => setEquipmentName(text)}
          />

          <View style={styles.edgeButton}>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listBox}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {
              equipmentList.length > 0 ?
                equipmentList.map((item: any, index) => (
                  <View style={styles.listLine} key={item.id}>
                    <Text style={styles.textActions}>Ícone</Text>

                    {
                      editingIndex === index ? (
                        <TextInput
                          style={styles.input}
                          value={editedName}
                          onChangeText={setEditedName}
                        />
                      ) : (
                        <Text style={styles.textLabel}>{item.nome}</Text>
                      )
                    }

                    {
                      editingIndex === index ? (
                        <TouchableOpacity style={styles.textFocus} onPress={() => handleSaveEdit(index)}>
                          <Text>Salvar</Text>
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity style={styles.textActions} onPress={() => handleEdit(index)}>
                            <Text>Editar</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.textActions} onPress={() => handleDelete(item.id)}>
                            <Text>Excluir</Text>
                          </TouchableOpacity>
                        </>
                      )
                    }
                  </View>
                )) :
                <View>
                  <Text style={styles.centerText}>Nenhum equipamento cadastrado.</Text>
                </View>
            }
          </ScrollView>

          <View style={styles.rowCenter}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default EquipmentModal;
