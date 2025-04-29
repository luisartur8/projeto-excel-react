import { describe, test, expect } from 'vitest';
import { corrigirNome } from '@utils/validacao';

describe('Função corrigirNome', () => {
    test('Remove espaços extras', () => {
        const nome1 = ' teste  teste ';

        const valueFormmated1 = String(corrigirNome(nome1));

        expect(valueFormmated1).toBe('TESTE TESTE');
    })

    test('Permite apenas caracteres do alfabeto latino', () => {
        const nome1 = 'OláàÇ';
        const nome2 = 'ü';

        const valueFormmated1 = String(corrigirNome(nome1));
        const valueFormmated2 = String(corrigirNome(nome2));

        expect(valueFormmated1).toBe('OLÁÀÇ');
        expect(valueFormmated2).toBe('');
    })

    test('Não permite caracteres especiais', () => {
        const nome1 = 'John Doe';
        const nome2 = '(John Doe)';

        const valueFormmated1 = String(corrigirNome(nome1));
        const valueFormmated2 = String(corrigirNome(nome2));

        expect(valueFormmated1).toBe('JOHN DOE');
        expect(valueFormmated2).toBe('');
    })

    test('Substitui caracteres específicos', () => {
        const nome1 = 'D. Teste';   // '.' por espaço
        const nome2 = 'C & A';      // '&' por espaço
        const nome3 = 'äÄöÖüÜ';     // 'ü' por 'U'

        const valueFormmated1 = String(corrigirNome(nome1));
        const valueFormmated2 = String(corrigirNome(nome2));
        const valueFormmated3 = String(corrigirNome(nome3));

        expect(valueFormmated1).toBe('D TESTE');
        expect(valueFormmated2).toBe('C A');
        expect(valueFormmated3).toBe('AAOOUU');
    })
})