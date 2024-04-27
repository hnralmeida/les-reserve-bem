package com.example.backend.dominio;

import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "aluno")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Aluno extends Usuario {
    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @OneToMany(mappedBy = "aluno")
    private List<AulaAluno> aulas;
}
