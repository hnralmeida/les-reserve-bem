package com.example.backend.service;

import com.example.backend.dominio.Equipamento;
import com.example.backend.dominio.Locais;
import com.example.backend.dominio.LocaisEquipamentos;
import com.example.backend.repository.LocaisRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class LocaisService {

    @Autowired
    private LocaisRepository locaisRepository;

    @Autowired
    private EquipamentoService equipamentoService;

    @Autowired
    private LocaisEquipamentosService locaisEquipamentoService;

    @Transactional
    public Locais cadastrarLocais(Locais locais) {
        return locaisRepository.save(locais);
    }

    public ResponseEntity<?> cadastrarLocaisEquipamentos(LocaisEquipamentos le, Locais local) {
        Equipamento equipamentoOpt = equipamentoService
                .encontrarEquipamentoPorId(le.getEquipamento().getId());

        if (equipamentoOpt != null) {
            // local.setLocaisEquipamentos();
            LocaisEquipamentos leq = new LocaisEquipamentos();
            leq.setEquipamento(equipamentoOpt);
            leq.setQuantidade(le.getQuantidade());
            leq.setLocais(local);
            locaisEquipamentoService.cadastrarLocaisEquipamentos(leq);
        }

        return new ResponseEntity<>(le, HttpStatus.OK);
    }

    public List<Locais> listarLocais() {
        return locaisRepository.findAll();
    }

    public Optional<Locais> encontrarLocaisPorId(Long id) {
        return locaisRepository.findById(id);
    }

    public ResponseEntity<?> editarLocais(Long id, Locais locais) {
        Locais localExistente = locaisRepository.findById(id).orElse(null);
        if (localExistente != null) {
            localExistente.setNomeLocal(locais.getNomeLocal());
            localExistente.setCapacidade(locais.getCapacidade());
            localExistente.setObservacao(locais.getObservacao());

            locaisRepository.save(localExistente);

            return new ResponseEntity<>(localExistente, HttpStatus.OK);
        }
        return null;
    }

    public void excluirLocais(Long id) {
        locaisRepository.deleteById(id);
    }

    public List<Locais> listarLocaisComEquipamentos() {
        List<Locais> locais = locaisRepository.findAll();

        for (Locais local : locais) {
            for (LocaisEquipamentos locaisEquipamentos : local.getLocaisEquipamentos()) {
                Equipamento equipamento = locaisEquipamentos.getEquipamento();
            }
        }
        return locais;
    }

    public List<LocaisEquipamentos> listarLocaisEquipamentos(Long id) {
        return locaisEquipamentoService.listarLocaisEquipamentosPorLocal(id);
    }
}
