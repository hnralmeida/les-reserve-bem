import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, // Ensures the circle shape
    backgroundColor: '#fff', // Background color of the circle
    marginLeft: 8,
    marginTop: 8
  },
  headerStyle: {
    marginLeft: 8,
    marginTop: 8
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    margin: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  consultarButton: {
    alignSelf: 'flex-start', 
    height: 512,
    width: 256,
  },
  cadastrarButton: {
    alignSelf: 'flex-end', // Alinha à direita
    height: 248,
    width: 512,
  },
  reservarButton: {
    alignSelf: 'flex-end', // Alinha à direita
    height: 248,
    width: 512,
  },
  verticalButtonContainer: {
    flexDirection: 'column',
  },
  buttonImage: {
    width: 50, // Largura da imagem
    height: 50, // Altura da imagem
    marginBottom: 5, // Margem inferior para separar a imagem do texto
  },
  buttonContent: {
    alignItems: 'center',
  },
});
