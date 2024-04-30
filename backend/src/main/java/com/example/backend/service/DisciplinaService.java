package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dominio.Coordenadoria;
import com.example.backend.dominio.Disciplina;
import com.example.backend.repository.DisciplinaRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Service
public class DisciplinaService {
    
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Disciplina cadastrarDisciplina(Disciplina disciplina){

        return disciplinaRepository.save(disciplina);
    }

    @Transactional
    public List<Object[]> listarDisciplinasComCoordenadoria(){
        String jpql = "Select d, c from Disciplina d JOIN d.coordenadoria c";
        return entityManager.createQuery(jpql, Object[].class).getResultList();
    }

    public List<Disciplina> listarDisciplinas(){
        return disciplinaRepository.findAll();
    }

    public Disciplina editarDisciplina(Long id, Disciplina disciplina){
        disciplina.setId(id);
        return disciplinaRepository.save(disciplina);
    }

    public void excluirDisciplina(Long id){
        disciplinaRepository.deleteById(id);
    }
}
