package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = "cursos")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor

public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "inicio")
    private Date inicio;

    @Column(name = "fim")
    private Date fim;

    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @Override
    public String toString() {
        return this.getCoordenadoria() + "/" + this.getInicio() + "/" +
                this.getFim();
    }
}
