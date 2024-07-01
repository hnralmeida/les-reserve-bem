package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "disciplinas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "disciplinas_id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "carga_horaria")
    private String cargaHoraria;

    @Column(name = "tipo_disciplina")
    private String tipoDisciplina;

    @Column(name = "sigla")
    private String sigla;

    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getSigla() + "/" +
                this.getTipoDisciplina() + "/" + this.getCargaHoraria() +
                this.getCoordenadoria();
    }
}
