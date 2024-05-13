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

import com.example.backend.dominio.Aluno;
import com.example.backend.service.AlunoService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/alunos")
public class AlunosController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public Aluno cadastrarAluno(@RequestBody Aluno aluno) {
        return alunoService.cadastrarAluno(aluno);
    }

    @GetMapping
    public List<Aluno> listarAluno() {
        return alunoService.listarAlunos();
    }

    @PutMapping("/{id}")
    public Aluno editarAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
        return alunoService.editarAluno(id, aluno);
    }

    @DeleteMapping("/{id}")
    public void excluirAluno(@PathVariable Long id) {
        alunoService.excluirAluno(id);
    }

}
