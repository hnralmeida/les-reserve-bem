package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.service.CoordenadoriaService;

@RestController
@RequestMapping("/coordenadoria")
public class CoordenadoriaController {
    
    @Autowired
    private CoordenadoriaService coordenadoriaService;

    @PostMapping("/cadastro")
    public Coordenadoria cadastrarCoordenadoria(@RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.cadastrarCoordenadoria(coordenadoria);
    }

    @GetMapping("/listagem")
    public List<Coordenadoria> listarCoordenadorias(){
        return coordenadoriaService.listarCoordenadorias();
    }

    @GetMapping("/{id}")
    public Coordenadoria editCoordenadoria(@PathVariable Long id, @RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.editarCoordenadoria(id, coordenadoria);
    }

    @DeleteMapping("/{id}")
    public void excluirCoordenadoria(@PathVariable Long id){
        coordenadoriaService.excluirCoordenadoria(id);
    }
}
