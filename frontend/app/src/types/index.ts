export interface userData {
  id: number;
  matricula: string;
  nome: string;
  tipo: string;
}

export const tipoDisciplinaList = [
  "Obrigatória",
  "Optativa",
  "Eletiva",
  "Estágio",
  "Atividade Complementar",
  "Trabalho de Conclusão de Curso",
  "Projeto de Conclusão de Curso",
  "Outro",
];

export default interface IFile {
  url: string;
  name: string;
}
