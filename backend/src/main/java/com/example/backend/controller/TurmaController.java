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

import com.example.backend.dominio.Turma;
import com.example.backend.service.TurmaService;

@RestController
@RequestMapping("/turmas")
public class TurmaController {
    
    @Autowired
    private TurmaService turmaService;

    @PostMapping
    public Turma cadastrarTurma(@RequestBody Turma turma){
        return turmaService.caadstrarTurma(turma);
    }

    @GetMapping
    public List<Turma> listarTurmas(){
        return turmaService.listarTurma();
    }

    @PutMapping("/{id}")
    public Turma editarTurma(@PathVariable Long id, @RequestBody Turma turma){
        return turmaService.editarTurma(id, turma);
    }

    @DeleteMapping("/{id}")
    public void excluirTurma(@PathVariable Long id){
        turmaService.excluirTurma(id);
    }
}
