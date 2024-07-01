package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.repository.AuditRepository;
import jakarta.persistence.PrePersist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Aluno;
import com.example.backend.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Aluno cadastrarAluno(Aluno aluno) {
        Aluno a = alunoRepository.save(aluno);
        if (a != null) {
            Audit audit = new Audit();
            audit.onPrePersist(a.toString());
            auditRepository.save(audit);
        }
        return a;
    }

    public Aluno encontrarAlunoPorMatricula(Long matricula) {
        return alunoRepository.findByMatricula(matricula);
    }

    public List<Aluno> listarAlunos() {
        return alunoRepository.findAll();
    }

    public Optional<Aluno> encontrarAlunoPorId(Long id) {
        return alunoRepository.findById(id);
    }

    public Aluno editarAluno(Long id, Aluno aluno) {
        aluno.setId(id);
        Aluno pre = alunoRepository.getReferenceById(id);
        Aluno a = alunoRepository.save(aluno);
        if (a != null) {
            Audit audit = new Audit();
            audit.onPreUpdate(pre.toString(), a.toString());
            auditRepository.save(audit);
        }
        return a;
    }

    public void excluirAluno(Long id) {
        Aluno a = alunoRepository.getReferenceById(id);
        alunoRepository.deleteById(id);

        Audit audit = new Audit();
        audit.onPreRemove(a.toString());
        auditRepository.save(audit);
    }
}
