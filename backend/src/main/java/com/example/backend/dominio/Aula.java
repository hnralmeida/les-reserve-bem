package com.example.backend.dominio;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "aulas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "locais_id")
    private Locais local;

    @ManyToOne
    @JoinColumn(name = "periodo_id")
    private Periodo periodo;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "turmas_id")
    private Turma turma;

    @ManyToOne
    @JoinColumn(name = "disciplinas_id")
    private Disciplina disciplina;

    @Column(name = "hora_inicio")
    private String horaInicio;

    @Column(name = "hora_fim")
    private String horaFim;

    @Column(name = "dia_semana")
    private String diaDaSemana;

    @OneToMany(mappedBy = "aula")
    private List<AulaAluno> alunos;
    
}
