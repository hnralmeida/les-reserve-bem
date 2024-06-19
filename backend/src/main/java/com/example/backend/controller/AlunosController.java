package com.example.backend.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.service.CoordenadoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Aluno;
import com.example.backend.service.AlunoService;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;

@RestController
@RequestMapping("/alunos")
public class AlunosController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private CoordenadoriaService coordenadoriaService;

    @PostMapping
    public Aluno cadastrarAluno(@RequestBody Aluno aluno) {
        return alunoService.cadastrarAluno(aluno);
    }

    @PostMapping("/importar")
    public String importarAluno(@RequestParam("file") MultipartFile file) {
        String msg = "";
        List<Aluno> sucess = new ArrayList<>(), failure = new ArrayList<>();
        String TYPE = "text/csv";

        if (TYPE.equals(file.getContentType())) {
            try {
                BufferedReader fileReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8));
                CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

                List<Aluno> alunos = new ArrayList<Aluno>();

                Iterable<CSVRecord> csvRecords = csvParser.getRecords();

                for (CSVRecord csvRecord : csvRecords) {
                    Aluno aluno = new Aluno();

                    try {
                        alunoService.cadastrarAluno(aluno);
                        sucess.add(aluno);
                    } catch (Exception e) {
                        failure.add(aluno);
                    }
                }
            } catch (Exception e) {
                msg = "Não foi possível fazer upload do arquivo " + file.getOriginalFilename();
                return msg;
            }
        }
        msg = "cadastrados " + sucess.size() + " alunos do arquivo " + file.getOriginalFilename();
        return "{ mensagem: {" + msg + "}, falhas: " + failure + "}";
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
