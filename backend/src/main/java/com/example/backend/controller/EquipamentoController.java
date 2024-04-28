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

    @PostMapping("/cadastro")
    public Equipamento cadastrarEquipamento(@RequestBody Equipamento equipamento){
        return equipamentoService.cadastrarEquipamento(equipamento);
    }

    @GetMapping("/listagem")
    public List<Equipamento> listarEquipamentos(){
        return equipamentoService.listarEquipamentos();
    }
}
