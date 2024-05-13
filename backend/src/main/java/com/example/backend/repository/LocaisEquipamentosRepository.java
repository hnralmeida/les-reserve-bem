package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.LocaisEquipamentos;

@Repository
public interface LocaisEquipamentosRepository extends JpaRepository<LocaisEquipamentos, Long> {

}
