package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Disciplina;;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina, Long>{
    
}
