package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.dominio.Disciplina;
import com.example.backend.service.DisciplinaService;

@RestController
@RequestMapping("/disciplinas")
public class DisciplinaController {

    @Autowired
    private DisciplinaService disciplinaService;

    @PostMapping
    public Disciplina cadastrarDisciplina(@RequestBody Disciplina disciplina) {
        Coordenadoria coordenadoria = disciplina.getCoordenadoria();

        if (coordenadoria != null)
            return disciplinaService.cadastrarDisciplina(disciplina);
        else
            return null;
    }

    @GetMapping
    public List<Disciplina> listarDisciplinas() {
        return disciplinaService.listarDisciplinas();
    }

    @PutMapping("/{id}")
    public Disciplina buscarDisciplinaPorId(@PathVariable Long id, @RequestBody Disciplina disciplina) {
        return disciplinaService.editarDisciplina(id, disciplina);
    }

    @DeleteMapping("/{id}")
    public void excluirDisciplina(@PathVariable Long id) {
        disciplinaService.excluirDisciplina(id);
    }
}
