package com.example.backend.dominio;

import jakarta.persistence.*;

@Entity
@Table(name = "aula_aluno")
public class AulaAluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aula_id")
    private Aula aula;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;
}
