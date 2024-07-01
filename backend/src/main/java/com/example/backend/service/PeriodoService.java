package com.example.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Periodo;
import com.example.backend.repository.PeriodoRepository;

@Service
public class PeriodoService {
    
    @Autowired
    private PeriodoRepository periodoRepository;

    public Periodo cadastrarPeriodo(Periodo periodo){
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
        return periodoRepository.save(periodo);
    }

    public void excluirPeriodo(Long id){
        periodoRepository.deleteById(id);
    }
}
