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
    private LocaisService locaisService;

    @PostMapping
    public Locais cadastrarLocais(@RequestBody Locais local) {
        return locaisService.cadastrarLocais(local);
    }

    @GetMapping
    public List<Locais> listarLocais() {
        return locaisService.listarLocaisComEquipamentos();
    }

    @PutMapping("/{id}")
    public Locais editarLocais(@PathVariable Long id, @RequestBody Locais local) {
        return locaisService.editarLocais(id, local);
    }

    @DeleteMapping("/{id}")
    public void excluirLocais(@PathVariable Long id) {
        locaisService.excluirLocais(id);
    }
}
