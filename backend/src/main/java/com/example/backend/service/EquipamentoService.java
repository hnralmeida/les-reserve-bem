package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.dominio.Equipamento;
import com.example.backend.repository.EquipamentoRepository;

@Service
public class EquipamentoService{

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    public Equipamento cadastrarEquipamento(Equipamento equipamento){
        return equipamentoRepository.save(equipamento);
    }

    public List<Equipamento> listarEquipamentos(){
        return equipamentoRepository.findAll();
    }

    public Optional<Equipamento> encontrarEquipamentoPorId(Long id){
        return equipamentoRepository.findById(id);
    }

    public Equipamento editarEquipamento(Long id, Equipamento equipamento){
        equipamento.setId(id);
        return equipamentoRepository.save(equipamento);
    }

    public void excluirEquipamento(Long id){
        equipamentoRepository.deleteById(id);
    }
}