import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const colors = {
  primaryColor: "#2F9E41",
  secondaryColor: "#CE181E",
  neutralColor: "#04652F",
  whiteColor: "#F0F0F0",
  blackColor: "#121212",
  background: "#E1E1E1",
};

const styles = StyleSheet.create({
  logo: {
    width: 128,
    height: 128,
    opacity: 1,
  },
  drawerBackground: {
    opacity: 0.1,
    width: "100%",
    height: 128,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.background,
  },
  primeBox: {
    width: "40%",
    height: "100%",
    marginTop: 32,
    backgroundColor: colors.primaryColor,
    borderRadius: 32,
    borderBottomLeftRadius: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  primeText: {
    color: colors.primaryColor,
    shadowColor: colors.blackColor,
    shadowOpacity: 1,
    elevation: 3,
    zIndex: 999,
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
  },
  reserveBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
    height: "100%",
    paddingHorizontal: 128,
  },
  loginText: {
    fontSize: 24,
    color: colors.blackColor,
  },
  loginBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "75%",
    height: "50%",
    margin: 0,
    padding: 16,
    backgroundColor: colors.whiteColor,
  },
  neutralText: {
    color: colors.neutralColor,
  },
  inputColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
  },
  headerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 8,
    marginTop: 8,
    width: "10%",
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
    width: "75%",
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
  spacedColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contentReservar: {
    width: "75%",
    alignSelf: "center",
  },
  title: {},
  footer: {
    padding: 8,
    marginTop: 4,
    borderTopColor: colors.primaryColor,
  },
  padmargin: {
    padding: 8,
    marginTop: 32,
  },
  text: {
    textDecorationStyle: "double",
    flexDirection: "row",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "100%",
  },
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
  printButton: {
    position: "absolute",
    marginLeft: "80%",
    marginTop: 16,
    width: 16,
    height: 16,
  },
  button: {
    display: "flex",
    width: "50%",
    height: 48,
    aspectRatio: 1,
    backgroundColor: colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.neutralColor,
  },
  buttonWhite: {
    display: "flex",
    width: "50%",
    height: 48,
    aspectRatio: 1,
    backgroundColor: colors.whiteColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.neutralColor,
  },
  iconElement: {
    width: 32,
    height: 32,
  },
  pick: {
    width: "100%",
    height: 48,
    backgroundColor: colors.background,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.blackColor,
    borderStyle: "dotted",
  },
  buttonText: {
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText_hover: {
    width: "100%",
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    backgroundColor: "blue",
    fontSize: 18,
    fontWeight: "900",
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
    width: "35%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  row6: {
    width: "100%",
  },
  row128: {
    width: 128,
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
    width: "100%",
    height: "30%",
    borderTopWidth: 2,
    borderTopColor: colors.primaryColor,
  },
  marginVertical32: {
    marginTop: 8,
  },
  listLine: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: "100%",
  },
  edgeButton: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 8,
  },
  rowCenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowStart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  centerText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  containerPage: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  label: {
    display: "flex",
    width: "100%",
    marginBottom: 5,
    fontSize: 16,
    fontFamily: "Open Sans",
    opacity: 0.5,
  },
  box: {
    flex: 1,
    textAlignVertical: "center",
    height: 48,
    fontSize: 16,
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
    display: "flex",
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
    justifyContent: "flex-end",
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
    flexDirection: "row",
    width: "100%",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 8,
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
    marginTop: 8,
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  headerCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
  },
  cellText: {
    textAlign: "center",
  },
  paragraphText: {
    margin: 24,
    textAlign: "justify",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default styles;
