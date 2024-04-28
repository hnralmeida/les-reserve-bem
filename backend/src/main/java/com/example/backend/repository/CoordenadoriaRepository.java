package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Coordenadoria;


@Repository
public interface CoordenadoriaRepository extends JpaRepository<Coordenadoria, Long>{
    
}
