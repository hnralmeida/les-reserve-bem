import { StackNavigationProp } from "@react-navigation/stack";
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles";
import { useForm } from "react-hook-form";
import API from "../../services/API";
import { useAuth } from "../../context/AuthProvider";

type FormInputs = {
  login: string;
  senha: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      login: "",
      senha: "",
    },
  });
  const { authData, signIn } = useAuth();

  const handle = () => {

    signIn(control._formValues.login, control._formValues.senha);
    
  };

  return (
    <View
      style={[
        styles.container,
        { padding: 0, margin: 0, flexDirection: "row" },
      ]}
    >
      <View style={[styles.primeBox]}>
        <Text style={[styles.buttonText, { textAlign: "left" }]}>
          Conheça o Reserve Bem
        </Text>
        <Text style={[styles.text, { textAlign: "justify" }]}>
          Projeto criado para disciplina de Laboratório de Sistemas como forma
          de avaliação da disciplina. O projeto consiste em um sistema de
          reserva de salas de estudo, onde o usuário pode reservar uma sala de
          estudo para um determinado dia e horário.
        </Text>

        <View
          style={[
            styles.inputColumn,
            { height: "30%", justifyContent: "space-around" },
          ]}
        >
          <TouchableHighlight
            style={[styles.buttonWhite, { width: 256, flexDirection: "row" }]}
          >
            <>
              <Image
                source={require("../../../assets/school.png")}
                style={[styles.iconElement]}
              />
              <Text style={[styles.buttonText, styles.neutralText]}>
                Ir para o Q-Academico
              </Text>
            </>
          </TouchableHighlight>

          <TouchableHighlight
            style={[styles.button, { width: 256, flexDirection: "row" }]}
          >
            <>
              <Image
                source={require("../../../assets/signal.png")}
                style={[styles.iconElement]}
              />
              <Text style={styles.buttonText}>Terminal</Text>
            </>
          </TouchableHighlight>
        </View>
      </View>

      <View style={styles.reserveBox}>
        <View style={styles.headerButton}>
          <Text style={styles.primeText}>Reserve Bem</Text>
        </View>

        <View style={styles.loginBox}>
          <View style={[styles.spacedColumn]}>
            <Text style={styles.loginText}>Realizar Login</Text>

            <View style={styles.inputColumn}>
              <TextInput
                style={styles.boxBorder}
                placeholder="Matricula"
                value={watch("login")}
                onChangeText={(text) => setValue("login", text)}
              />

              <TextInput
                style={styles.boxBorder}
                placeholder="Senha"
                secureTextEntry={true}
                value={watch("senha")}
                onChangeText={(text) => setValue("senha", text)}
              />
              <TouchableHighlight
                style={[
                  styles.label,
                  styles.edgeButton,
                  { alignItems: "flex-end" },
                ]}
              >
                <Text>Esqueci minha senha</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.rowCenter}>
              <TouchableHighlight style={styles.button} onPress={handle}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableHighlight>
            </View>
          </View>

          <TouchableHighlight
            style={[
              styles.inputColumn,
              styles.edgeButton,
              { alignItems: "flex-end" },
            ]}
          >
            <Text> Não é registrado? </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
