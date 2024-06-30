package com.example.backend.repository;

import com.example.backend.dominio.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.LocaisEquipamentos;

import java.util.List;

@Repository
public interface LocaisEquipamentosRepository extends JpaRepository<LocaisEquipamentos, Long> {

    @Query("SELECT le FROM LocaisEquipamentos le WHERE le.locais.id = :locaisId")
    List<LocaisEquipamentos> findByLocalId(@Param("locaisId") Long locaisId);
}
