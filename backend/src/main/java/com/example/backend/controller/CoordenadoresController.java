package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.Coordenador;
import com.example.backend.service.CoordenadorService;

@RestController
@RequestMapping("/coordenadores")
public class CoordenadoresController {

    @Autowired
    private CoordenadorService coordenadorService;

    @PostMapping
    public Coordenador cadastrarCoordenador(@RequestBody Coordenador coordenador) {
        return coordenadorService.cadastrarCoordenador(coordenador);
    }

    @GetMapping
    public List<Coordenador> listarCoordenador() {
        return coordenadorService.listarCoordenador();
    }

    @PutMapping("/{id}")
    public Coordenador editarCoordenador(@PathVariable Long id, @RequestBody Coordenador coordenador) {
        return coordenadorService.editarCoordenador(id, coordenador);
    }

    @DeleteMapping("/{id}")
    public void excluirCoordenador(@PathVariable Long id) {
        coordenadorService.excluirCoordenadores(id);
    }

}
