package com.example.backend.dominio;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professor")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Professor extends Usuario{
    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;
}
