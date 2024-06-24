package com.example.backend.repository;

import com.example.backend.dominio.AulaAluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AulaAlunoRepository extends JpaRepository<AulaAluno, Long> {

}
