package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long>{
    
}
