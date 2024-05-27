package com.example.backend.controller;

import com.example.backend.dominio.Equipamento;
import com.example.backend.dominio.Locais;
import com.example.backend.dominio.LocaisEquipamentos;
import com.example.backend.service.EquipamentoService;
import com.example.backend.service.LocaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/locais")
public class LocaisController {

    @Autowired
    private LocaisService locaisService;

    @Autowired
    private EquipamentoService equipamentoService;

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
