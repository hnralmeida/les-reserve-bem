package com.example.backend.service;

import net.sourceforge.barbecue.*;
import net.sourceforge.barbecue.output.OutputException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import javax.print.*;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Service
public class DLEtiquetaService {

    private static final Logger logger = LoggerFactory.getLogger(DLEtiquetaService.class);

    @Value("${printerEtiqueta.name}")
    private String printerName;

    public void generateBarCode(String etiqueta) throws OutputException, IOException, PrintException, BarcodeException {
        Barcode barcode = BarcodeFactory.createCode39(etiqueta, true);

        int width = (int) (2 * 300 / 2.54);
        int height = (int) (3.5 / 2.54);

        // Debug
        BufferedImage barcodeImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D g2d = barcodeImage.createGraphics();
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g2d.setColor(Color.WHITE);
        g2d.setColor(Color.BLACK);

        int barcodeWidth = barcode.getWidth();
        int barcodeHeight = barcode.getHeight();
        int x = (width - barcodeWidth) / 2;
        int y = (height - barcodeHeight) / 2;
        barcode.draw(g2d, x, y);
        g2d.dispose();

        // Converter Barcode para BufferedImage
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(barcodeImage, "png", baos);
        byte[] barcodeBytes = baos.toByteArray();

        DocFlavor flavor = DocFlavor.BYTE_ARRAY.PNG;
        PrintService[] printServices = PrintServiceLookup.lookupPrintServices(flavor, null);
        PrintService printService = null;

        for (PrintService ps : printServices) {
            System.out.println("Impressora encontrada: " + ps.getName());
            if (ps.getName().equalsIgnoreCase(printerName)) {
                printService = ps;
                break;
            }
        }

        if (printService == null) {
            throw new PrintException("Impressora não encontrada: " + printerName);
        }

        File outputfile = new File("barcode.png");
        ImageIO.write(barcodeImage, "png", outputfile);
        logger.info("Codigo de barras salvo em: " + outputfile.getAbsolutePath());

        DocPrintJob printJob = printService.createPrintJob();
        Doc doc = new SimpleDoc(barcodeBytes, flavor, null);
        printJob.print(doc, null);

    }

    public void listarPrinters() {
        PrintService[] printServices = PrintServiceLookup.lookupPrintServices(null, null);
        for (PrintService printService : printServices) {
            System.out.println("Impressora disponivel: " + printService.getName());
        }
    }

}
