package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Aula;

import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {

    @Query("SELECT a FROM Aula a WHERE a.turma.id = :turmaId")
    List<Aula> findByTurmaId(@Param("turmaId") Long turmaId);
}
