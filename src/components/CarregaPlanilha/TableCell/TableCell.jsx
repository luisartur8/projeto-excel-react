import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { manterCelulaSelecionadaVisivel, moverCursorParaFinal } from "./celulaHandle";
import { handleKeyDown } from "./keyDownHandler";
import { dblClickHandler } from "./dblClickHandler";

import { theme } from "@theme/theme";

function TableCell({ rowIndex, colIndex, cell, selectedCell, setSelectedCell, isEditable, setEditable, totalRows, totalCols, updateCellValue, tableData }) {

    const cellRef = useRef(null);

    const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;

    const cellId = `row-${rowIndex}-col-${colIndex}`;

    useEffect(() => {
        if (isSelected && cellRef.current) {
            const cellElement = document.getElementById(cellId);

            manterCelulaSelecionadaVisivel(cellRef.current);

            if (cellElement) {
                cellElement.focus();
            }
        }
    }, [isEditable, isSelected, cellId]);


    const handleBlur = (e) => {
        setEditable(false);
        const cellData = { value: e.target.innerText, style: { backgroundColor: theme.primaryColor } }
        updateCellValue(rowIndex, colIndex, cellData);
    };

    return (
        <td
            id={cellId}
            key={colIndex}
            ref={cellRef}
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
                totalRows,
                totalCols,
                rowIndex,
                colIndex,
                theme,
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
        value: PropTypes.any,
        style: PropTypes.any,
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
};

export default TableCell;