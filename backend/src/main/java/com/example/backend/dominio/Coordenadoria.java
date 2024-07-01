package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "coordenadorias")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class Coordenadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sigla")
    private String sigla;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getSigla();
    }
}
