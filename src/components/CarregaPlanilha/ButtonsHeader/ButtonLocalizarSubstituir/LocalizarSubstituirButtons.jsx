import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente LocalizarSubstituirButtons
 *
 * Este componente exibe os botões de ação dentro do modal de "Localizar e Substituir".
 * Ele gerencia as funcionalidades de procurar, substituir e substituir tudo em uma coluna da tabela.
 * As ações são condicionadas ao estado dos checkboxes e ao valor de busca inserido pelo usuário.
 * 
 * @param {Array} tableData - Dados da tabela que contêm as células a serem pesquisadas e substituídas.
 * @param {Function} setTableData - Função para atualizar os dados da tabela após a substituição de valores.
 * @param {number} columnIndexAtual - Índice da coluna que está sendo pesquisada.
 * @param {Object} selectedCell - Objeto que contém as coordenadas da célula selecionada (linha e coluna).
 * @param {Function} setSelectedCell - Função para atualizar a célula selecionada.
 * @param {Function} updateCellValue - Função para atualizar o valor de uma célula específica na tabela.
 * @param {string} searchValue - Valor de busca inserido pelo usuário.
 * @param {boolean} isSearchEmpty - Indica se o campo de busca está vazio.
 * @param {string} replaceValue - Valor de substituição inserido pelo usuário.
 * @param {boolean} cbCorrespondeCelula - Indica se a busca deve corresponder ao conteúdo inteiro da célula.
 * @param {boolean} cbPesquisaRegex - Indica se a busca deve utilizar expressões regulares.
 * @param {boolean} cbDiferenciaLetras - Indica se a busca deve diferenciar maiúsculas de minúsculas.
 * @param {Function} closeLocalSubst - Função para fechar o modal de "Localizar e Substituir".
 * @param {Function} setInfoLocalSubst - Função para exibir informações sobre o status da busca ou substituição.
 * 
 * @return {JSX.Element} Retorna botões para busca de informações e atualização de dados.
 */

