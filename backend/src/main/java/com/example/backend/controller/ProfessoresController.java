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

import com.example.backend.dominio.Professor;
import com.example.backend.service.ProfessorService;

@RestController
@RequestMapping("/professores")
public class ProfessoresController {

    @Autowired
    private ProfessorService professorService;

    @PostMapping
    public Professor cadastrarProfessor(@RequestBody Professor professor) {
        return professorService.cadastrarProfessor(professor);
    }

    @GetMapping
    public List<Professor> listarProfessor() {
        return professorService.listarProfessor();
    }

    @PutMapping("/{id}")
    public Professor editarProfessor(@PathVariable Long id, @RequestBody Professor professor) {
        return professorService.editarProfessor(id, professor);
    }

    @DeleteMapping("/{id}")
    public void excluirProfessor(@PathVariable Long id) {
        professorService.excluirProfessor(id);
    }

}
