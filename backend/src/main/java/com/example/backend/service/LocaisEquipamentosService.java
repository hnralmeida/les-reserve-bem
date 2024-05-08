package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.LocaisEquipamentos;
import com.example.backend.repository.EquipamentoRepository;
import com.example.backend.repository.LocaisEquipamentosRepository;
import com.example.backend.repository.LocaisRepository;

@Service
public class LocaisEquipamentosService {

    @Autowired
    private LocaisEquipamentosRepository locaisEquipamentosRepository;
    private EquipamentoRepository equipamentoRepository;
    private LocaisRepository locaisRepository;

    public LocaisEquipamentos cadastrarLocaisEquipamentos(LocaisEquipamentos locaisEquipamentos) {
        return locaisEquipamentosRepository.save(locaisEquipamentos);
    }

    public List<LocaisEquipamentos> listarLocaisEquipamentos() {
        return locaisEquipamentosRepository.findAll();
    }

    public Optional<LocaisEquipamentos> encontrarLocaisEquipamentosPorId(Long id, Long equipamento_id, Long local_id) {

        return locaisEquipamentosRepository.findById(id);
    }

    public LocaisEquipamentos editarLocaisEquipamentos(Long id, LocaisEquipamentos locaisEquipamentos) {
        locaisEquipamentos.setId(id);
        return locaisEquipamentosRepository.save(locaisEquipamentos);
    }

    public void excluirLocaisEquipamentos(Long id) {
        locaisEquipamentosRepository.deleteById(id);
    }
}
