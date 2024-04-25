import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

//MainPages
import Login from "../pages/Login";
import Home from "../pages/Home";
import Cadastrar from "../pages/Cadastrar";
import Consultar from "../pages/Consultar";
import Reservar from "../pages/Reservar";

//ConsultarPages
import ConsultarLocais from "../pages/ConsultarLocais";
import ConsultarProxAula from "../pages/ConsultarProxAula";
import ConsultarDisciplinas from "../pages/ConsultarDisciplinas";
import ConsultarAlunos from "../pages/ConsultarAlunos";
import ConsultarAlteracoes from "../pages/ConsultarAlteracoes";
import ConsultarHorarios from "../pages/ConsultarHorarios";

//CadastrarPages
import CadastrarLocal from "../pages/CadastrarLocal";
import CadastrarAlunos from "../pages/CadastrarAlunos";
import CadastrarCoordenadoria from "../pages/CadastrarCoordenadoria";
import CadastrarCoordenadorTurno from "../pages/CadastrarCoordenadorTurno";
import CadastrarPeriodo from "../pages/CadastrarPeriodo";
import CadastrarProfessor from "../pages/CadastrarProfessor";
import ReservarAulas from "../pages/ReservarAulas";
import ReservarEventos from "../pages/ReservarEventos";
import ImportarAulas from "../pages/ImportarAulas";
import BackHeader from "../components/Header";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Cadastrar: undefined;
  Consultar: undefined;
  Reservar: undefined;
  ConsultarAlteracoes: undefined;
  ConsultarHorarios: undefined;
  ConsultarDisciplinas: undefined;
  ConsultarProxAula: undefined;
  ConsultarSalas: undefined;
  ConsultarAlunos: undefined;
  CadastrarLocal: undefined;
  CadastrarAlunos: undefined;
  CadastrarCoordenadoria: undefined;
  CadastrarCoordenadorTurno: undefined;
  CadastrarPeriodo: undefined;
  CadastrarProfessor: undefined;
  ReservarAulas: undefined;
  ReservarEventos: undefined;
  ImportarAulas: undefined;
};

export default function RootStack() {
  const nav = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <BackHeader navigation={nav} />, // Use the custom header component
        headerShown: true, // Hide the default header
        headerBackTitleVisible: false,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastrar"
        component={Cadastrar}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Consultar"
        component={Consultar}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="Reservar"
        component={Reservar}
        options={{ headerTitle: "" }}
      />

      <Stack.Screen
        name="ConsultarAlteracoes"
        component={ConsultarAlteracoes}
      />
      <Stack.Screen name="ConsultarHorarios" component={ConsultarHorarios} />
      <Stack.Screen
        name="ConsultarDisciplinas"
        component={ConsultarDisciplinas}
      />
      <Stack.Screen name="ConsultarProxAula" component={ConsultarProxAula} />
      <Stack.Screen name="ConsultarLocais" component={ConsultarLocais} />
      <Stack.Screen name="ConsultarAlunos" component={ConsultarAlunos} />

      <Stack.Screen name="CadastrarLocal" component={CadastrarLocal} />
      <Stack.Screen name="CadastrarAlunos" component={CadastrarAlunos} />
      <Stack.Screen
        name="CadastrarCoordenadoria"
        component={CadastrarCoordenadoria}
      />
      <Stack.Screen
        name="CadastrarCoordenadorTurno"
        component={CadastrarCoordenadorTurno}
      />
      <Stack.Screen name="CadastrarPeriodo" component={CadastrarPeriodo} />
      <Stack.Screen
        name="CadastrarProfessor"
        component={CadastrarProfessor}
        options={( ) => ({ title: "Cadastrar Professor" })}
      />

      <Stack.Screen name="ReservarAulas" component={ReservarAulas} />
      <Stack.Screen name="ReservarEventos" component={ReservarEventos} />
      <Stack.Screen name="ImportarAulas" component={ImportarAulas} />
    </Stack.Navigator>
  );
}
