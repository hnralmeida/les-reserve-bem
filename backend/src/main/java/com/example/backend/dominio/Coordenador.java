package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coordenadores")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @AllArgsConstructor
public class Coordenador extends Usuario{
    @Override
    public String toString() {
        return this.getNome() + "/" + this.getMatricula() + "/" +
                this.getEmail();
    }
}
