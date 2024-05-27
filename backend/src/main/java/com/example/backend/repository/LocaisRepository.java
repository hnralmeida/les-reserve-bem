package com.example.backend.repository;

import com.example.backend.dominio.Locais;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LocaisRepository extends JpaRepository<Locais, Long> {

}
