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

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @PostMapping
    public Coordenadoria cadastrarCoordenadoria(@RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.cadastrarCoordenadoria(coordenadoria);
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @GetMapping
    public List<Coordenadoria> listarCoordenadorias(){
        return coordenadoriaService.listarCoordenadorias();
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public Coordenadoria editCoordenadoria(@PathVariable Long id, @RequestBody Coordenadoria coordenadoria){
        return coordenadoriaService.editarCoordenadoria(id, coordenadoria);
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void excluirCoordenadoria(@PathVariable Long id){
        coordenadoriaService.excluirCoordenadoria(id);
    }
}
