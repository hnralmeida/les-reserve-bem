package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenadoria;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.CoordenadorRepository;

@Service
public class CoordenadorService {
    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Coordenador cadastrarCoordenador(Coordenador coordenador) {
        Audit audit = new Audit();
        audit.onPreRemove(coordenador.toString());
        auditRepository.save(audit);
        return coordenadorRepository.save(coordenador);
    }

    public List<Coordenador> listarCoordenador() {
        return coordenadorRepository.findAll();
    }

    public Optional<Coordenador> encontrarCoordenadoresPorId(Long id) {
        return coordenadorRepository.findById(id);
    }

    public Coordenador editarCoordenador(Long id, Coordenador coordenador) {
        coordenador.setId(id);
        Coordenador pre = coordenadorRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), coordenador.toString());
        auditRepository.save(audit);
        return coordenadorRepository.save(coordenador);
    }

    public void excluirCoordenadores(Long id) {
        Coordenador c = coordenadorRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreRemove(c.toString());
        auditRepository.save(audit);
        coordenadorRepository.deleteById(id);
    }
}
