import React from "react";
import { View, TouchableHighlight, Text, Image } from "react-native";
import styles from "../../styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/stack.routes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}


export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <View style={styles.buttonRowHome}>
          <TouchableHighlight
            style={[styles.buttonHome, styles.consultarButton]}
            onPress={() => navigation.navigate("Consultar")}
            underlayColor="#2F9E41"
          >
            <View style={styles.buttonContent}>
              <Image
                source={require('../../../assets/search.png')}
                style={styles.buttonImageHome}
              />
              <Text style={styles.buttonTextHome}>Consultar</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.verticalButtonContainer}>
            <TouchableHighlight
              style={[styles.buttonHome, styles.cadastrarButton]}
              onPress={() => navigation.navigate("Cadastrar")}
              underlayColor="#2F9E41"
            >
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../../assets/plus.png')}
                  style={styles.buttonImageHome}
                />
                <Text style={styles.buttonTextHome}>Cadastrar</Text>
              </View>
            </TouchableHighlight>
            
            <TouchableHighlight
              style={[styles.buttonHome, styles.reservarButton]}
              onPress={() => navigation.navigate("Reservar")}
              underlayColor="#2F9E41"
            >
              <View style={styles.buttonContent}>
                <Image
                  source={require('../../../assets/calender.png')}
                  style={styles.buttonImageHome}
                />
                <Text style={styles.buttonText}>Reservar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}
