package com.example.backend.service;

import java.util.*;

import com.example.backend.dominio.*;
import com.example.backend.repository.AuditRepository;
import com.example.backend.repository.AulaAlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.repository.AulaRepository;

@Service
public class AulaService {
    @Autowired
    private AulaRepository aulaRepository;

    @Autowired
    private AulaAlunoRepository aulaAlunoRepository;

    @Autowired
    private AuditRepository auditRepository;

    public Aula cadastrarAula(Aula aula) {
        Aula a = aulaRepository.save(aula);
        if (a != null) {
            Audit audit = new Audit();
            audit.onPrePersist(aula.toString());
            auditRepository.save(audit);
        }
        return a;
    }

    public List<Aula> listarAula() {
        return aulaRepository.findAll();
    }

    public List<Aula> listarAulaPorTurma(Long turmaId, Long periodoId) {
        return aulaRepository.findByTurmaId(turmaId, periodoId);
    }

    public List<Aula> listarAulaPorLocal(Long localId, Long periodoId) {
        return aulaRepository.findByLocalId(localId, periodoId);
    }

    public List<Aula> listarAulaPorAluno(Long alunoId, Long periodoId) {
        return aulaRepository.findByAlunoId(alunoId, periodoId);
    }

    public Aula proximaAulaPorAluno(Aluno aluno, Long periodoId) {

        Aula prooxima = new Aula();
        List<Aula> aulaDoDia = new ArrayList<Aula>();
        Calendar c = Calendar.getInstance();
        c.setTime(new Date());

        if (aluno.getTurma() != null) {
            List<Aula> la = aulaRepository.findByTurmaId(aluno.getTurma().getId(), periodoId);

            // Ordena a lista de aulas pelo dia da semana e pelo horário
            la.sort(Comparator.comparing(Aula::getDiaDaSemanaInt)
                    .thenComparing(Aula::getHoraInicio));
            for (Aula aula : la) {

                if (aula.getDiaDaSemanaInt() == (Calendar.MONDAY)) {
                    aulaDoDia.add(aula);
                }
            }
            System.out.println("Ver aulas do dia " + Calendar.MONDAY + " ");

            for (Aula aula : aulaDoDia) {
                if (Calendar.HOUR > Integer.parseInt(aula.getHoraInicio().split(":")[0])) {
                    System.out.println(aula.getHoraInicio());
                } else {
                    return aula;
                }
            }

        }
        return null;
    }

    public List<Aula> listarAulaPorProfessor(Long professorId, Long periodoId) {
        return aulaRepository.findByProfessorId(professorId, periodoId);
    }

    public Aula proximaAulaPorProfessor(Professor professor, Long periodoId) {

        List<Aula> aulaDoDia = new ArrayList<Aula>();
        Calendar c = Calendar.getInstance();
        Date data = c.getTime();

        List<Aula> la = aulaRepository.findByProfessorId(professor.getId(), periodoId);

        // Ordena a lista de aulas pelo dia da semana e pelo horário
        la.sort(Comparator.comparing(Aula::getDiaDaSemanaInt)
                .thenComparing(Aula::getHoraInicio));
        for (Aula aula : la) {

            if (aula.getDiaDaSemanaInt() == (Calendar.MONDAY)) {
                aulaDoDia.add(aula);
            }
        }
        System.out.println("Ver aulas do dia " + Calendar.MONDAY + " ");

        for (Aula aula : aulaDoDia) {
            if (Calendar.HOUR > Integer.parseInt(aula.getHoraInicio().split(":")[0])) {
                System.out.println(aula.getHoraInicio());
            } else {
                return aula;
            }
        }

        return null;
    }

    public Optional<Aula> encontrarAulaPorId(Long id) {
        return aulaRepository.findById(id);
    }

    public Aula editarAula(Long id, Aula aula) {
        aula.setId(id);
        Aula pre = aulaRepository.getReferenceById(aula.getId());
        Aula a = aulaRepository.save(aula);
        if (a != null) {
            Audit audit = new Audit();
            audit.onPreUpdate(pre.toString(), aula.toString());
            auditRepository.save(audit);
        }
        return a;
    }

    public void cadastrarAulaAluno(Optional<Aluno> aluno, Aula aula) {
        AulaAluno a = new AulaAluno();
        Aluno aluno1 = aluno.orElse(null);
        a.setAula(aula);
        a.setAluno(aluno1);
        aulaAlunoRepository.save(a);
    }

    public void excluirAula(Long id) {
        aulaRepository.deleteById(id);
        Aula a = aulaRepository.getReferenceById(id);
        Audit audit = new Audit();
        audit.onPreRemove(a.toString());
        auditRepository.save(audit);
    }
}
