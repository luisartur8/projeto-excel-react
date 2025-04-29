export const handleKeyDown = (
    e,
    cellRef, cell,
    cellId, updateCellValue,
    selectedCell, setSelectedCell,
    isEditable, setEditable,
    tableData, setTableData,
    totalRows, totalCols,
    rowIndex, colIndex,
    theme,
    historic, setHistoric,
    moverCursorParaFinal
) => {
    const { row, col } = selectedCell;
    let newRow = row;
    let newCol = col;

    if (!isEditable) {
        if (e.ctrlKey) {
            if (e.key === 'c' || e.key === 'C') {
                navigator.clipboard.writeText(cell.value);
                return;
            } else if (e.key === 'v' || e.key === 'V') {
                navigator.clipboard.readText().then((clipText) => {
                    cell.value = clipText;
                    setSelectedCell({ row: newRow, col: newCol });
                    return;
                });
            } else if (e.key === 'z' || e.key === 'Z') {
                if (historic.length > 1) {
                    const newData = historic[historic.length - 2]

                    setHistoric((prevHistoric) => {
                        return prevHistoric.slice(0, -1);
                    });

                    setTableData(newData);
                }
                return;
            } else if (e.key === 'y' || e.key === 'Y') {
                console.log('Ctrl + Y'); // Contrario de Ctrl + Z
                return;
            } else if (e.key === 'ArrowDown' && row < totalRows - 1) {
                let found = false;
                let atual = newRow;
                let proximaLinha = atual + 1;

                // Verifica se a próxima célula está vazia
                if (tableData[proximaLinha] && tableData[proximaLinha][newCol].value === '') {
                    // Se estiver vazia, percorre as próximas linhas
                    for (let i = proximaLinha; i < totalRows; i++) {
                        if (tableData[i][newCol].value !== '') {
                            newRow = i;
                            found = true;
                            break;
                        }
                    }
                } else {
                    // Se a próxima linha não estiver vazia, percorre até uma celula preenchida que tem a sua próxima celula vazia
                    for (let i = proximaLinha; i < totalRows; i++) {
                        if (tableData[i][newCol].value === '') {
                            found = true;
                            break;
                        }
                        newRow = i; // Continua até encontrar uma célula vazia
                    }
                }

                // Se nenhuma célula é vazia, selectedCell será na ultima linha
                if (!found) {
                    newRow = totalRows - 1;
                }
            } else if (e.key === 'ArrowUp' && row > 0) {
                let found = false;
                let atual = newRow;
                let proximaLinha = atual - 1;

                // Verifica se a célula acima está vazia
                if (tableData[proximaLinha] && tableData[proximaLinha][newCol].value === '') {
                    // Se estiver vazia, percorre as linhas acima em busca de uma célula não vazia
                    for (let i = proximaLinha; i >= 0; i--) {
                        if (tableData[i][newCol].value !== '') {
                            newRow = i;
                            found = true;
                            break;
                        }
                    }
                } else {
                    // Se a célula acima não estiver vazia, percorre até uma célula preenchida que tenha a próxima célula vazia
                    for (let i = proximaLinha; i >= 0; i--) {
                        if (tableData[i][newCol].value === '') {
                            found = true;
                            break;
                        }
                        newRow = i; // Continua até encontrar uma célula vazia
                    }
                }

                // Se nenhuma célula preenchida for encontrada, vai para a primeira linha
                if (!found) {
                    newRow = 0;
                }
            } else if (e.key === 'ArrowRight' && col < totalCols - 1) {
                let found = false;
                let atual = newCol;
                let proximaColuna = atual + 1;

                // Verifica se a célula à direita está vazia
                if (tableData[row][proximaColuna] && tableData[row][proximaColuna].value === '') {
                    // Se estiver vazia, percorre as colunas à direita em busca de uma célula não vazia
                    for (let i = proximaColuna; i < totalCols; i++) {
                        if (tableData[row][i].value !== '') {
                            newCol = i;
                            found = true;
                            break;
                        }
                    }
                } else {
                    // Se a célula à direita não estiver vazia, percorre até uma célula preenchida que tenha a próxima célula vazia
                    for (let i = proximaColuna; i < totalCols; i++) {
                        if (tableData[row][i].value === '') {
                            found = true;
                            break;
                        }
                        newCol = i; // Continua até encontrar uma célula vazia
                    }
                }

                // Se nenhuma célula preenchida for encontrada, vai para a última coluna
                if (!found) {
                    newCol = totalCols - 1;
                }
            } else if (e.key === 'ArrowLeft' && col > 0) {
                let found = false;
                let atual = newCol;
                let proximaColuna = atual - 1;

                // Verifica se a célula à esquerda está vazia
                if (tableData[row][proximaColuna] && tableData[row][proximaColuna].value === '') {
                    // Se estiver vazia, percorre as colunas à esquerda em busca de uma célula não vazia
                    for (let i = proximaColuna; i >= 0; i--) {
                        if (tableData[row][i].value !== '') {
                            newCol = i; // Atualiza o col para a célula não vazia
                            found = true;
                            break;
                        }
                    }
                } else {
                    // Se a célula à esquerda não estiver vazia, percorre até uma célula preenchida que tenha a próxima célula vazia
                    for (let i = proximaColuna; i >= 0; i--) {
                        if (tableData[row][i].value === '') {
                            found = true;
                            break;
                        }
                        newCol = i; // Continua até a próxima célula preenchida
                    }
                }

                // Se nenhuma célula preenchida for encontrada, vai para a primeira coluna
                if (!found) {
                    newCol = 0;
                }
            }
        } else if (e.key === "Delete" || e.key === "Backspace") {
            updateCellValue(rowIndex, colIndex, { value: "", style: { backgroundColor: theme.primaryColor } })
        } else if (e.key === 'ArrowDown' && row < totalRows - 1) {
            e.preventDefault();
            newRow = row + 1;
        } else if (e.key === 'ArrowUp' && row > 0) {
            e.preventDefault();
            newRow = row - 1;
        } else if (e.key === 'ArrowRight' && col < totalCols - 1) {
            e.preventDefault();
            newCol = col + 1;
        } else if (e.key === 'ArrowLeft' && col > 0) {
            e.preventDefault();
            newCol = col - 1;
        } else if (/^[\x20-\x7E\xA0-\xFF\u0100-\uFFFF]*$/.test(e.key)) { // Letras, numeros, outros caracs tipo -, +, etc
            if (e.key.length === 1 && isEditable === false) { // Length 1, então: Sem Enter, Backspace, etc
                setEditable(true);
                cell.value = '';
                moverCursorParaFinal(cellRef.current);
            }
        }
    }

    if (e.key === 'Tab' && col < totalCols - 1) {
        newCol = col + 1;
    }

    if (e.key === 'Enter') {
        if (isEditable) {
            setEditable(false);
            if (row < totalRows - 1) {
                newRow = row + 1;
            }
        } else {
            e.preventDefault();
            setEditable(true);
            moverCursorParaFinal(cellRef.current);
        }
    }

    setSelectedCell({ row: newRow, col: newCol });
};