package com.example.backend.repository;

import com.example.backend.dominio.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Periodo;

import java.util.Date;

@Repository
public interface PeriodoRepository extends JpaRepository<Periodo,Long>{

    @Query("SELECT p FROM Periodo p WHERE p.dataInicio < :dataTarget AND p.dataFim > :dataTarget")
    Periodo findByIntervalo(@Param("dataTarget") Date dataTarget);
    
}
