package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "locais")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Locais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_locais")
    private long id;

    @Column(name = "nome_Local")
    private String nomeLocal;

    @Column(name = "capacidade")
    private int capacidade;

    @Column(name = "observacao")
    private String observacao;

    @OneToMany(mappedBy = "local", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<LocaisEquipamentos> locaisEquipamentos = new HashSet<>();

}
