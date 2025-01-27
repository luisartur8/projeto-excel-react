import PropTypes from "prop-types";

import { theme } from '@theme/theme.js'

import { FaSortAlphaUp } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";

/**
 * @component
 * 
 * Componente ButtonOrdenarAlfabetico.
 *
 * Botão para ordenar uma coluna da tabela em ordem alfabética (crescente ou decrescente).
 * Linhas com fundo vermelho são mantidas no topo da tabela, enquanto as demais linhas são.
 * ordenadas de acordo com a ordem selecionada.
 *
 * @param {number} index - Índice da coluna a ser ordenada.
 * @param {Array} tableData - Dados da tabela a serem ordenados.
 * @param {function} setTableData - Função para atualizar os dados da tabela após a ordenação.
 * 
 * @return {JSX.Element} Retorna dois botões para ordenação da coluna.
 */
function ButtonOrdenarAlfabetico({ index, tableData, setTableData }) {

    /**
     * Ordena os dados da tabela em ordem crescente ou decrescente, mantendo as linhas com fundo vermelho no topo (secondaryColor).
     * 
     * @param {string} ordem - A ordem de ordenação: 'crescente' ou 'decrescente'.
     * @returns {void} Não retorna nada, apenas atualiza os dados da tabela ordenada.
     */
    function ordenarAlfabetico(ordem) {
        if (!tableData) return;

        const ordemRed = [];
        const ordemNormal = [];

        // Separa as linhas com base no backgroundColor (secondaryColor são as linhas que estão incorretas).
        tableData.forEach((row) => {
            const cellData = row[index];
            if (cellData) {
                if (cellData.style.backgroundColor === theme.secondaryColor) {
                    ordemRed.push({ cellContent: cellData.value, row });
                } else {
                    ordemNormal.push({ cellContent: cellData.value, row });
                }
            }
        });

        // Função para comparar os valores e garantir que os espaços em branco venham por último.
        function compareWithWhitespaceHandling(a, b) {
            // Se ambos são espaços em branco ou vazios, mantem a ordem.
            if (!a.cellContent && !b.cellContent) return 0;

            // Se um deles é vazio ou contém apenas espaços, ele vai para o final.
            if (!a.cellContent || a.cellContent.trim() === "") return 1;
            if (!b.cellContent || b.cellContent.trim() === "") return -1;

            // Caso contrário, faz a comparação padrão.
            if (ordem === 'crescente') {
                return a.cellContent.localeCompare(b.cellContent);
            } else if (ordem === 'decrescente') {
                return b.cellContent.localeCompare(a.cellContent);
            }

            return 0;
        }

        ordemRed.sort(compareWithWhitespaceHandling);
        ordemNormal.sort(compareWithWhitespaceHandling);

        // Junta as linhas ordenadas: primeiro as linhas vermelhas, depois as normais.
        const updatedData = [
            ...ordemRed.map(item => item.row),
            ...ordemNormal.map(item => item.row)
        ];

        setTableData(updatedData);
    }

    return (
        <>
            <button className="btn-ordenar-crescente" onClick={() => ordenarAlfabetico('crescente')}><FaSortAlphaUp size={16} /></button>
            <button className="btn-ordenar-decrescente" onClick={() => ordenarAlfabetico('decrescente')}><FaSortAlphaDownAlt size={16} /></button>
        </>
    )

}

ButtonOrdenarAlfabetico.propTypes = {
    index: PropTypes.number.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
}

export default ButtonOrdenarAlfabetico;