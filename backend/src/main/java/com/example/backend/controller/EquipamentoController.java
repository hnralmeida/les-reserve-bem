package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.backend.dominio.Equipamento;
import com.example.backend.service.EquipamentoService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/equipamentos")
public class EquipamentoController {
    
    @Autowired
    private EquipamentoService equipamentoService;

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @PostMapping
    public Equipamento cadastrarEquipamento(@RequestBody Equipamento equipamento){
        return equipamentoService.cadastrarEquipamento(equipamento);
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @GetMapping
    public List<Equipamento> listarEquipamentos(){
        return equipamentoService.listarEquipamentos();
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public Equipamento editarEquipamento(@PathVariable Long id, @RequestBody Equipamento equipamento){
        return equipamentoService.editarEquipamento(id, equipamento);
    }

    @CrossOrigin(origins="*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void excluirEquipamento(@PathVariable Long id){
        equipamentoService.excluirEquipamento(id);
    }
}
