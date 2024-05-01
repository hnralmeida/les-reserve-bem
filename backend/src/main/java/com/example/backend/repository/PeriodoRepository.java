package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Periodo;

@Repository
public interface PeriodoRepository extends JpaRepository<Periodo,Long>{
    
}
