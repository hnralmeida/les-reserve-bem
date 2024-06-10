package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Aula;
import com.example.backend.repository.AulaRepository;
import org.springframework.web.bind.annotation.PathVariable;

@Service
public class AulaService {
    @Autowired
    private AulaRepository aulaRepository;

    public Aula cadastrarAula(Aula aula) {
        return aulaRepository.save(aula);
    }

    public List<Aula> listarAula() {
        return aulaRepository.findAll();
    }

    public List<Aula> listarAulaPorTurma(Long turmaId) {
        return aulaRepository.findByTurmaId(turmaId);
    }

    public Optional<Aula> encontrarAulaPorId(Long id) {
        return aulaRepository.findById(id);
    }

    public Aula editarAula(Long id, Aula aula) {
        aula.setId(id);
        return aulaRepository.save(aula);
    }

    public void excluirAula(Long id) {
        aulaRepository.deleteById(id);
    }
}
