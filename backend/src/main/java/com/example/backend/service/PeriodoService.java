package com.example.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Periodo;
import com.example.backend.repository.PeriodoRepository;

@Service
public class PeriodoService {
    
    @Autowired
    private PeriodoRepository periodoRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Periodo cadastrarPeriodo(Periodo periodo){
        Audit audit = new Audit();
        audit.onPrePersist(periodo.toString());
        auditRepository.save(audit);
        return periodoRepository.save(periodo);
    }

    public List<Periodo> listarPeriodos(){
        return periodoRepository.findAll();
    }

    public Optional<Periodo> encontrarPeriodoPorId(Long id){
        return periodoRepository.findById(id);
    }

    public Periodo encontrarPeriodoAbrangente(Date date) {
        return periodoRepository.findByIntervalo(date);
    }
    public Periodo editarPeriodo(Long id, Periodo periodo){
        periodo.setId(id);
        Periodo pre = periodoRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), periodo.toString());
        auditRepository.save(audit);
        return periodoRepository.save(periodo);
    }

    public void excluirPeriodo(Long id){
        Audit audit = new Audit();
        Periodo pre = periodoRepository.getReferenceById(id);
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        periodoRepository.deleteById(id);
    }
}
