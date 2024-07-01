package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "turmas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "turmas_id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "ano_inicio")
    private int anoInicio;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getAnoInicio();
    }
}
