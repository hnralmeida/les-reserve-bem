package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Professor;

@Repository
public interface ProfessoresRepository extends JpaRepository<Professor, Long> {

    @Query("SELECT p FROM Professor p WHERE p.matricula = :professorMatricula")
    Professor findByMatricula(@Param("professorMatricula") String professorMatricula);

}
