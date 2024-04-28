package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.repository.CoordenadoriaRepository;

@Service
public class CoordenadoriaService {
    
    @Autowired
    private CoordenadoriaRepository coordenadoriaRepository;

    public Coordenadoria cadastrarCoordenadoria(Coordenadoria coordenadoria) {
        return coordenadoriaRepository.save(coordenadoria);
    }

    public List<Coordenadoria> listarCoordenadorias(){
        return coordenadoriaRepository.findAll();
    }

    public Optional<Coordenadoria> encontrarCoordenadoriaPorId(Long id){
        return coordenadoriaRepository.findById(id);
    }

    public Coordenadoria editarCoordenadoria(Long id, Coordenadoria coordenadoria){
        coordenadoria.setId(id);
        return coordenadoriaRepository.save(coordenadoria);
    }

    public void excluirCoordenadoria(Long id){
        coordenadoriaRepository.deleteById(id);
    }
}
