package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Professor;

@Repository
public interface ProfessoresRepository extends JpaRepository<Professor, Long> {

}
