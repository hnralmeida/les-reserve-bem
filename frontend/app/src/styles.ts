import React from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const colors = {
  primaryColor: "#2F9E41",
  secondaryColor: "#CE181E",
  neutralColor: "#04652F",
  whiteColor: "#F0F0F0",
  blackColor: "#121212",
  background: "#E1E1E1",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginTop: 8,
  },
  bgHeader: {
    width: 50,
    height: 50,
    borderRadius: 25, // Ensures the circle shape
    backgroundColor: "#fff", // Background color of the circle
  },
  expand: {
    width: "100%",
    height: "100%",
  },
  content: {
    width: "50%",
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  spaced: {
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    paddingBottom: 16,
  },
  contentReservar: {
    width: "75%",
    alignSelf: "center",
  },
  title: {},
  text: {},
  buttonRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
  },
  iconButton: {
    display: "flex",
    width: screenWidth > 300 ? 256 : 64, 
    height: 48,
    aspectRatio: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.neutralColor,
  },
  button: {
    display: "flex",
    width: "50%", 
    height: 48,
    aspectRatio: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.neutralColor,
  },
  iconElement: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  buttonText: {
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  Page: {
    width: 58,
    height: 58,
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 16,
    marginRight: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    width: "25%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  modalInput: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  listBox: {
    flexDirection: "column",
    alignContent: "center",
    marginVertical: 32,
    padding: 8,
    width: "100%",
    height: "30%",
    borderTopWidth: 2,
    borderTopColor: colors.primaryColor,
  },
  listLine: {
    flexDirection: "row",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    width: "100%",
  },
  edgeButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  containerPage: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Open Sans",
    opacity: 0.5,
  },
  boxBorder: {
    borderWidth: 2,
    borderColor: colors.primaryColor,
    textAlignVertical: "center",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    height: 48,
    fontSize: 16,
  },
  pickerIcon: {
    fontSize: 24, // Defina o tamanho desejado para o ícone de dropdown
    // Outros estilos conforme necessário
  },
  smallTextInput: {
    borderWidth: 2,
    borderColor: colors.primaryColor,
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    height: 35,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  numberInput: {
    width: 128,
    marginRight: 8,
  },
  rowFlexEnd: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  line: {
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 2,
    width: "100%",
    marginVertical: 10,
    opacity: 0.8,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRowHome: {
    flexDirection: "row",
  },
  buttonHome: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryColor,
    margin: 8,
    borderWidth: 2,
    borderColor: colors.blackColor,
  },
  squareButton: {
    width: 256,
    height: 256,
    aspectRatio: 1,
  },
  buttonTextHome: {
    color: colors.blackColor,
    fontSize: 20,
    fontWeight: "bold",
  },
  consultarButton: {
    alignSelf: "flex-start",
    height: 512,
    width: 256,
  },
  cadastrarButton: {
    alignSelf: "flex-end", // Alinha à direita
    height: 248,
    width: 512,
  },
  reservarButton: {
    alignSelf: "flex-end", // Alinha à direita
    height: 248,
    width: 512,
  },
  verticalButtonContainer: {
    flexDirection: "column",
  },
  buttonImageHome: {
    width: 50, // Largura da imagem
    height: 50, // Altura da imagem
    marginBottom: 5, // Margem inferior para separar a imagem do texto
  },
  buttonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  textActions: {
    width: 64,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textLabel: {
    display: "flex",
    width: "100%",
    height: "100%",
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textFocus: {
    width: 64,
    height: 48,
    backgroundColor: colors.primaryColor,
    color: colors.whiteColor,
    borderWidth: 1,
    borderColor: colors.neutralColor,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textColorWhite: {
    color: colors.whiteColor,
  },
  marginRight: {
    marginRight: 8,
  },
  marginTop: {
    marginTop: 32,
  },
});
export default styles;
