package com.example.backend.service;

import com.example.backend.dominio.Audit;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuditService {
    @Autowired
    AuditRepository repository;

    public Audit cadastrarAudit(Audit audit) {
        return repository.save(audit);
    }

    public List<Audit> listarAudits() {
        return repository.findAll();
    }

    public Audit encontrarAudit(Long id) {
        return repository.getReferenceById(id);
    }

    public Audit editarAudit(Long id, Audit audit) {
        audit.setId(id);
        return repository.save(audit);
    }

    public void excluirAudit(Long id) {
        repository.deleteById(id);
    }
}
