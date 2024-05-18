package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.Aula;
import com.example.backend.service.AulaService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/aulas")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    @PostMapping
    public Aula cadastrarAula(@RequestBody Aula aula) {
        return aulaService.cadastrarAula(aula);
    }

    @GetMapping
    public List<Aula> listarAula() {
        return aulaService.listarAula();
    }

    @PutMapping("/{id}")
    public Aula editarAula(@RequestBody Aula aula, @PathVariable Long id) {
        return aulaService.editarAula(id, aula);
    }

    @DeleteMapping("/{id}")
    public void excluirAula(@PathVariable Long id) {
        aulaService.excluirAula(id);
    }
}
