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

    // Converte data do formado DD/MM/YYYY para Dayjs
    toDayjs(data:any) {
        // Divide a string da data em dia, mês e ano
        const [dia, mes, ano] = data.split('/');
    
        // Formata a data para o formato ISO YYYY-MM-DD e cria um objeto Day.js
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const dataDayjs = dayjs(dataFormatada);
    
        return dataDayjs;
    }


    // converte data de ISO string para data em formato DD/MM/YYYY
    toReadableDate(data: any) {
        const date = new Date(data);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    toHours(obj: any) {
        return `${obj.h}:${obj.m}`
    }

    arrayAulas() {
        return [
            {
                h: '7',
                m: '00'
            },
            {
                h: '7',
                m: '55'
            },
            {
                h: '8',
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