package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long>{
    
}
