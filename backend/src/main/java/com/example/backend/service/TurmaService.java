package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Turma;
import com.example.backend.repository.TurmaRepository;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Turma cadastrarTurma(Turma turma) {
        Audit audit = new Audit();
        audit.onPrePersist(turma.toString());
        auditRepository.save(audit);
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
        Turma pre = turmaRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), turma.toString());
        auditRepository.save(audit);
        return turmaRepository.save(turma);
    }

    public void excluirTurma(Long id) {

        Turma pre = turmaRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        turmaRepository.deleteById(id);
    }
}
