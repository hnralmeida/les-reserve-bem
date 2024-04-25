import { AuthContextData } from "../../context";
import { useAuth } from "../../context/AuthProvider";
import { userData } from "../../types";

export default class ExternalAuthService {
  private static instance: ExternalAuthService;

  auth: AuthContextData;

  private constructor() {
    this.auth = useAuth();
  }

  public static getInstance(): ExternalAuthService {
    if (!ExternalAuthService.instance) {
      ExternalAuthService.instance = new ExternalAuthService();
    }

    return ExternalAuthService.instance;
  }

  async signInWithEmailAndPassword(
    user: string,
    password: string
  ): Promise<userData | undefined> {
    console.log("SignIn", user);

    return new Promise<userData>((resolve, reject) => {
      return resolve({
        id: 1,
        matricula: "matricula-string",
        nome: "nome-string",
        tipo: "tipo-string",
      });
      // Login com Firebase
      //   signInWithEmailAndPassword(this.auth, user, password).then((res) => {
      //     console.log("SignIn ", res)

      //     const docRef = collection(this.fs, "empresas");

      //     getDoc(doc(docRef, user)).then((res) => {
      //       console.log(res);
      //       if (res.data() as userData) {
      //         return resolve(res.data() as userData);
      //       }else{
      //         return reject(new Error("Erro de Login: Área restrita à empresas"));
      //       }
      //     }).catch((error) => {
      //       console.log(res);
      //       return reject(error);
      //     });

      //   }).catch((error) => {
      //     switch (error.code) {
      //       case 'auth/invalid-email':
      //         return reject(new Error('Erro de Login: ' + 'Insira um email válido'));
      //       case 'auth/user-not-found':
      //         return reject(new Error('Erro de Login: ' + 'Usuário não registrado'));
      //       case 'auth/wrong-password':
      //         return reject(new Error('Erro de Autenticação: ' + 'Senha incorreta'));
      //       case 'auth/too-many-requests':
      //         return reject(new Error('Erro de Autenticação: ' + 'Login desabilitado devido a tentativas excessivas de login. Tente mais tarde ou redefina sua senha'));
      //       default:
      //         return reject(new Error('Erro desconhecido: ' + 'Consulte o administrador para mais detalhes'));
      //     }
      //   })
    });
  }
}
