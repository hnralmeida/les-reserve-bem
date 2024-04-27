package com.example.backend.gerTarefas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.backend.dominio.Equipamento;
import com.example.backend.dominio.Locais;
import com.example.backend.dominio.LocaisEquipamentos;



@SpringBootApplication
public class GerenciadorDominio {

	
	
	public static void main(String[] args) {
		Equipamento equipamento = new Equipamento();
		Locais locais = new Locais();
		LocaisEquipamentos localEquip = new LocaisEquipamentos();
		SpringApplication.run(GerenciadorDominio.class, args);
	}

}
