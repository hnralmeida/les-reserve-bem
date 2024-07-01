package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.Periodo;
import com.example.backend.service.PeriodoService;

@RestController
@RequestMapping("/periodos")
public class PeriodoController {

    @Autowired
    private PeriodoService periodoService;

    @PostMapping
    public ResponseEntity<?> cadastrarPeriodo(@RequestBody Periodo periodo) {

        if (periodoService.encontrarPeriodoAbrangente(periodo.getDataInicio()) != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data de início está em um período existente");

        if (periodoService.encontrarPeriodoAbrangente(periodo.getDataFim()) != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data de fim está em um período existente");

        return ResponseEntity.ok(periodoService.cadastrarPeriodo(periodo));

    }

    @GetMapping
    public List<Periodo> listarPeriodos() {
        return periodoService.listarPeriodos();
    }

    @PutMapping("/{id}")
    public Periodo editarPeriodo(@PathVariable Long id, @RequestBody Periodo periodo) {
        return periodoService.editarPeriodo(id, periodo);
    }

    @DeleteMapping("/{id}")
    public void excluirPeriodo(@PathVariable Long id) {
        periodoService.excluirPeriodo(id);
    }
}
