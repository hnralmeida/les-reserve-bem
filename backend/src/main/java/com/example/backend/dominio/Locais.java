package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "locais")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Locais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "locais_id")
    private long id;

    @Column(name = "nome_Local")
    private String nomeLocal;

    @Column(name = "capacidade")
    private int capacidade;

    @Column(name = "observacao")
    private String observacao;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy="locais")
    private List<LocaisEquipamentos> locaisEquipamentos = new ArrayList<>();

}
