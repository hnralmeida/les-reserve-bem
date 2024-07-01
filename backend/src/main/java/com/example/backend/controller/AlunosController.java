package com.example.backend.controller;

import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.example.backend.service.CoordenadoriaService;
import com.example.backend.service.TurmaService;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dominio.Aluno;
import com.example.backend.service.AlunoService;
import org.springframework.web.multipart.MultipartFile;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/alunos")
public class AlunosController {

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private CoordenadoriaService coordenadoriaService;

    @Autowired
    private TurmaService turmaService;

    @PostMapping
    public ResponseEntity<?> cadastrarAluno(@RequestBody Aluno aluno) {
        if (alunoService.encontrarAlunoPorMatricula(Long.valueOf(aluno.getMatricula())) == null)
            return ResponseEntity.ok(alunoService.cadastrarAluno(aluno));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Já existe um aluno com essa matrícula");
    }

    @PostMapping("/importar")
    public ResponseEntity<?> importarAluno(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {
        String msg = "";
        List<Aluno> success = new ArrayList<>(), failure = new ArrayList<>();
        String TYPE = "text/csv";

        if (!TYPE.equals(file.getContentType())) {
            msg = "Tipo de arquivo inválido. Por favor, carregue um arquivo CSV.";
            return ResponseEntity.ok(msg);
        }
        // File data = new File("temp", file.getResource().getContentAsString(Charset.defaultCharset()));
        File tempFile = File.createTempFile("temp", ".csv");
        file.transferTo(tempFile);

        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(new FileInputStream(tempFile), StandardCharsets.UTF_8));
             CSVParser csvParser = new CSVParser(fileReader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim())) {
            System.out.println("Arquivo aberto - " + tempFile.getName());
            for (CSVRecord csvRecord : csvParser) {
                Aluno aluno = new Aluno();
                aluno.setNome(csvRecord.get("Nome"));
                aluno.setMatricula(csvRecord.get("Matricula"));
                aluno.setEmail(csvRecord.get("Email"));
                aluno.setSenha(csvRecord.get("Senha"));
                aluno.setTurma(turmaService.encontrarTurmaPorId(Long.parseLong(csvRecord.get("Turma"))));
                aluno.setCoordenadoria(coordenadoriaService.encontrarCoordenadoriaPorId(Long.parseLong(csvRecord.get("Coordenadoria"))));

                try {
                    if (alunoService.encontrarAlunoPorMatricula(Long.valueOf(aluno.getMatricula())) == null) {
                        alunoService.cadastrarAluno(aluno);
                        success.add(aluno);
                    } else failure.add(aluno);
                } catch (Exception e) {
                    failure.add(aluno);
                }
            }

            msg = "Arquivo carregado com sucesso: " + file.getOriginalFilename();
        } catch (Exception e) {
            msg = "Falha ao carregar o arquivo: " + e.getMessage();
            e.printStackTrace();
        }

        // msg = "message: {" + msg + "}, success: { " + success +"}, failure: { " + failure + "}";

        return ResponseEntity.ok(success);

    }

    @GetMapping
    public List<Aluno> listarAluno() {
        return alunoService.listarAlunos();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
        Aluno validar = alunoService.encontrarAlunoPorMatricula(Long.valueOf(aluno.getMatricula()));
        if ( validar == null || validar.getNome().equals(aluno.getNome()) || validar.getEmail().equals(aluno.getEmail()))
            return ResponseEntity.ok(alunoService.editarAluno(id, aluno));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Já existe um aluno com essa matrícula");

    }

    @DeleteMapping("/{id}")
    public void excluirAluno(@PathVariable Long id) {
        alunoService.excluirAluno(id);
    }

}
