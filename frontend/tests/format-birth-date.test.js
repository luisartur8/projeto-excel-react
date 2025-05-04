import { describe, test, expect } from 'vitest';
import { corrigirData_nascimento, corrigirData_lancamento } from '@utils/validacao';

describe('Função corrigirData_nascimento', () => {
    test('Substituição por barra', () => {
        const documento1 = '20-10-2024';
        const documento2 = '20;10;2024';
        const documento3 = '20/10/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024'));
        expect(valueFormmated2).toBe(('20/10/2024'));
        expect(valueFormmated3).toBe(('20/10/2024'));
    })

    test('Tem duas barras', () => {
        const documento1 = '20/10/2024';
        const documento2 = '20/10';
        const documento3 = '20/10/20/24';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((''));
    })

    test('Adiciona um zero na frente caso não tenha', () => {
        const documento1 = '2/1/2024';
        const documento2 = '1/2/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'mm/dd/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('02/01/2024'));
        expect(valueFormmated2).toBe(('02/01/2024'));
    })

    test('Dia no intervalo correto', () => {
        // Dia
        const documento1 = '32/01/2024';
        const documento2 = '31/01/2024';
        const documento3 = '00/01/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe(('31/01/2024'));
        expect(valueFormmated3).toBe((''));
    })

    test('Mês no intervalo correto', () => {
        // Mês
        const documento1 = '01/13/2024';
        const documento2 = '01/12/2024';
        const documento3 = '01/00/2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe(('01/12/2024'));
        expect(valueFormmated3).toBe((''));
    })

    test('Ano de 4 digitos no intervalo correto', () => {
        // Ano (yyyy)
        const anoAtual = new Date().getFullYear();

        const documento1 = '01/01/1900';
        const documento2 = '01/01/1899';
        const documento3 = `01/01/${anoAtual}`;
        const documento4 = `01/01/${anoAtual + 1}`;

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_nascimento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('01/01/1900'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe((`01/01/${anoAtual}`));
        expect(valueFormmated4).toBe((''));
    })

    test('Formatando ano de 2 digitos em 4 digitos', () => {
        // Ano (yy)
        // Exemplo:
        // 01/01/25 -> 01/01/1925 (Depende do ano atual)
        // 01/01/24 -> 01/01/2024
        const anoAtual = String(new Date().getFullYear()).slice(2);

        const documento1 = `01/01/${Number(anoAtual) + 1}`; // Ano que vem
        const documento2 = `01/01/${anoAtual}`;             // Hoje

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((`01/01/19${Number(anoAtual) + 1}`));
        expect(valueFormmated2).toBe((`01/01/20${anoAtual}`));
    })

    test('Dados extras', () => {
        const documento1 = 'extra 1/01/2024';
        const documento2 = '01/01/2024 extra';
        const documento3 = '0a 01/01/2024 a0test10';
        const documento4 = '0a1 01/01/2024 a0test10';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_nascimento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('01/01/2024'));
        expect(valueFormmated2).toBe(('01/01/2024'));
        expect(valueFormmated3).toBe(('01/01/2024'));
        expect(valueFormmated4).toBe((''));
    })

    test('Transformando mês em número', () => {
        const documento1 = 'extra 1/mar/2024 extra';
        const documento2 = '01-mar-2024 extra';
        const documento3 = '0a 01-fevereiro-2024 a0test10';
        const documento4 = '0a 01;MAY;2024 a0test10';
        const documento5 = '0a 01 may 2024 a0test10';
        const documento6 = 'Evento em 01-março-2024';

        const valueFormmated1 = String(corrigirData_nascimento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_nascimento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_nascimento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_nascimento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated5 = String(corrigirData_nascimento(documento5, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated6 = String(corrigirData_nascimento(documento6, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('01/03/2024'));
        expect(valueFormmated2).toBe(('01/03/2024'));
        expect(valueFormmated3).toBe(('01/02/2024'));
        expect(valueFormmated4).toBe(('01/05/2024'));
        expect(valueFormmated5).toBe((''));
        expect(valueFormmated6).toBe(('01/03/2024'));
    })
})

describe('Função corrigirData_lancamento', () => {
    test('Sem horário', () => {
        const documento1 = '20-10-2024';
        const documento2 = ' 20;10;2024 d:m:y';
        const documento3 = '20/10/2024 d';

        const valueFormmated1 = String(corrigirData_lancamento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_lancamento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_lancamento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024 00:00:00'));
        expect(valueFormmated2).toBe(('20/10/2024 00:00:00'));
        expect(valueFormmated3).toBe(('20/10/2024 00:00:00'));
    })

    test('Horário incorreto ou parcial', () => {
        const documento1 = '20/10/2024 24:00:00';
        const documento2 = '20/10/2024 00:60:00';
        const documento3 = '20/10/2024 1';

        const valueFormmated1 = String(corrigirData_lancamento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_lancamento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_lancamento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('20/10/2024 01:00:00'));
    })

    test('Horário completo', () => {
        const documento1 = '20/10/2024 23:59:59';

        const valueFormmated1 = String(corrigirData_lancamento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024 23:59:59'));
    })

    test('Dados extras', () => {
        const documento1 = 'extra 20/10/2024 23:59:59 extra';
        const documento2 = 'extra0 20/10/2024 23:59:59 extra';
        const documento3 = '0 0 0 00020/10/2024 23:59:50extra 0';
        const documento4 = '0 0 0 00020/10/2024 23:59:50extra0';

        const valueFormmated1 = String(corrigirData_lancamento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_lancamento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_lancamento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_lancamento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('20/10/2024 23:59:59'));
        expect(valueFormmated2).toBe(('20/10/2024 23:59:59'));
        expect(valueFormmated3).toBe(('20/10/2024 23:59:50'));
        expect(valueFormmated4).toBe((''));
    })

    test('Transformando mês em número', () => {
        const documento1 = 'extra 1/mar/2024 extra';
        const documento2 = '01-mar-2024 extra';
        const documento3 = '0a 01-fevereiro-2024 a0test10';
        const documento4 = '0a 01;MAY;2024 a0test10';
        const documento5 = '0a 01 may 2024 a0test10'; // da pra melhorar isso, detectar os espaços ao redor e substituir por /
        const documento6 = 'Evento em 01-março-2024   12';

        const valueFormmated1 = String(corrigirData_lancamento(documento1, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated2 = String(corrigirData_lancamento(documento2, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated3 = String(corrigirData_lancamento(documento3, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated4 = String(corrigirData_lancamento(documento4, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated5 = String(corrigirData_lancamento(documento5, 'dd/mm/yyyy', 'dd/mm/yyyy'));
        const valueFormmated6 = String(corrigirData_lancamento(documento6, 'dd/mm/yyyy', 'dd/mm/yyyy'));

        expect(valueFormmated1).toBe(('01/03/2024 00:00:00'));
        expect(valueFormmated2).toBe(('01/03/2024 00:00:00'));
        expect(valueFormmated3).toBe(('01/02/2024 10:00:00'));
        expect(valueFormmated4).toBe(('01/05/2024 10:00:00'));
        expect(valueFormmated5).toBe((''));
        expect(valueFormmated6).toBe(('01/03/2024 12:00:00'));
    })
})