function LocalizarSubstituirButtons({
    tableData,
    setTableData,
    columnIndexAtual,
    selectedCell,
    setSelectedCell,
    updateCellValue,
    searchValue,
    isSearchEmpty,
    replaceValue,
    cbCorrespondeCelula,
    cbPesquisaRegex,
    cbDiferenciaLetras,
    closeLocalSubst,
    setInfoLocalSubst
}) {

    /**
     * Função que lida com a ação de procurar a próxima ocorrência do valor de busca.
     * Se uma correspondência for encontrada, a célula é selecionada.
     * 
     * @return {void} Não retorna nada, apenas atualiza a celula selecionada e exibe o status caso não encontrado.
     */
    function btnFindNext() {
        const { row, col } = selectedCell;
        const totalRows = tableData.length;
        let search = searchValue;

        let regExpErrorShown = false;

        setInfoLocalSubst("");

        /**
         * Função auxiliar para encontrar uma correspondência de valor na célula.
         * 
         * @param {string} cellValue - Valor da célula a ser comparado com o valor de busca.
         * @param {string} search - Valor de busca inserido pelo usuário.
         * 
         * @returns {boolean} Retorna true se encontrar uma correspondência, caso contrário false.
         */
        function findMatch(cellValue, search) {

            if (cbCorrespondeCelula) {
                return cbDiferenciaLetras
                    ? cellValue === search && searchValue.trim() !== ''
                    : cellValue.toLowerCase() === search.toLowerCase() && searchValue.trim() !== '';
            }

            if (cbPesquisaRegex) {
                try {
                    const flags = cbDiferenciaLetras ? 'g' : 'gi';
                    const regex = new RegExp(search, flags);
                    return regex.test(cellValue);
                } catch (e) {
                    if (!regExpErrorShown) {
                        setInfoLocalSubst("RegExp inválido.");
                        console.error("Erro ao criar RegExp:", e);
                        regExpErrorShown = true;
                    }
                    return false;
                }
            } else {
                if (!cbDiferenciaLetras) {
                    cellValue = cellValue.toLowerCase();
                    search = search.toLowerCase();
                }
                return cellValue.includes(search) && searchValue.trim() !== '';
            }
        }

        /**
         * Função que pesquisa nas linhas a partir de uma linha inicial até uma linha final.
         * 
         * @param {number} startRow - Linha inicial para pesquisa.
         * @param {number} endRow - Linha final para pesquisa.
         * @returns {boolean} - Retorna true se uma correspondência for encontrada, caso contrário false.
         */
        function searchInRows(startRow, endRow) {
            for (let r = startRow; r !== endRow; r = (r + 1) % totalRows) {
                let cellValue = tableData[r][col].value;

                if (findMatch(cellValue, search)) {
                    setSelectedCell({ row: r, col: col });
                    return true;
                }
            }
            return false;
        }

        if (searchInRows(row + 1, row)) {
            return;
        }

        const found = searchInRows(0, row);

        if (!found && search.trim() !== '') {
            setInfoLocalSubst(`Não há entradas correspondentes a ${search}`);
        }
    }

    /**
     * Função que substitui o valor encontrado pela busca pelo valor de substituição.
     * 
     * @returns {void} Não retorna nada, apenas atualiza a célula substituída e exibe o status da substituição.
     */
    function btnReplace() {
        const row = selectedCell.row;
        const col = selectedCell.col;
        const originalCellValue = tableData[row][col].value;
        let cell = tableData[row][col];

        setInfoLocalSubst("");

        if (cbCorrespondeCelula) {
            if (cbDiferenciaLetras) {
                if (cell.value === searchValue) {
                    cell = { value: replaceValue, style: cell.style };
                }
            } else {
                if (cell.value.toLowerCase() === searchValue.toLowerCase()) {
                    cell = { value: replaceValue, style: cell.style };
                }
            }

            updateCellValue(row, col, cell)
            setSelectedCell({ row: row + 1, col: col });

            let info = `"${originalCellValue}" substituido por "${cell.value}"`;

            if (info.length > 40) {
                info = info.slice(0, 40) + '...';
            }

            setInfoLocalSubst(info);

            return;
        }

        if (cbPesquisaRegex) {
            try {
                const flags = cbDiferenciaLetras ? 'g' : 'gi';
                const regex = new RegExp(searchValue, flags);
                const newValue = cell.value.replace(regex, replaceValue);
                cell = { value: newValue, style: cell.style };
            } catch (e) {
                console.error("Erro ao criar RegExp:", e);
            }
        } else {
            if (cbDiferenciaLetras) {
                // Pesquisa case-sensitive
                const newValue = cell.value.split(searchValue).join(replaceValue);
                cell = { value: newValue, style: cell.style };
            } else {
                // Pesquisa case-insensitive
                const newValue = cell.value.replace(new RegExp(searchValue, 'gi'), replaceValue);
                cell = { value: newValue, style: cell.style };
            }
        }

        updateCellValue(row, col, cell)
        setSelectedCell({ row: row + 1, col: col });

        let info = `"${originalCellValue}" substituido por "${cell.value}"`;

        if (info.length > 40) {
            info = info.slice(0, 40) + '...';
        }

        setInfoLocalSubst(info);
    }

    /**
     * Função que substitui todas as instâncias encontradas do valor de busca pelo valor de substituição em toda a coluna.
     * 
     * @returns {void} Não retorna nada, apenas atualiza todas as células substituídas e exibe o status da substituição.
     */
    function btnReplaceAll() {
        setInfoLocalSubst("");
        let info = ` instâncias de "${searchValue}" substituidas por "${replaceValue}"`;
        let countReplacedInstances = 0;

        const updatedTable = tableData.map(row => {
            return row.map((cell, colIndex) => {
                if (colIndex === columnIndexAtual) {
                    if (cbCorrespondeCelula) {
                        if (cbDiferenciaLetras) {
                            if (cell.value === searchValue) {
                                countReplacedInstances++;
                                return { value: replaceValue, style: cell.style };
                            }
                        } else {
                            if (cell.value.toLowerCase() === searchValue.toLowerCase()) {
                                countReplacedInstances++;
                                return { value: replaceValue, style: cell.style };
                            }
                        }

                        return cell;
                    }

                    if (cbPesquisaRegex) {
                        try {
                            const flags = cbDiferenciaLetras ? 'g' : 'gi';
                            const regex = new RegExp(searchValue, flags);
                            const newValue = cell.value.replace(regex, replaceValue);
                            if (cell.value !== newValue) {
                                countReplacedInstances++;
                            }
                            return { value: newValue, style: cell.style };
                        } catch (e) {
                            console.error("Erro ao criar RegExp:", e);
                            return cell;
                        }
                    } else {
                        if (cbDiferenciaLetras) {
                            // Pesquisa case-sensitive
                            const newValue = cell.value.split(searchValue).join(replaceValue);
                            if (cell.value !== newValue) {
                                countReplacedInstances++;
                            }
                            return { value: newValue, style: cell.style };
                        } else {
                            // Pesquisa case-insensitive
                            const newValue = cell.value.replace(new RegExp(searchValue, 'gi'), replaceValue);
                            if (cell.value !== newValue) {
                                countReplacedInstances++;
                            }
                            return { value: newValue, style: cell.style };
                        }
                    }
                }

                return cell;
            });
        });

        info = countReplacedInstances + info;

        if (countReplacedInstances <= 0) {
            info = 'Nenhuma correspondência encontrada';
        } else if (info.length > 40) {
            info = info.slice(0, 40) + '...';
        }

        setInfoLocalSubst(info);
        setTableData(updatedTable);
    }

    return (
        <>
            <button name="findNext" className="botao-acoes search-button" onClick={btnFindNext} disabled={isSearchEmpty}>Procurar</button>
            <button name="replace" className="botao-acoes replace-button" onClick={btnReplace} disabled={isSearchEmpty}>Substituir</button>
            <button name="replaceAll" className="botao-acoes replaceAll-button" onClick={btnReplaceAll} disabled={isSearchEmpty}>Substituir tudo</button>
            <button name="done" className="done-button" onClick={closeLocalSubst}>Concluído</button>
        </>
    )
}

LocalizarSubstituirButtons.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    columnIndexAtual: PropTypes.number.isRequired,
    selectedCell: PropTypes.object.isRequired,
    setSelectedCell: PropTypes.func.isRequired,
    updateCellValue: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    isSearchEmpty: PropTypes.bool.isRequired,
    replaceValue: PropTypes.string.isRequired,
    cbCorrespondeCelula: PropTypes.bool.isRequired,
    cbPesquisaRegex: PropTypes.bool.isRequired,
    cbDiferenciaLetras: PropTypes.bool.isRequired,
    closeLocalSubst: PropTypes.func.isRequired,
    setInfoLocalSubst: PropTypes.func.isRequired,
}

export default LocalizarSubstituirButtons;