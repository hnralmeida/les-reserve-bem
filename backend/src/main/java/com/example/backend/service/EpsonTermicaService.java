package com.example.backend.service;

import java.io.IOException;
import java.util.List;

import javax.print.PrintService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.DTOPrinter.AulaPrinter;
import com.github.anastaciocintra.escpos.EscPos;
import com.github.anastaciocintra.output.PrinterOutputStream;

@Service
public class EpsonTermicaService {

    @Value("${printerTermic.name}")
    private String printerName;

    public void print(String texto) throws IOException {
        PrintService printService = PrinterOutputStream.getPrintServiceByName(printerName);
        if (printService == null) {
            System.out.println("Impressora não localizada");
            return;
        }

        try (PrinterOutputStream printerOutputStream = new PrinterOutputStream(printService);
                EscPos escpos = new EscPos(printerOutputStream)) {

            if (texto != null) {
                escpos.writeLF(texto);
            } else {
                System.out.println("Text to print is null");
            }

            escpos.feed(5).cut(EscPos.CutMode.FULL);
        }
    }

    public void printAulasAluno(List<AulaPrinter> aulas) throws IOException {
        PrintService printService = PrinterOutputStream.getPrintServiceByName(printerName);
        if (printService == null) {
            System.out.println("Impressora não localizada");
            return;
        }
        try (PrinterOutputStream printerOutputStream = new PrinterOutputStream(printService);
                EscPos escpos = new EscPos(printerOutputStream)) {

            if (!aulas.isEmpty()) {
                AulaPrinter firstAula = aulas.get(0);
                escpos.writeLF("Aluno: " + firstAula.getAlunoNome());
                escpos.writeLF("");
            }
            for (AulaPrinter aula : aulas) {
                escpos.writeLF(aula.getDiaDaSemana() + " : " + aula.getHoraInicio() + " - " + aula.getHoraFim());
                escpos.writeLF("Disciplina: " + aula.getDisciplinaNome());
                escpos.writeLF("Professor: " + aula.getProfessorNome());
                escpos.writeLF("Local: " + aula.getLocalNome());
                escpos.feed(1);
            }

            escpos.feed(5).cut(EscPos.CutMode.FULL);
        }
    }

    public void printAulasProfessor(List<AulaPrinter> aulas) throws IOException {
        PrintService printService = PrinterOutputStream.getPrintServiceByName(printerName);
        if (printService == null) {
            System.out.println("Impressora não localizada");
            return;
        }
        try (PrinterOutputStream printerOutputStream = new PrinterOutputStream(printService);
                EscPos escpos = new EscPos(printerOutputStream)) {

            if (!aulas.isEmpty()) {
                AulaPrinter firstAula = aulas.get(0);
                escpos.writeLF("Professor: " + firstAula.getProfessorNome());
                escpos.writeLF("");
            }
            for (AulaPrinter aula : aulas) {
                escpos.writeLF(aula.getDiaDaSemana() + " : " + aula.getHoraInicio() + " - " + aula.getHoraFim());
                escpos.writeLF("Disciplina: " + aula.getDisciplinaNome());
                escpos.writeLF("Local: " + aula.getLocalNome());
                escpos.feed(1);
            }

            escpos.feed(5).cut(EscPos.CutMode.FULL);
        }
    }
}