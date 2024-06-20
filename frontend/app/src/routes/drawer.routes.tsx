import React, { useState } from "react";
import { Text, View } from "react-native";
import { StackRouter, useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from "react-native-gesture-handler";
import RootStack from "./stack.routes";

// Páginas
import Cadastrar from "../pages/Cadastrar";
import Consultar from "../pages/Consultar";
import Reservar from "../pages/Reservar";
import Home from "../pages/Home";
//CadastrarPages
import CadastrarSala from "../pages/CadastrarLocal";
import CadastrarAlunos from "../pages/CadastrarAlunos";
import CadastrarCoordenadoria from "../pages/CadastrarCoordenadoria";
import CadastrarCoordenadorTurno from "../pages/CadastrarCoordenadorTurno";
import CadastrarPeriodo from "../pages/CadastrarPeriodo";
import CadastrarProfessor from "../pages/CadastrarProfessor";

// componentes
import { createDrawerNavigator } from "@react-navigation/drawer";
import EquipmentModal from "../components/Equipamento";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../styles";
import DrawerIndex from "./drawer.index";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawStack() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerIndex {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: colors.whiteColor,
        headerStyle: {
          backgroundColor: colors.primaryColor,
        },
        drawerStyle: {
          backgroundColor: colors.whiteColor,
        },
      }}
    >
      <Drawer.Screen name="Home" component={RootStack} />
      <Drawer.Screen name="Consultar" component={Consultar} />
      <Drawer.Screen name="Cadastrar" component={Cadastrar} />

      <Drawer.Screen name="Reservar" component={Reservar} />

      <Drawer.Screen
        name="Equipamento"
        options={{
          drawerLabel: "Equipamento",
        }}
      >
        {(props) => (
          <TouchableHighlight onFocus={() => setModalVisible(!modalVisible)}>
            <EquipmentModal
              isVisible={modalVisible}
              setIsVisible={setModalVisible}
              onClose={closeModal}
              {...props}
            />
          </TouchableHighlight>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
