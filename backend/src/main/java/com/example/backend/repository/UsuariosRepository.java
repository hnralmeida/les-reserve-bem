package com.example.backend.repository;

import com.example.backend.dominio.Aula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.backend.dominio.Usuario;

import java.util.List;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.matricula = :user")
    Usuario findByMatricula(@Param("user") String user);

}
