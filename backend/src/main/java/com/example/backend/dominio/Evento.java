package com.example.backend.dominio;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name = "eventos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "evento_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "locais_id")
    private Locais local;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_inicio")
    private Date dataInicio;

    @Column(name = "data_fim")
    private Date dataFim;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getDescricao() + "/" +
                this.getDataInicio() + "/" + this.getDataFim() +
                this.getLocal();
    }

}
