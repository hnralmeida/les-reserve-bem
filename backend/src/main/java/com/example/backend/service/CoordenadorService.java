package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.CoordenadorRepository;
import org.springframework.stereotype.Service;

@Service
public class CoordenadorService {
    @Autowired
    private CoordenadorRepository coordenadorRepository;

    public Coordenador cadastrarCoordenador(Coordenador coordenador) {
        return coordenadorRepository.save(coordenador);
    }

    public List<Coordenador> listarCoordenador() {
        return coordenadorRepository.findAll();
    }

    public Optional<Coordenador> encontrarCoordenadoresPorId(Long id) {
        return coordenadorRepository.findById(id);
    }

    public Coordenador editarCoordenador(Long id, Coordenador coordenador) {
        coordenador.setId(id);
        return coordenadorRepository.save(coordenador);
    }

    public void excluirCoordenadores(Long id) {
        coordenadorRepository.deleteById(id);
    }
}
