package com.example.backend.dominio;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "locais_equipamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocaisEquipamentos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "id_equipamento")
    private Equipamento equipamento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locais_id")
    @JsonProperty(access= JsonProperty.Access.WRITE_ONLY)
    private Locais locais;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "observacao")
    private String observacao;

}
