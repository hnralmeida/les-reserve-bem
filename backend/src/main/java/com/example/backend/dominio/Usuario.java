package com.example.backend.dominio;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario")
public abstract class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    private Long id;

    @Column (name = "nome")
    private String nome;

    @Column (name = "matricula")
    private String matricula;

    @Column (name = "email")
    private String email;

    @Column (name = "senha")
    private String senha;

}
