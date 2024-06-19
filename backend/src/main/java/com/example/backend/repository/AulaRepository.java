package com.example.backend.repository;

import com.example.backend.dominio.Periodo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Aula;

import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {

    @Query("SELECT a FROM Aula a WHERE a.turma.id = :turmaId AND a.periodo.id = :periodoId")
    List<Aula> findByTurmaId(@Param("turmaId") Long turmaId, @Param("periodoId") Long periodoId);

    @Query("SELECT a FROM Aula a WHERE a.local.id = :localId AND a.periodo.id = :periodoId")
    List<Aula> findByLocalId(@Param("localId") Long localId, @Param("periodoId") Long periodoId);

    @Query("SELECT a FROM Aula a JOIN a.alunos aux WHERE a.periodo.id = :periodoId AND aux.aluno.id = :alunoId")
    List<Aula> findByAlunoId(@Param("alunoId") Long alunoId, @Param("periodoId") Long periodoId);

    @Query("SELECT a FROM Aula a WHERE a.professor.id = :professorId AND a.periodo.id = :periodoId")
    List<Aula> findByProfessorId(@Param("professorId") Long professorId, @Param("periodoId") Long periodoID);
}
