package com.example.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.TermicalPrint;
import com.example.backend.service.EpsonTermicaService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prints")
public class EspsonTermalController {

    @Autowired
    private EpsonTermicaService epsonTermicaService;

    @PostMapping
    public void print(@RequestBody TermicalPrint request) {
        System.out.println(request.getPrinterName());
        System.out.println(request.getTexto());
        try {
            epsonTermicaService.print(request.getPrinterName(), request.getTexto());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
