package com.example.backend.controller;

import com.example.backend.dominio.Locais;
import com.example.backend.dominio.LocaisEquipamentos;
import com.example.backend.dominio.Equipamento;
import com.example.backend.service.EquipamentoService;
import com.example.backend.service.LocaisEquipamentosService;
import com.example.backend.service.LocaisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locais")
public class LocaisController {

    @Autowired
    private LocaisService turmaService;
    private LocaisEquipamentosService locaisEquipamentosService;
    private Equipamento equipamento;

    @PostMapping
    public Locais cadastrarLocais(@RequestBody Locais local, @RequestBody List<LocaisEquipamentos> locaisEquipamentos) {
        for (LocaisEquipamentos locaisEquipamento : locaisEquipamentos) {
            locaisEquipamentosService.cadastrarLocaisEquipamentos(locaisEquipamento);
        }
        return turmaService.cadastrarLocais(local);
    }

    @GetMapping
    public List<Locais> listarLocais() {
        return turmaService.listarLocais();
    }

    @PutMapping("/{id}")
    public Locais editarLocais(@PathVariable Long id, @RequestBody Locais turma,
            @RequestBody List<LocaisEquipamentos> locaisEquipamento, @RequestBody Equipamento equipamento) {
        return turmaService.editarLocais(id, turma);
    }

    @DeleteMapping("/{id}")
    public void excluirLocais(@PathVariable Long id) {
        turmaService.excluirLocais(id);
    }
}
