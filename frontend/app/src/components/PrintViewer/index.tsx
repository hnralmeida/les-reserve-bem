import React from "react";
import * as Print from "expo-print";

type props = {
  modelo: string;
  local?: any;
  turma?: any;
  horarioIndividual: any[];
};

export function onPrint({ modelo, local, turma, horarioIndividual }: props) {
  const dataImpressao = new Date().toLocaleString();

  let printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Horário do ${modelo === "Aluno" ? "Aluno" : "Professor"}</title>
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
  
          .printBody {
              border: solid black 1px;
              border-radius: 10px;
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 20px;
              box-sizing: border-box;
          }
          body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              font-size: 12px;
              width: 80mm;
              height: 297mm;
              box-sizing: border-box;
          }
          h1 {
              font-size: 16px;
              margin: 0;
              padding: 0;
              font-family: "Space Mono", monospace;
              font-weight: 700;
              font-style: normal;
          }
          h2 {
              font-size: 14px;
              margin: 0;
              padding: 0;
              font-family: "Space Grotesk", sans-serif;
              font-optical-sizing: auto;
              font-weight: 600;
              font-style: normal;
          }
          .logoIfes {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .logoIfes img {
              max-width: 100%;
              height: auto;
              object-fit: contain;
              filter: invert(100%);
              margin: 0 0 18px 0;
          }
          .separator {
              width: 100%;
              background-color: black;
              height: 1px;
              margin: 16px 0;
          }
          p {
              font-family: "Space Grotesk", sans-serif;
              font-optical-sizing: auto;
              font-weight: 400;
              font-style: normal;
          }
          .bodyText {
              font-size: 12px;
          }
          .tabelaDia {
              margin: 5px 0 0 0;
          }
          table {
              width: 100%;
              border-collapse: collapse;
          }
          td:not(:first-child), td:not(:last-child) {
            border-top: 1px solid grey;
          }
          th:first-child, td:first-child {
              border-right: 1px solid grey;
          }
          th:last-child, td:last-child {
              border-left: 1px solid grey;
          }
          th {
              text-align: left;
              padding: 5px;
          }
          .tableHeader th {
              font-family: "Space Grotesk", sans-serif;
              font-optical-sizing: auto;
              font-weight: 700;
              font-style: normal;
              font-size: 12px;
          }
          .tableBody th, .tableBody td {
              font-family: "Space Grotesk", sans-serif;
              font-optical-sizing: auto;
              font-weight: 400;
              font-style: normal;
              font-size: 11px;
              padding: 4px;
          }
          .horarioCol {
              width: 10mm; /* Tamanho fixo para a coluna de horários */
          }
  
          @media print {
              @page {
                  size: 80mm 297mm;
                  margin: 0;
              }
              body {
                  margin: 0;
                  padding: 0 20px 20px 20px;
                  width: 80mm;
                  height: fit-content;
                  box-sizing: border-box;
                  -webkit-print-color-adjust: exact;
              }
              .printBody {
                  border: solid black 1px;
                  border-radius: 10px;
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 20px;
                  box-sizing: border-box;
              }
              .logoIfes img {
                  filter: invert(100%);
              }
              .separator {
                  background-color: black;
              }
          }
        </style>
      </head>
      <body>
        <div class="printBody">
          <div class="logoIfes">
            <img src="../../../assets/ifes.png" alt="Logo IFES" />
          </div>
          <div class="header">
            <h1>RELAToRIO DE AULAS</h1>
            <h2>${modelo}</h2>
          </div>
          <div class="separator"></div>
          <p class="bodyText">Data de requisição: ${dataImpressao}</p>
          <div class="separator"></div>
    `;

  const diasSemanaOrdenados = [
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
    "Domingo",
  ];

  printContent += `
            <div class="tabelaDia">
              <table>
                <tr class="tableHeader">
                  <th class="horarioCol">Horário</th>
                  <th>Disciplina</th>
                  <th>Local</th>
                </tr>
            `;

  diasSemanaOrdenados.forEach((dia) => {
    const aulasDoDia = horarioIndividual.filter(
      (item: any) => item.diaDaSemana === dia
    );
    console.log(aulasDoDia);
    if (aulasDoDia.length > 0) {
      aulasDoDia.forEach((aula: any) => {
        if (aula == undefined || aula == "") null;
        else
          printContent += `
              <tr class="tableBody">
                <td class="horarioCol">${dia} : ${aula.horaInicio} - ${aula.horaFim}</td>
                <td>${aula.disciplina?.nome}</td>
                <td>${aula.local?.nomeLocal}</td>
              </tr>`;
      });
    }
  });

  printContent += `
        </div>
      </body>
      </html>
    `;

  const printWindow = window.open("", "_blank", "width=800,height=600");

  if (printWindow) {
    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow?.print();
    }, 500); // 500 milissegundos de atraso
  }
}
