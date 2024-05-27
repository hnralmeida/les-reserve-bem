package com.example.backend.service;

import com.example.backend.dominio.Equipamento;
import com.example.backend.dominio.Locais;
import com.example.backend.dominio.LocaisEquipamentos;
import com.example.backend.repository.LocaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Locais cadastrarLocais(Locais locais) {
        Locais novoLocal = locaisRepository.save(locais);
        for (LocaisEquipamentos le : locais.getLocaisEquipamentos()) {
            Optional<Equipamento> equipamentoOpt = equipamentoService
                    .encontrarEquipamentoPorId(le.getEquipamento().getId());
            if (equipamentoOpt.isPresent()) {
                le.setLocais(novoLocal);
                locaisEquipamentoService.cadastrarLocaisEquipamentos(le);
            }
        }
        return novoLocal;
    }

    public List<Locais> listarLocais() {
        return locaisRepository.findAll();
    }

    public Optional<Locais> encontrarLocaisPorId(Long id) {
        return locaisRepository.findById(id);
    }

    public Locais editarLocais(Long id, Locais locais) {
        Optional<Locais> localOpt = locaisRepository.findById(id);
        if (localOpt.isPresent()) {
            Locais localExistente = localOpt.get();
            localExistente.setNomeLocal(locais.getNomeLocal());
            localExistente.setCapacidade(locais.getCapacidade());
            localExistente.setObservacao(locais.getObservacao());

            List<LocaisEquipamentos> locaisEquipamentos = new ArrayList<>();
            for (LocaisEquipamentos le : locais.getLocaisEquipamentos()) {
                Optional<Equipamento> equipamentoOpt = equipamentoService
                        .encontrarEquipamentoPorId(le.getEquipamento().getId());
                if (equipamentoOpt.isPresent()) {
                    le.setEquipamento(equipamentoOpt.get());
                    locaisEquipamentos.add(le);
                }
            }
            localExistente.setLocaisEquipamentos(locaisEquipamentos);
            return locaisRepository.save(localExistente);
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
}
