package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Professor;
import com.example.backend.repository.ProfessoresRepository;

@Service
public class ProfessorService {
    @Autowired
    private ProfessoresRepository professorRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Professor cadastrarProfessor(Professor professor) {
        Professor pos = professorRepository.save(professor);
        if (pos != null) {
            Audit audit = new Audit();
            audit.onPrePersist(professor.toString());
            auditRepository.save(audit);
        }
        return pos;
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
        Professor pre = professorRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), professor.toString());
        auditRepository.save(audit);
        return professorRepository.save(professor);
    }

    public void excluirProfessor(Long id) {
        Professor pre = professorRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        professorRepository.deleteById(id);
    }
}
