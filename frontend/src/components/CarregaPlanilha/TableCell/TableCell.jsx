import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { manterCelulaSelecionadaVisivel, moverCursorParaFinal } from "./celulaHandle";
import { handleKeyDown } from "./keyDownHandler";
import { dblClickHandler } from "./dblClickHandler";

import { theme } from "@theme/theme";

/**
 * @component
 * 
 * Componente responsável por gerar uma célula de uma tabela.
 * Cada célula pode ser selecionada, editada, mudar seu estilo dinâmicamente e realizar ações com o teclado.
 * 
 * @param {number} rowIndex - O índice da linha da célula.
 * @param {number} colIndex - O índice da coluna da célula.
 * @param {Object} cell - Dados da célula, incluindo o valor e o estilo (backGroundColor).
 * @param {Object} selectedCell - A célula atualmente selecionada, contendo os índices da linha e da coluna.
 * @param {Function} setSelectedCell - Função para atualizar a célula selecionada.
 * @param {boolean} isEditable - Indica se a célula está em modo de edição.
 * @param {Function} setEditable - Função para definir o estado de edição da célula.
 * @param {number} totalRows - Total de linhas da tabela.
 * @param {number} totalCols - Total de colunas da tabela.
 * @param {Function} updateCellValue - Função para atualizar o valor da célula.
 * @param {Array} tableData - Dados da tabela que representam todas as células.
 * 
 * @returns {JSX.Element} - A célula da tabela com seu conteúdo e estilo.
 */
function TableCell({
    rowIndex,
    colIndex,
    cell,
    selectedCell,
    setSelectedCell,
    isEditable,
    setEditable,
    totalRows,
    totalCols,
    updateCellValue,
    tableData,
    setTableData,
    colWidths,
    historic,
    setHistoric
}) {

    const cellRef = useRef(null);

    const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;

    const cellId = `row-${rowIndex}-col-${colIndex}`;

    useEffect(() => {
        // Quando a célula é selecionada, mantém ela visível e foca nela.
        if (isSelected && cellRef.current) {
            const cellElement = document.getElementById(cellId);

            manterCelulaSelecionadaVisivel(cellRef.current);

            if (cellElement) {
                cellElement.focus();
            }
        }
    }, [isEditable, isSelected, cellId]);

    /**
     * Função que lida com o evento de desfoque (blur) na célula.
     * Quando a célula perde o foco, o valor da célula é atualizado e sai do modo de edição.
     * 
     * @param {Event} e - O evento de desfoco.
     */
    const handleBlur = (e) => {
        setEditable(false);
        const cellData = { value: e.target.innerText, style: cell.style || { backgroundColor: theme.primaryColor } }
        updateCellValue(rowIndex, colIndex, cellData);
    };

    return (
        <td
            id={cellId}
            key={colIndex}
            ref={cellRef}
            width={`${colWidths[colIndex + 2]}px`}
            style={{
                ...cell.style,
                boxShadow: isSelected ? '0px 0px 0px 2px #0063af inset' : 'none',
                border: isSelected ? '1px solid #0063af' : '1px solid #b8b8b8',
                outline: isEditable && isSelected ? '2px solid #a8c7fa' : 'none',
            }}
            tabIndex={0}
            onKeyDown={e => handleKeyDown(
                e,
                cellRef,
                cell,
                cellId,
                updateCellValue,
                selectedCell,
                setSelectedCell,
                isEditable,
                setEditable,
                tableData,
                setTableData,
                totalRows,
                totalCols,
                rowIndex,
                colIndex,
                theme,
                historic,
                setHistoric,
                moverCursorParaFinal
            )
            }
            onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
            onDoubleClick={() => dblClickHandler(setEditable, cellRef, moverCursorParaFinal)}
            contentEditable={isEditable}
            suppressContentEditableWarning={isEditable}
            onBlur={handleBlur}
        >
            {cell.value || ""}
        </td>
    )
}

TableCell.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
    cell: PropTypes.shape({
        value: PropTypes.string,
        style: PropTypes.object,
    }).isRequired,
    selectedCell: PropTypes.shape({
        row: PropTypes.number.isRequired,
        col: PropTypes.number.isRequired,
    }).isRequired,
    setSelectedCell: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    setEditable: PropTypes.func.isRequired,
    totalRows: PropTypes.number.isRequired,
    totalCols: PropTypes.number.isRequired,
    updateCellValue: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    colWidths: PropTypes.array.isRequired,
    historic: PropTypes.array.isRequired,
    setHistoric: PropTypes.func.isRequired
};

export default TableCell;