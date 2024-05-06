package com.example.backend.controller;

import com.example.backend.dominio.Locais;
import com.example.backend.service.LocaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locais")
public class LocaisController {
    
    @Autowired
    private LocaisService turmaService;

    @PostMapping
    public Locais cadastrarLocais(@RequestBody Locais local){
        return turmaService.cadastrarLocais(local);
    }

    @GetMapping
    public List<Locais> listarLocais(){
        return turmaService.listarLocais();
    }

    @PutMapping("/{id}")
    public Locais editarLocais(@PathVariable Long id, @RequestBody Locais turma){
        return turmaService.editarLocais(id, turma);
    }

    @DeleteMapping("/{id}")
    public void excluirLocais(@PathVariable Long id){
        turmaService.excluirLocais(id);
    }
}
