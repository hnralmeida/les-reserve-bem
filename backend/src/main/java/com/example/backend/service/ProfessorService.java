package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.backend.dominio.Professor;
import com.example.backend.repository.ProfessoresRepository;

public class ProfessorService {
    @Autowired
    private ProfessoresRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessor() {
        return professorRepository.findAll();
    }

    public Optional<Professor> encontrarProfessorPorId(Long id) {
        return professorRepository.findById(id);
    }

    public Professor editarProfessor(Long id, Professor professor) {
        professor.setId(id);
        return professorRepository.save(professor);
    }

    public void excluirProfessor(Long id) {
        professorRepository.deleteById(id);
    }
}
