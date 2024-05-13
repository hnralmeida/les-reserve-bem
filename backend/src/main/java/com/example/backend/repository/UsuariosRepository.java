package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Usuario;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuario, Long> {

}
