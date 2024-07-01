package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Evento;
import com.example.backend.repository.EventoRepository;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Evento cadastrarEvento(Evento evento) {

        Audit audit = new Audit();
        audit.onPrePersist(evento.toString());
        auditRepository.save(audit);

        return eventoRepository.save(evento);
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> encontrarEventoPorId(Long id) {
        return eventoRepository.findById(id);
    }

    public Evento editarEvento(Long id, Evento evento) {
        evento.setId(id);
        Evento pre = eventoRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), evento.toString());
        auditRepository.save(audit);
        return eventoRepository.save(evento);
    }

    public void excluirEvento(Long id) {
        Evento pre = eventoRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        eventoRepository.deleteById(id);
    }
}
