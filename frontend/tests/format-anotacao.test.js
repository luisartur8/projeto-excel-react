import { describe, test, expect } from 'vitest';
import { corrigirAnotacao } from '@utils/validacao';

describe('Função corrigirAnotacao', () => {
    test('Remove virgulas e espaços extras', () => {
        const anotacao = ' tes,  te ';

        const valueFormmated1 = String(corrigirAnotacao(anotacao));

        expect(valueFormmated1).toBe('tes te');
    })

    test('Remove linhas com "enter"', () => {
        const anotacao = 'linha1\nlinha2';

        const valueFormmated1 = String(corrigirAnotacao(anotacao));

        expect(valueFormmated1).toBe('linha1 linha2');
    })
})