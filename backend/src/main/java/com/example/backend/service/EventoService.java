package com.example.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Evento;
import com.example.backend.repository.EventoRepository;

@Service
public class EventoService {
    
    @Autowired
    private EventoRepository eventoRepository;

    public Evento cadastrarEvento(Evento evento){
        return eventoRepository.save(evento);
    }

    public List<Evento> listarEventos(){
        return eventoRepository.findAll();
    }

    public Optional<Evento> encontrarEventoPorId(Long id){
        return eventoRepository.findById(id);
    }
    
    public Evento editarEvento(Long id, Evento evento){
        evento.setId(id);
        return eventoRepository.save(evento);
    }

    public void excluirEvento(Long id){
        eventoRepository.deleteById(id);
    }
}
