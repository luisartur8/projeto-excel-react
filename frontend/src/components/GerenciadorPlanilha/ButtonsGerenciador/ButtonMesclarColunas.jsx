import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente ButtonMesclarColunas.
 *
 * Este componente representa um botão que, quando clicado, mescla as colunas da tabela com o mesmo nome no cabeçalho.
 * Dando prioridade à coluna mais à esquerda, caso a célula esteja em branco, o valor será preenchido com o da coluna à direita.
 *
 * @param {Array} tableData - Dados da tabela a serem manipulados. Cada linha contém uma série de células.
 * @param {Function} setTableData - Função que atualiza os dados da tabela com os novos valores.
 * @param {Array} tableHeader - Cabeçalho da tabela, usado para encontrar as colunas que serão mescladas.
 * @param {Function} setTableHeader - Função que atualiza o cabeçalho da tabela.
 * @param {string} mesclarColunaValue - Nome da coluna no cabeçalho que será mesclada com outras colunas de mesmo nome.
 * @param {Function} setMesclarColunaValue - Função que seta o valor mesclar coluna
 * @param {Object} optionsTipoPlanilha - Valores de um determinado tipo de planilha.
 * @param {string} tipoPlanilha - O tipo da planilha para mudar o select de acordo.
 *
 * @returns {JSX.Element} Retorna o botão que executa a ação de mesclar as colunas.
 */
function ButtonMesclarColunas({
    tableData,
    setTableData,
    tableHeader,
    setTableHeader,
    mesclarColunaValue,
    setMesclarColunaValue,
    optionsTipoPlanilha,
    tipoPlanilha
}) {

    /**
     * Função que lida com a mudança do select
     */
    function handleMesclarColunas(e) {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

        setMesclarColunaValue(e.target.value);
    }

    /**
     * Função que mescla as colunas com o nome especificado por `mesclarColunaValue` no cabeçalho.
     * Ela encontra as colunas com esse nome, mescla as células das colunas subsequentes com a primeira.
     * coluna correspondente, e então remove as colunas subsequentes.
     */
    function mesclarColunas() {
        const indexHeader = [];

        // Encontra os indices correspondentes.
        tableHeader.forEach((col, index) => {
            if (col === mesclarColunaValue) {
                indexHeader.push(index);
            }
        });

        if (indexHeader.length < 2) {
            return;
        }

        // Atualiza o header removendo as colunas subsequentes.
        const updatedHeader = [...tableHeader];
        for (let i = indexHeader.length - 1; i > 0; i--) {
            updatedHeader.splice(indexHeader[i], 1);
        }

        // Atualiza os dados da tabela mesclando os valores das células.
        const updatedData = tableData.map(row => {
            const updatedRow = [...row];

            // Mescla as colunas subsequentes com a primeira coluna correspondente.
            for (let a = indexHeader.length - 1; a > 0; a--) {
                const col1Index = indexHeader[0];
                const col2Index = indexHeader[a];

                if (col2Index < updatedRow.length) {
                    const celulaCol1 = updatedRow[col1Index];
                    const celulaCol2 = updatedRow[col2Index];

                    // Se a célula da primeira coluna estiver vazia, atribui o valor da segunda coluna.
                    if (celulaCol1.value.trim() === '') {
                        celulaCol1.value = celulaCol2.value;
                    }
                    // Remove a segunda coluna após a mesclagem.
                    updatedRow.splice(col2Index, 1);
                }
            }

            return updatedRow;
        });

        // Atualiza os dados.
        setTableData(updatedData);
        setTableHeader(updatedHeader);
    }

    return (
        <div className="container-mesclar-colunas">
            <select id="select-mesclar-colunas" value={mesclarColunaValue} onChange={handleMesclarColunas}>
                {optionsTipoPlanilha[tipoPlanilha].map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button id="button-mesclar-colunas" className="button-padrao" onClick={mesclarColunas}>Mesclar colunas</button>
        </div>
    )
}

ButtonMesclarColunas.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    mesclarColunaValue: PropTypes.string.isRequired,
    setMesclarColunaValue: PropTypes.func,
    optionsTipoPlanilha: PropTypes.object.isRequired,
    tipoPlanilha: PropTypes.string.isRequired
}

export default ButtonMesclarColunas;