package com.example.backend.dominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "coordenador")
@PrimaryKeyJoinColumn(name = "id")
@Getter @Setter @AllArgsConstructor
public class Coordenador {
    
}
