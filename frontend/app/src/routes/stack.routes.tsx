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
import ConsultarTurmas from "../pages/ConsultarTurmas";
import ConsultarProxAula from "../pages/ConsultarProxAula";
import ConsultarDisciplinas from "../pages/ConsultarDisciplinas";
import ConsultarEventos from "../pages/ConsultarEventos";
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
  ConsultarTurmas: undefined;
  ConsultarEventos: undefined;
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
        component={Home}
        name="Home"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        component={Cadastrar}
        name="Cadastrar"
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        component={Consultar}
        name="Consultar"
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        component={Reservar}
        name="Reservar"
        options={{ headerTitle: "" }}
      />

      <Stack.Screen
        name="ConsultarAlteracoes"
        component={ConsultarAlteracoes}
        options={() => ({ title: "Consultar Alteracoes" })}
      />
      <Stack.Screen
        name="ConsultarHorarios"
        component={ConsultarHorarios}
        options={() => ({ title: "Consultar Horarios" })}
      />
      <Stack.Screen
        name="ConsultarDisciplinas"
        component={ConsultarDisciplinas}
        options={() => ({ title: "Consultar Disciplina" })}
      />
      <Stack.Screen
        name="ConsultarProxAula"
        component={ConsultarProxAula}
        options={() => ({ title: "Consultar ProxAula" })}
      />
      <Stack.Screen
        name="ConsultarTurmas"
        component={ConsultarTurmas}
        options={() => ({ title: "Consultar Turmas" })}
      />
      <Stack.Screen
        name="ConsultarEventos"
        component={ConsultarEventos}
        options={() => ({ title: "Consultar Eventos" })}
      />

      <Stack.Screen
        name="CadastrarLocal"
        component={CadastrarLocal}
        options={() => ({ title: "Cadastrar Local" })}
      />
      <Stack.Screen
        name="CadastrarAlunos"
        component={CadastrarAlunos}
        options={() => ({ title: "Cadastrar Alunos" })}
      />
      <Stack.Screen
        name="CadastrarCoordenadoria"
        component={CadastrarCoordenadoria}
        options={() => ({ title: "Cadastrar Coordenadoria" })}
      />
      <Stack.Screen
        name="CadastrarCoordenadorTurno"
        component={CadastrarCoordenadorTurno}
        options={() => ({ title: "Cadastrar Coordenador de Turno" })}
      />
      <Stack.Screen
        name="CadastrarPeriodo"
        component={CadastrarPeriodo}
        options={() => ({ title: "Cadastrar Periodo" })}
      />
      <Stack.Screen
        name="CadastrarProfessor"
        component={CadastrarProfessor}
        options={() => ({ title: "Cadastrar Professor" })}
      />

      <Stack.Screen
        name="ReservarAulas"
        component={ReservarAulas}
        options={() => ({ title: "Reservar Aulas" })}
      />
      <Stack.Screen
        name="ReservarEventos"
        component={ReservarEventos}
        options={() => ({ title: "Reservar Eventos" })}
      />
      
    </Stack.Navigator>
  );
}
