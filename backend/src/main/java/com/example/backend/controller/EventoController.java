package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dominio.Evento;
import com.example.backend.dominio.Locais;
import com.example.backend.service.EventoService;

@RestController
@RequestMapping("/eventos")
public class EventoController {
    
    @Autowired
    private EventoService eventoService;

    @PostMapping
    public Evento cadastrarEvento(@RequestBody Evento evento){
        Locais local = evento.getLocal();

        if(local != null)
            return eventoService.cadastrarEvento(evento);
        else
            return null;
    }

    @GetMapping
    public List<Evento> listarEventos(){
        return eventoService.listarEventos();
    }

    @PutMapping("/{id}")
    public Evento editarEvento(@PathVariable Long id, @RequestBody Evento evento){
        return eventoService.editarEvento(id, evento);
    }
    
    @DeleteMapping("/{id}")
    public void deletarEvento(@PathVariable Long id){
        eventoService.excluirEvento(id);
    }
}
