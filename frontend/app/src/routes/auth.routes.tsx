// Navegação
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Rotas de Login
// import Login from '../pages/Login';
// import Redirector from '../pages/Redirector';

//MainPages
import Login from "../pages/Login";
import ConsultarHorarios from "../pages/ConsultarHorarios";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  ConsultarHorario: undefined;
};

export function StackAuth() {
  const nav = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConsultarHorario"
        component={ConsultarHorarios}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
