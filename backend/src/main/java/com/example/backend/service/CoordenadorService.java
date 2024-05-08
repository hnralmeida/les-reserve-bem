package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.CoordenadoresRepository;

public class CoordenadorService {
    @Autowired
    private CoordenadoresRepository coordenadoresRepository;

    public Coordenador cadastrarCoordenador(Coordenador coordenador) {
        return coordenadoresRepository.save(coordenador);
    }

    public List<Coordenador> listarCoordenador() {
        return coordenadoresRepository.findAll();
    }

    public Optional<Coordenador> encontrarCoordenadoresPorId(Long id) {
        return coordenadoresRepository.findById(id);
    }

    public Coordenador editarCoordenador(Long id, Coordenador coordenador) {
        coordenador.setId(id);
        return coordenadoresRepository.save(coordenador);
    }

    public void excluirCoordenadores(Long id) {
        coordenadoresRepository.deleteById(id);
    }
}
