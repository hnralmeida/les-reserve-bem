package com.example.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.TermicalPrint;
import com.example.backend.dominio.DTOPrinter.AulaPrinter;
import com.example.backend.service.EpsonTermicaService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prints")
public class EspsonTermalController {

    @Autowired
    private EpsonTermicaService epsonTermicaService;

    @PostMapping("/test")
    public void print(@RequestBody TermicalPrint request) {
        System.out.println(request.getPrinterName());
        System.out.println(request.getTexto());
        try {
            epsonTermicaService.print(request.getTexto());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/horariosAluno")
    public void printAulasAluno(@RequestBody List<AulaPrinter> aulas) {
        try {
            epsonTermicaService.printAulasAluno(aulas);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/horariosProfessor")
    public void printAulasProfessor(@RequestBody List<AulaPrinter> aulas) {
        try {
            epsonTermicaService.printAulasProfessor(aulas);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
