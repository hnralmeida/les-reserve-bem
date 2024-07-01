package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Aula;
import com.example.backend.repository.AuditRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.repository.CoordenadoriaRepository;

@Service
public class CoordenadoriaService {

    @Autowired
    private CoordenadoriaRepository coordenadoriaRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Coordenadoria cadastrarCoordenadoria(Coordenadoria coordenadoria) {
        Coordenadoria c = coordenadoriaRepository.save(coordenadoria);

        Audit audit = new Audit();
        audit.onPrePersist(c.toString());
        auditRepository.save(audit);

        return c;
    }

    public List<Coordenadoria> listarCoordenadorias() {
        return coordenadoriaRepository.findAll();
    }

    public Coordenadoria encontrarCoordenadoriaPorId(Long id) {
        Optional<Coordenadoria> c = coordenadoriaRepository.findById(id);
        return c.orElse(null);
    }

    public Coordenadoria editarCoordenadoria(Long id, Coordenadoria coordenadoria) {
        coordenadoria.setId(id);
        Coordenadoria pre = coordenadoriaRepository.findById(id).orElse(null);
        if (pre != null) {
            Audit audit = new Audit();
            audit.onPreUpdate(pre.toString(), coordenadoria.toString());
            auditRepository.save(audit);
        }
        return coordenadoriaRepository.save(coordenadoria);
    }

    public void excluirCoordenadoria(Long id) {
        coordenadoriaRepository.deleteById(id);
        Coordenadoria pre = coordenadoriaRepository.findById(id).orElse(null);
        Audit audit = new Audit();
        if (pre != null) {
            audit.onPreRemove(pre.toString());
            auditRepository.save(audit);
        }
    }
}
