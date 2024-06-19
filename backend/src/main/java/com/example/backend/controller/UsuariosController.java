package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.UsuarioRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Usuario;
import com.example.backend.service.UsuarioService;

@RestController
@RequestMapping("/login")
public class UsuariosController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioService.listarUsuario();
    }

    @GetMapping("/usuario/{id}")
    public Optional<Usuario> obterUsuarios(@PathVariable Long id) {
        return usuarioService.encontrarUsuarioPorId(id);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        usuarioService.excluirUsuario(id);
    }

    @PostMapping
    public ResponseEntity<?> getUsuarioService(@RequestBody UsuarioRequest user) {

        System.out.println(user.getUsuario());
        System.out.println(user.getSenha());

        return usuarioService.authenticate(user.getUsuario(), user.getSenha());

    }

}
