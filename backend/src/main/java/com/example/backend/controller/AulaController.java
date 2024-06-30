package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import com.example.backend.dominio.Aluno;
import com.example.backend.dominio.Professor;
import com.example.backend.dominio.Usuario;
import com.example.backend.service.AlunoService;
import com.example.backend.service.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private ProfessorService professorService;

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
        Aluno aluno = alunoService.encontrarAlunoPorMatricula(alunoMatricula);
        // return aulaService.listarAulaPorAluno(aluno.getId(), periodoId);

        // Esse trecho existe por que para o retorno anterior funcionar é necessário criar
        // os controladores que relacionam aula-aluno no AulaController
        if(aluno.getTurma()!=null){
            System.out.println(aluno.getNome());
            return aulaService.listarAulaPorTurma(aluno.getTurma().getId(), periodoId);
        }else {
            System.out.println(aluno.getTurma()!=null);
            return null;
        }
    }

    @GetMapping("/proxima/{matricula}")
    public ResponseEntity<?> proximaAulaPorAluno(@PathVariable Long matricula, @RequestParam Long periodoId) {
        Usuario pessoa = alunoService.encontrarAlunoPorMatricula(matricula);
        if (pessoa==null) {
            pessoa = professorService.encontrarProfessorPorMatricula(String.valueOf(matricula));
        }

        if (pessoa!=null){
            Aula prox = aulaService.proximaAulaPorAluno((Aluno) pessoa, periodoId);
            if (prox!=null) return ResponseEntity.ok(prox);
            else return ResponseEntity.status(HttpStatus.ACCEPTED).body("Não há mais aulas hoje");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nenhuma matricula foi encontrado");
    }

    @GetMapping("/professor/{professorMatricula}")
    public ResponseEntity<?> listarAulaPorProfessor(@PathVariable String professorMatricula, @RequestParam Long periodoId) {
        Optional<Professor> p = Optional.ofNullable(professorService.encontrarProfessorPorMatricula(professorMatricula));

        if (p.isPresent()) {
            List<Aula> aulas = aulaService.listarAulaPorProfessor(p.get().getId(), periodoId);
            return ResponseEntity.ok(aulas);
        } else {
            String mensagemErro = "Professor com a matrícula " + professorMatricula + " não encontrado.";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mensagemErro);
        }
    }

    @GetMapping("/professor/proxima/{professorMatricula}")
    public Aula proximaAulaPorProfessor(@PathVariable Long professorMatricula, @RequestParam Long periodoId) {
        Professor professor = professorService.encontrarProfessorPorMatricula(String.valueOf(professorMatricula));
        if (professor!=null)
            return aulaService.proximaAulaPorProfessor(professor, periodoId);
        else return null;
    }

    @PostMapping("/aluno/{id}")
    public ResponseEntity<?> CadastrarAulaPorAluno(@PathVariable Long idAluno, @RequestParam List<Aula> aulas) {
        Optional<Aluno> aluno = alunoService.encontrarAlunoPorId(idAluno);

        for (Aula aula : aulas) {
            aulaService.cadastrarAulaAluno(aluno, aula);
        }
        return (ResponseEntity<?>) aulas;
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
