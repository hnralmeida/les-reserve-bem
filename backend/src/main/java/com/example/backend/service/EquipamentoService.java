package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Coordenador;
import com.example.backend.repository.AuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.dominio.Equipamento;
import com.example.backend.repository.EquipamentoRepository;

@Service
public class EquipamentoService{

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Equipamento cadastrarEquipamento(Equipamento equipamento){
        Audit audit = new Audit();
        audit.onPrePersist(equipamento.toString());
        auditRepository.save(audit);
        return equipamentoRepository.save(equipamento);
    }

    public List<Equipamento> listarEquipamentos(){
        return equipamentoRepository.findAll();
    }

    public Equipamento encontrarEquipamentoPorId(Long id){
        return equipamentoRepository.findById(id).orElse(null);
    }

    public Equipamento editarEquipamento(Long id, Equipamento equipamento){
        equipamento.setId(id);
        Equipamento pre = equipamentoRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreUpdate(pre.toString(), equipamento.toString());
        auditRepository.save(audit);
        return equipamentoRepository.save(equipamento);
    }

    public void excluirEquipamento(Long id){
        Equipamento pre = equipamentoRepository.getReferenceById(id);

        Audit audit = new Audit();
        audit.onPreRemove(pre.toString());
        auditRepository.save(audit);
        equipamentoRepository.deleteById(id);
    }
}