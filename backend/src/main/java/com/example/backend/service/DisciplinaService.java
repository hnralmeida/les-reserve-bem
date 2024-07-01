package com.example.backend.service;

import java.util.List;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Disciplina;
import com.example.backend.repository.DisciplinaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class DisciplinaService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Disciplina cadastrarDisciplina(Disciplina disciplina) {

        Audit audit = new Audit();
        audit.onPrePersist(disciplina.toString());
        auditRepository.save(audit);
        return disciplinaRepository.save(disciplina);
    }

    @Transactional
    public List<Object[]> listarDisciplinasComCoordenadoria() {
        String jpql = "Select d, c from Disciplina d JOIN d.coordenadoria c";
        return entityManager.createQuery(jpql, Object[].class).getResultList();
    }

    public List<Disciplina> listarDisciplinas() {
        return disciplinaRepository.findAll();
    }

    public Disciplina editarDisciplina(Long id, Disciplina disciplina) {
        disciplina.setId(id);
        Disciplina pre = disciplinaRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), disciplina.toString());
        auditRepository.save(audit);
        return disciplinaRepository.save(disciplina);
    }

    public void excluirDisciplina(Long id) {
        Audit audit = new Audit();
        Disciplina pre = disciplinaRepository.getReferenceById(id);
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        disciplinaRepository.deleteById(id);
    }
}
