package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Professor;
import com.example.backend.repository.ProfessoresRepository;

@Service
public class ProfessorService {
    @Autowired
    private ProfessoresRepository professorRepository;

    public Professor cadastrarProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public List<Professor> listarProfessor() {
        return professorRepository.findAll();
    }

    public Professor encontrarProfessorPorMatricula(String matricula) {
        return professorRepository.findByMatricula(matricula);
    }

    public Professor encontrarProfessorPorRFID(String RFID) {
        return professorRepository.findByRFID(RFID);
    }

    public Professor editarProfessor(Long id, Professor professor) {
        professor.setId(id);
        return professorRepository.save(professor);
    }

    public void excluirProfessor(Long id) {
        professorRepository.deleteById(id);
    }
}
