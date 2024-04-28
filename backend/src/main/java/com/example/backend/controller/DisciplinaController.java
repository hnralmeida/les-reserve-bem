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
import com.example.backend.dominio.Disciplina;
import com.example.backend.service.DisciplinaService;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {
    
    @Autowired
    private DisciplinaService disciplinaService;

    @PostMapping("/cadastro")
    public Disciplina cadastrarDisciplina(@RequestBody Disciplina disciplina, @RequestBody Coordenadoria coordenadoria){
        return disciplinaService.cadastrarDisciplina(disciplina, coordenadoria);
    }

    @GetMapping("/listagem")
    public List<Disciplina> listarDisciplinas(){
        return disciplinaService.listarDisciplinas();
    }

    @GetMapping("/{id}")
    public Disciplina buscarDisciplinaPorId(@PathVariable Long id, @RequestBody Disciplina disciplina){
        return disciplinaService.editarDisciplina(id, disciplina);
    }

    @DeleteMapping("/{id}")
    public void excluirDisciplina(@PathVariable Long id){
        disciplinaService.excluirDisciplina(id);
    }
}
