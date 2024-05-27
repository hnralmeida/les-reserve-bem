package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "equipamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Equipamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome_equipamento")
    private String nomeEquipamento;

//    @OneToMany(mappedBy = "equipamento", fetch = FetchType.LAZY)
//    private Set<LocaisEquipamentos> locaisEquipamentos;

}