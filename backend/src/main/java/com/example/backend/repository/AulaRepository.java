package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Aula;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {

}
