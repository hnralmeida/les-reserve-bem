package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professores")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Professor extends Usuario{
    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @JoinColumn(name= "RFID", nullable = true)
    private String rfid;
}
