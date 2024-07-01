package com.example.backend.service;

import net.sourceforge.barbecue.Barcode;
import net.sourceforge.barbecue.BarcodeException;
import net.sourceforge.barbecue.BarcodeFactory;
import net.sourceforge.barbecue.output.OutputException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.print.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class DLEtiquetaService {

    @Value("${printerEtiqueta.name}")
    private String printerName;

    public void generateBarCode(String etiqueta) throws OutputException, IOException, PrintException, BarcodeException {
        Barcode barcode = BarcodeFactory.createCode39(etiqueta, true);
        BufferedImage barcodeImage = new BufferedImage(barcode.getWidth(), barcode.getHeight(),
                BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = barcodeImage.createGraphics();
        barcode.draw(g2d, 0, 0);
        g2d.dispose();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        javax.imageio.ImageIO.write(barcodeImage, "png", baos);
        byte[] barcodeBytes = baos.toByteArray();

        DocFlavor flavor = DocFlavor.BYTE_ARRAY.PNG;
        PrintService[] printServices = PrintServiceLookup.lookupPrintServices(flavor, null);
        PrintService printService = null;

        for (PrintService ps : printServices) {
            if (ps.getName().equals(printerName)) {
                printService = ps;
                break;
            }

            if (printService == null) {
                throw new PrintException("Impressora não encontrada: " + printerName);
            }

            DocPrintJob printJob = printService.createPrintJob();
            Doc doc = new SimpleDoc(barcodeBytes, flavor, null);
            printJob.print(doc, null);

        }
    }
}
