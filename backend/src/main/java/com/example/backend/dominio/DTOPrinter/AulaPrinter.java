package com.example.backend.dominio.DTOPrinter;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AulaPrinter {
    private String diaDaSemana;
    private String horaInicio;
    private String horaFim;
    private String disciplinaNome;
    private String localNome;
    private String alunoNome;
    private String professorNome;
}
