package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Periodo;
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

    public List<Aula> listarAulaPorTurma(Long turmaId, Long periodoId) {
        return aulaRepository.findByTurmaId(turmaId, periodoId);
    }

    public List<Aula> listarAulaPorLocal(Long localId, Long periodoId) {
        return aulaRepository.findByLocalId(localId, periodoId);
    }

    public List<Aula> listarAulaPorAluno(Long alunoId, Long periodoId) {
        return aulaRepository.findByAlunoId(alunoId, periodoId);
    }

    public List<Aula> listarAulaPorProfessor(Long professorId, Long periodoId) {
        return aulaRepository.findByProfessorId(professorId, periodoId);
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
