package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.service.CoordenadoriaService;

@RestController
@RequestMapping("/coordenadorias")
public class CoordenadoriaController {
    
    @Autowired
    private CoordenadoriaService coordenadoriaService;

    @PostMapping
    public Coordenadoria cadastrarCoordenadoria(@RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.cadastrarCoordenadoria(coordenadoria);
    }

    @GetMapping
    public List<Coordenadoria> listarCoordenadorias(){
        return coordenadoriaService.listarCoordenadorias();
    }

    @PutMapping("/{id}")
    public Coordenadoria editarCoordenadoria(@PathVariable Long id, @RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.editarCoordenadoria(id, coordenadoria);
    }

    @DeleteMapping("/{id}")
    public void excluirCoordenadoria(@PathVariable Long id){
        coordenadoriaService.excluirCoordenadoria(id);
    }
}
