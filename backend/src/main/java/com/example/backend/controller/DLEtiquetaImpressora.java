package com.example.backend.controller;

import java.io.IOException;

import javax.print.PrintException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.DTOPrinter.EtiquetaPrinter;
import com.example.backend.service.DLEtiquetaService;

import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.output.OutputException;

@RestController
@RequestMapping("/etiquetas")
public class DLEtiquetaImpressora {

    @Autowired
    private DLEtiquetaService dlEtiquetaService;

    @PostMapping
    public void print(@RequestBody EtiquetaPrinter request) {
        try {
            dlEtiquetaService.generateBarCode(request.getMatricula());
        } catch (OutputException | IOException | BarcodeException | PrintException e) {
            e.printStackTrace();
        }
    }

    @GetMapping
    public void listarPrinters() {
        dlEtiquetaService.listarPrinters();
    }

}
