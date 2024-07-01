package com.example.backend.dominio;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.*;
import lombok.*;
import org.jetbrains.annotations.NotNull;

@Entity
@Table(name = "alunos")
@PrimaryKeyJoinColumn(name = "id")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aluno extends Usuario {

    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private @NotNull Coordenadoria coordenadoria;

    @ManyToOne
    @JoinColumn(name = "turma_id")
    private Turma turma;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getMatricula() + "/" +
                this.getEmail() + "/" + this.getCoordenadoria() +
                "/" + this.getTurma();
    }
}
