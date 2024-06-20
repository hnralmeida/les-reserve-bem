package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Turma;
import com.example.backend.repository.TurmaRepository;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    public Turma caadstrarTurma(Turma turma) {
        return turmaRepository.save(turma);
    }

    public List<Turma> listarTurma() {
        return turmaRepository.findAll();
    }

    public Turma encontrarTurmaPorId(Long id) {
        Optional<Turma> t = turmaRepository.findById(id);
        return t.orElse(null);
    }

    public Turma editarTurma(Long id, Turma turma) {
        turma.setId(id);
        return turmaRepository.save(turma);
    }

    public void excluirTurma(Long id) {
        turmaRepository.deleteById(id);
    }
}
