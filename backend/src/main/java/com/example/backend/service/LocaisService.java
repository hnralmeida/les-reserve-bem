package com.example.backend.service;

import com.example.backend.dominio.Locais;
import com.example.backend.repository.LocaisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LocaisService {
    
    @Autowired
    private LocaisRepository locaisRepository;

    public Locais cadastrarLocais(Locais locais){
        return locaisRepository.save(locais);
    }

    public List<Locais> listarLocais(){
        return locaisRepository.findAll();
    }

    public Optional<Locais> encontrarLocaisPorId(Long id){
        return locaisRepository.findById(id);
    }

    public Locais editarLocais(Long id, Locais locais){
        locais.setId(id);
        return locaisRepository.save(locais);
    }

    public void excluirLocais(Long id){
        locaisRepository.deleteById(id);
    }
}
