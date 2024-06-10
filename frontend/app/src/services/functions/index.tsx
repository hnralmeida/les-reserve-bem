import dayjs from 'dayjs';

class functionLib {

    // converte data gerada por Datejs para data em formato legível
    toDate(data: any) {
        console.log(data);
        // Obtenha os componentes de data (dia, mês, ano) da data
        const dia = data.getDate();
        const mes = data.getMonth() + 1; // Os meses são indexados a partir de 0
        const ano = data.getFullYear();

        // Formate a data e o tempo em um formato legível
        const dataLegivel = `${dia}/${mes}/${ano}`;
        console.log(dataLegivel);
        return dataLegivel;
    }

    // converte data de ISO string para data em formato DD/MM/YYYY
    toReadableDate(data: any) {
        const date = new Date(data);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    // converte data de Iso String para horário
    toReadableHour(data: any) {
        const date = new Date(data);
        console.log(date);
        return `${date.getHours()}:${date.getMinutes()}`;
    }

    toHours(obj: any) {
        return `${obj.h}:${obj.m}`
    }
    //recebe data no formato DATE e hora e minutos e retorna data e hora concatenadas
    concatenaDataHora(data: any, hora: any) {
        data = data.toISOString().split('T')[0];
        return `${data}T${hora}:00`;
    }

    arrayDiasDaSemana () {
        return [
            "Segunda-Feira",
            "Terça-Feira",
            "Quarta-Feira",
            "Quinta-Feira",
            "Sexta-Feira",
            "Sábado"
        ]
    }

    //retorna um array com os horários das aulas
    arrayHorarios() {
        return [
            "07:00",
            "07:55",
            "08:50",
            "10:00",
            "10:55",
            "11:50",
            "12:50",
            "13:45",
            "14:40",
            "15:50",
            "16:45",
            "17:40",
            "18:50",
            "19:35",
            "20:30",
            "21:15"
        ]
    }

    arrayAulas() {
        return [
            {
                h: '07',
                m: '00'
            },
            {
                h: '07',
                m: '55'
            },
            {
                h: '08',
                m: '50'
            },
            {
                h: '10',
                m: '00'
            },
            {
                h: '10',
                m: '55'
            },
            {
                h: '11',
                m: '50'
            },

            {
                h: '12',
                m: '50'
            },
            {
                h: '13',
                m: '45'
            },
            {
                h: '14',
                m: '40'
            },
            {
                h: '15',
                m: '50'
            },
            {
                h: '16',
                m: '45'
            },
            {
                h: '17',
                m: '40'
            },

            {
                h: '18',
                m: '50'
            },
            {
                h: '19',
                m: '35'
            },
            {
                h: '20',
                m: '30'
            },
            {
                h: '21',
                m: '15'
            }
        ]
    }

}

export default functionLib;