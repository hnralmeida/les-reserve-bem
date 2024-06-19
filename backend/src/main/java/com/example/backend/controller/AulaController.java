package com.example.backend.controller;

import java.util.List;

import com.example.backend.dominio.Aluno;
import com.example.backend.dominio.Periodo;
import com.example.backend.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Aula;
import com.example.backend.service.AulaService;

@RestController
@RequestMapping("/aulas")
public class AulaController {

    @Autowired
    private AulaService aulaService;

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public Aula cadastrarAula(@RequestBody Aula aula) {
        return aulaService.cadastrarAula(aula);
    }

    @GetMapping
    public List<Aula> listarAula() {
        return aulaService.listarAula();
    }

    @GetMapping("/turma/{turmaId}")
    public List<Aula> listarAulaPorTurma(@PathVariable Long turmaId, @RequestParam Long periodoId) {
        return aulaService.listarAulaPorTurma(turmaId, periodoId);
    }

    @GetMapping("/local/{localId}")
    public List<Aula> listarAulaPorLocal(@PathVariable Long localId, @RequestParam Long periodoId) {
        return aulaService.listarAulaPorLocal(localId, periodoId);
    }

    @GetMapping("/aluno/{alunoMatricula}")
    public List<Aula> listarAulaPorAluno(@PathVariable Long alunoMatricula, @RequestParam Long periodoId) {
        Aluno aluno = alunoService.encontrarAlunoPorMatricuka(alunoMatricula);
        return aulaService.listarAulaPorAluno(aluno.getId(), periodoId);
    }

    @GetMapping("/professor/{professorId}")
    public List<Aula> listarAulaPorProfessor(@PathVariable Long professorId, @RequestParam Long periodoId) {
        return aulaService.listarAulaPorProfessor(professorId, periodoId);
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
