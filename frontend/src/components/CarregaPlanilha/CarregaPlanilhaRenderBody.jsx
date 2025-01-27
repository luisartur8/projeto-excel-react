import PropTypes from "prop-types";

import TableCell from "./TableCell/TableCell";

import { MdDeleteForever } from "react-icons/md";

/**
 * @component
 * 
 * Componente que renderiza o body da planilha, exibindo as células de dados e oferecendo funcionalidade de remoção de linha.
 * 
 * @param {Array} tableData - Dados da tabela.
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {Object} selectedCell - Célula selecionada.
 * @param {Function} setSelectedCell - Função para atualizar a célula selecionada.
 * @param {boolean} isEditable - Indica se a celula é editável ou não.
 * @param {Function} setEditable - Função para atualizar o estado de editabilidade.
 * @param {Function} updateCellValue - Função para atualizar o valor de uma célula.
 * 
 * @returns {JSX.Element} Retorna uma tabela com os dados inseridos e um botão de remoção para cada linha.
 */
function CarregaPlanilhaRenderBody({
    tableData,
    setTableData,
    selectedCell,
    setSelectedCell,
    isEditable,
    setEditable,
    updateCellValue
}) {

    /**
     * Função que remove uma linha da tabela.
     * 
     * @param {Number} index - Indice atual da linha a ser removida.
     */
    const removeRow = (index) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    return (
        <>
            {tableData.map((row, rowIndex) => (
                <tr
                    key={rowIndex}>
                    <td>
                        <button className="delete-row-button" onClick={() => removeRow(rowIndex)}><MdDeleteForever size={16} /></button>
                    </td>
                    <td>{rowIndex + 1}</td>
                    {row.map((cell, colIndex) => {
                        return (
                            <TableCell
                                key={colIndex}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                cell={cell}
                                selectedCell={selectedCell}
                                setSelectedCell={setSelectedCell}
                                isEditable={isEditable}
                                setEditable={setEditable}
                                totalRows={tableData.length}
                                totalCols={row.length}
                                updateCellValue={updateCellValue}
                                tableData={tableData}
                            />
                        )
                    })}
                </tr>
            ))}
        </>
    )
}

CarregaPlanilhaRenderBody.propTypes = {
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    selectedCell: PropTypes.object.isRequired,
    setSelectedCell: PropTypes.func.isRequired,
    isEditable: PropTypes.bool.isRequired,
    setEditable: PropTypes.func.isRequired,
    updateCellValue: PropTypes.func.isRequired,
}

export default CarregaPlanilhaRenderBody;