package com.example.backend.controller;

import com.example.backend.dominio.Audit;
import com.example.backend.dominio.Turma;
import com.example.backend.service.AuditService;
import com.example.backend.service.TurmaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit")
public class AuditController {
    
    @Autowired
    private AuditService auditService;

    @GetMapping
    public ResponseEntity<List<Audit>> listarAudits(){
        return ResponseEntity.ok(auditService.listarAudits());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Audit> buscarPorId(@PathVariable("id") Long id) {
        Audit auditoria = auditService.encontrarAudit(id);
        return ResponseEntity.ok(auditoria);
    }
}
