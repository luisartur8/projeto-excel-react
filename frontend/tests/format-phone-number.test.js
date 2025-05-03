import { describe, test, expect } from 'vitest';
import { corrigirTelefone, corrigirTelefoneSemDDD } from '@utils/validacao';

describe('Função corrigirTelefone', () => {
    test('Se tem + tira o que não for nacional (+55)', () => {
        const telefone1 = '+55 48 988888888';
        const telefone2 = '+54 48 988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, 48));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, 48));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe((''));
    })

    test('Não confundir +55 com DDD 55', () => {
        const telefone1 = '+55 48 988888888';
        const telefone2 = '+55 988888888';
        const telefone3 = '55 988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, 48));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, 48));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, 48));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('(55) 98888-8888'));
    })

    test('Inserir um DDD válido', () => {
        const telefone1 = '11 988888888';
        const telefone2 = '988888888';
        const telefone3 = '988888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, 48));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, 48));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, 23));

        expect(valueFormmated1).toBe(('(11) 98888-8888'));
        expect(valueFormmated2).toBe(('(48) 98888-8888'));
        expect(valueFormmated3).toBe((''));
    })

    test('Tamanho correto', () => {
        const telefone1 = '8888 8888';
        const telefone2 = '8 55 11 98888 8888';
        const telefone3 = '055 11 98888 8888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, ''));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, ''));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, ''));

        expect(valueFormmated1).toBe((''));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('(11) 98888-8888'));
    })

    test('Inserindo o nonagésino dígito', () => {
        const telefone1 = '8888 8888';
        const telefone2 = '48 88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, 48));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, ''));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe(('(48) 98888-8888'));
    })

    test('Tamanho correto com DDD retornando telefone formatado passando o DDD tipo String', () => {
        const telefone1 = '88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, '48'));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
    })

    test('Tamanho correto com DDD retornando telefone formatado passando o DDD tipo Number', () => {
        const telefone1 = '88888888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, 48));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
    })

    test('Remover zeros a frente no meio da função', () => {
        const telefone1 = '055 0048 8888-8888';
        const telefone2 = '+055 0048 8888-8888';
        const telefone3 = '00+055 0048 8888-8888';
        const telefone4 = '40+055 0048 8888-8888';
        const telefone5 = '55 (048) 8888-888';

        const valueFormmated1 = String(corrigirTelefone(telefone1, true, ''));
        const valueFormmated2 = String(corrigirTelefone(telefone2, true, ''));
        const valueFormmated3 = String(corrigirTelefone(telefone3, true, ''));
        const valueFormmated4 = String(corrigirTelefone(telefone4, true, ''));
        const valueFormmated5 = String(corrigirTelefone(telefone5, true, ''));

        expect(valueFormmated1).toBe(('(48) 98888-8888'));
        expect(valueFormmated2).toBe(('(48) 98888-8888'));
        expect(valueFormmated3).toBe(('(48) 98888-8888'));
        expect(valueFormmated4).toBe((''));
        expect(valueFormmated5).toBe((''));
    })
})

describe('Função corrigirTelefoneSemDDD', () => {
    test('Tamanho correto (8 ou 9)', () => {
        const tamanhoNove = '988888888';
        const tamanhoOito = '88888888';

        const tamanhoDez = '8888888888';
        const tamanhoSete = '7777777';

        const valueFormmated1 = String(corrigirTelefoneSemDDD(tamanhoNove));
        const valueFormmated2 = String(corrigirTelefoneSemDDD(tamanhoOito));
        const valueFormmated3 = String(corrigirTelefoneSemDDD(tamanhoDez));
        const valueFormmated4 = String(corrigirTelefoneSemDDD(tamanhoSete));

        expect(valueFormmated1).toBe(('988888888'));
        expect(valueFormmated2).toBe(('988888888')); // Adiciona 9
        expect(valueFormmated3).toBe((''));
        expect(valueFormmated4).toBe((''));
    })

    test('Contém o 9 extra na frente, inserindo caso não tenha', () => {
        const contemNove = '988888888';
        const contemOito = '888888888';
        const naoContem = '77777777';

        const valueFormmated1 = String(corrigirTelefoneSemDDD(contemNove));
        const valueFormmated2 = String(corrigirTelefoneSemDDD(contemOito));
        const valueFormmated3 = String(corrigirTelefoneSemDDD(naoContem));

        expect(valueFormmated1).toBe(('988888888'));
        expect(valueFormmated2).toBe((''));
        expect(valueFormmated3).toBe(('977777777'));
    })
})