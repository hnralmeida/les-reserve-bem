package com.example.backend.controller;

import java.util.Calendar;
import java.util.List;

import com.example.backend.dominio.Aula;
import com.example.backend.dominio.Periodo;
import com.example.backend.service.AulaService;
import com.example.backend.service.PeriodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private PeriodoService periodoService;

    @Autowired
    private AulaService aulaService;

    @PostMapping
    public ResponseEntity<?> cadastrarEvento(@RequestBody Evento evento) {

        if (evento.getLocal() != null) {
            Periodo paux = periodoService.encontrarPeriodoAbrangente(evento.getDataInicio());
            List<Aula> validator = aulaService.listarAulaPorLocal(evento.getLocal().getId(), paux.getId());
            System.out.println("Periodo: " + paux.getNome());

            if (validator != null) {
                for (Aula aulaValidator : validator) {

                    Calendar cal = Calendar.getInstance();
                    cal.setTime(evento.getDataInicio());

                    if (aulaValidator.getDiaDaSemanaInt() == cal.get(Calendar.DAY_OF_WEEK))
                        if (aulaValidator.getHoraInicio().equals(cal.get(Calendar.HOUR_OF_DAY) + ":" + cal.get(Calendar.MINUTE)))
                            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                                    "Local em uso às " + cal.get(Calendar.HOUR_OF_DAY) + ":" + cal.get(Calendar.MINUTE) +
                                            " do dia " + cal.get(Calendar.DAY_OF_MONTH) + "/" +
                                            (cal.get(Calendar.MONTH) + 1) + " na disciplina de " + aulaValidator.getDisciplina().getNome() +
                                            " do Professor " + aulaValidator.getProfessor().getNome()
                            );
                }
            }
            return ResponseEntity.ok(eventoService.cadastrarEvento(evento));
        } else
            return null;
    }

    @GetMapping
    public List<Evento> listarEventos() {
        return eventoService.listarEventos();
    }

    @PutMapping("/{id}")
    public Evento editarEvento(@PathVariable Long id, @RequestBody Evento evento) {
        return eventoService.editarEvento(id, evento);
    }

    @DeleteMapping("/{id}")
    public void deletarEvento(@PathVariable Long id) {
        eventoService.excluirEvento(id);
    }
}
