package com.example.backend.dominio;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @ManyToOne
    @JoinColumn(name = "id_local")
    @JsonBackReference
    private Locais local;

    @ManyToOne
    @JoinColumn(name = "id_equipamento")
    private Equipamento equipamento;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "observacao")
    private String observacao;

}
