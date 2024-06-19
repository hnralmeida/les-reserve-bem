package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Usuario;
import com.example.backend.repository.UsuariosRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuariosRepository usuarioRepository;

    public Usuario cadastrarUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> listarUsuario() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> encontrarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario editarUsuario(Long id, Usuario usuario) {
        usuario.setId(id);
        return usuarioRepository.save(usuario);
    }

    public void excluirUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public ResponseEntity<?> authenticate(String user, String senha) {
        Usuario validate = usuarioRepository.findByMatricula(user);

        if (validate!=null) {
            if (validate.getSenha().equals(senha)) return ResponseEntity.ok().body(validate.getId());
        }
        return new ResponseEntity<String>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
