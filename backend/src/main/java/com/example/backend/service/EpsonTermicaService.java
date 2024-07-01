package com.example.backend.service;

import java.io.IOException;

import javax.print.PrintService;

import org.springframework.stereotype.Service;

import com.github.anastaciocintra.escpos.EscPos;
import com.github.anastaciocintra.output.PrinterOutputStream;

@Service
public class EpsonTermicaService {
    public void print(String printerName, String printerText) throws IOException {
        if (printerName == null || printerText.isEmpty()) {
            System.out.println("Printer name cannot be null or empty");
            return;
        }

        PrintService printService = PrinterOutputStream.getPrintServiceByName(printerName);
        if (printService == null) {
            System.out.println("Print service not found: " + printerName);
            return;
        }

        try (PrinterOutputStream printerOutputStream = new PrinterOutputStream(printService);
                EscPos escpos = new EscPos(printerOutputStream)) {

            if (printerText != null) {
                escpos.writeLF(printerText);
            } else {
                System.out.println("Text to print is null");
            }

            escpos.feed(5).cut(EscPos.CutMode.FULL);
        }
    }

}
