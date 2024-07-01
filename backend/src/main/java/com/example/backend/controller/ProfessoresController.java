package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> cadastrarProfessor(@RequestBody Professor professor) {
        if (professorService.encontrarProfessorPorMatricula(professor.getMatricula()) != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Já existe um professor cadastrado com essa matrícula");
        if (professorService.encontrarProfessorPorRFID(professor.getRfid()) == null)
            return ResponseEntity.ok(professorService.cadastrarProfessor(professor));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Já existe um professor cadastrado com esse cartão");
    }

    @GetMapping
    public List<Professor> listarProfessor() {
        return professorService.listarProfessor();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarProfessor(@PathVariable Long id, @RequestBody Professor professor) {
        if (professorService.encontrarProfessorPorRFID(professor.getRfid()) == null)
            return ResponseEntity.ok(professorService.editarProfessor(id, professor));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Já existe um professor cadastrado com esse cartão");

    }

    @DeleteMapping("/{id}")
    public void excluirProfessor(@PathVariable Long id) {
        professorService.excluirProfessor(id);
    }

}
