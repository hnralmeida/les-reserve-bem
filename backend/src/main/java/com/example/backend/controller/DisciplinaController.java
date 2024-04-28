package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
}
