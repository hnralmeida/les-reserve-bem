package com.example.backend.dominio;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "professores")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Professor extends Usuario{
    @ManyToOne
    @JoinColumn(name = "coordenadoria_id")
    private Coordenadoria coordenadoria;

    @JoinColumn(name= "RFID", nullable = true)
    private String rfid;

    @Override
    public String toString() {
        return this.getNome() + "/" + this.getEmail() + "/" +
                this.getMatricula() + "/" + this.getCoordenadoria();
    }
}
