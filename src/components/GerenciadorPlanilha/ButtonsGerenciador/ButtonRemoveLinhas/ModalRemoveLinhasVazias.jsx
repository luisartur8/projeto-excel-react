import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente que permite a remoção de linhas e colunas vazias na tabela.
 * O componente oferece dois botões:
 * 1. Remover Linhas Vazias: Remove as linhas onde todas as células estão vazias.
 * 2. Remover Colunas Vazias: Remove as colunas onde todas as células estão vazias.
 * 
 * @param {Array} tableData - Dados da tabela, contendo linhas e celulas ([col1, col2, col3][col1, col2, col3]).
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Array} tableHeader - Header da tabela, que contém os nomes das colunas.
 * @param {Function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * @param {Function} setInfoRemovedRowCols - Função para atualizar a mensagem informando sobre as linhas e/ou colunas removidas.
 * 
 * @returns {JSX.Element} - Retorna botões para remoção de linhas e colunas vazias.
 */
function ModalRemoveLinhasVazias({ tableData, setTableData, tableHeader, setTableHeader, setInfoRemovedRowCols }) {

    /**
     * Função que remove as linhas vazias da tabela.
     * A função também atualiza a mensagem sobre quantas linhas foram removidas.
     */
    function removeEmptyRows() {
        if (!tableData || tableData.length === 0) return null;

        const rowLengthBefore = tableData.length;

        // Filtra as linhas, mantendo apenas as que possuem ao menos uma célula não vazia.
        const updatedData = tableData.filter(row => {
            return row.some(cell => cell.value.trim() !== '');
        });

        const rowLengthAfter = updatedData.length;
        const linhasRemovidas = rowLengthBefore - rowLengthAfter;

        const message = linhasRemovidas === 0
            ? "Nenhuma linha foi removida"
            : `Foram removidas ${linhasRemovidas} linha${linhasRemovidas > 1 ? 's' : ''}`;

        setInfoRemovedRowCols(message);
        setTableData(updatedData);
    }

    /**
     * Função que remove as colunas vazias da tabela.
     * A função também atualiza a mensagem sobre quantas colunas foram removidas.
     */
    function removeEmptyCols() {
        if (!tableData || tableData.length === 0) return null;

        const colsLength = tableData[0].length;
        let colsToRemove = [];

        // Percorre as colunas da tabela, verificando se todas as células estão vazias.
        for (let c = colsLength - 1; c >= 0; c--) {
            let apagaColuna = true;

            for (let r = 0; r < tableData.length; r++) {
                if (tableData[r][c].value.trim() !== '') {
                    apagaColuna = false;
                    break;
                }
            }

            if (apagaColuna) {
                colsToRemove.push(c);
            }
        }

        // Se existirem colunas a serem removidas, atualiza os dados da tabela e o cabeçalho.
        if (colsToRemove.length > 0) {
            // Remove as colunas do header.
            const updatedHeader = tableHeader.filter((_, index) => !colsToRemove.includes(index));

            // Remove as colunas dos dados da tabela.
            const updatedData = tableData.map((row) => {
                return row.filter((_, index) => !colsToRemove.includes(index));
            });

            // Atualiza os dados.
            setTableHeader(updatedHeader);
            setTableData(updatedData);

            // Exibe a mensagem sobre as colunas removidas.
            if (colsToRemove.length === 1) {
                setInfoRemovedRowCols(`Uma coluna foi removida.`);
            } else {
                setInfoRemovedRowCols(`Foram removidas ${colsToRemove.length} colunas`);
            }
        } else {
            setInfoRemovedRowCols(`Nenhuma coluna foi removida`);
        }
    }

    return (
        <div>
            <button className="remover-linhas-vazias remover-linha-botao" onClick={removeEmptyRows}>Linhas</button>
            <button className="remover-colunas-vazias remover-linha-botao" onClick={removeEmptyCols}>Colunas</button>
        </div>
    )
}

ModalRemoveLinhasVazias.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    setInfoRemovedRowCols: PropTypes.func.isRequired
}

export default ModalRemoveLinhasVazias;