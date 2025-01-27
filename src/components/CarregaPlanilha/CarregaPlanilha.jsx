import { useEffect, useState } from "react";

// Biblioteca para manipulação de arquivos excel
import * as XLSX from "xlsx";

// Buttons Header
import ButtonInserirNovaColuna from "./ButtonsHeader/ButtonInserirNovaColuna/ButtonInserirNovaColuna.jsx";
import ButtonRemoveColumn from "./ButtonsHeader/ButtonRemoveColumn/ButtonRemoveColumn.jsx";
import ButtonExecutarValidacao from "./ButtonsHeader/ButtonExecutarValidacao/ButtonExecutarValidacao.jsx";
import ButtonApagarLinhaVermelha from "./ButtonsHeader/ButtonApagaLinhaVermelha/apagarLinhaVermelha.jsx";
import ButtonLocalizarSubstituir from "./ButtonsHeader/ButtonLocalizarSubstituir/ButtonLocalizarSubstituir.jsx";
import ButtonOrdenarAlfabetico from "./ButtonsHeader/ButtonOrdenarAlfabetico/ButtonOrdenarAlfabetico.jsx";
import SelectTipoPlanilha from "../selects/selectTipoPlanilha.jsx";

// Modals
import ModalDeleteColumn from "./ButtonsHeader/ButtonRemoveColumn/ModalDeleteColumn.jsx";
import ModalValidaTelefone from "./ButtonsHeader/ButtonExecutarValidacao/ModalValidaTelefone.jsx";
import ModalValidaData from "./ButtonsHeader/ButtonExecutarValidacao/ModalValidaData.jsx";
import ModalLocalizarSubstituir from "./ButtonsHeader/ButtonLocalizarSubstituir/ModalLocalizarSubstituir.jsx";
import ModalRemoveLinhas from "../GerenciadorPlanilha/ButtonsGerenciador/ButtonRemoveLinhas/ModalRemoveLinhas.jsx";

// Utils
import { validarCelula } from "@utils/validacao.js";

// Configs
import { theme } from "@theme/theme.js";

// Table
import TableCell from "./TableCell/TableCell.jsx";
import PropTypes from "prop-types";

import RenderFileUploadScreen from "./FileUploadScreen/RenderFileUploadScreen.jsx";

function CarregaPlanilha({
    tableHeader, setTableHeader,
    tableData, setTableData,
    isLoaded, setIsLoaded,
    selectedFile, setSelectedFile,
    setFirstSheetName, setWorkbookName,
    removeRowsOpen, setRemoveRowsOpen,
    tipoPlanilha
}) {

    // Table
    const [columnIndexAtual, setColumnIndexAtual] = useState(null);
    const [selectedValueAtual, setSelectValueAtual] = useState('');

    // Cells
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [isEditable, setEditable] = useState(false);

    // Modals
    const [isDelColOpen, setDelColOpen] = useState(false);
    const [isLocalSubstOpen, setLocalSubstOpen] = useState(false);

    const [isTelOpen, setTelOpen] = useState(false);
    const [isValDataOpen, setIsValDataOpen] = useState(false);

    useEffect(() => {
        console.log('carregaPlanilha rendered!')
    })

    const removeRow = (index) => {
        const updatedData = [...tableData];
        updatedData.splice(index, 1);
        setTableData(updatedData);
    };

    const onDragStart = (e, index) => {
        e.dataTransfer.setData("colunaIndex", index);
    };

    const onDrop = (e, targetIndex) => {
        const sourceIndex = parseInt(e.dataTransfer.getData("colunaIndex"), 10);

        const updatedHeader = [...tableHeader];
        const [movedHeader] = updatedHeader.splice(sourceIndex, 1);
        updatedHeader.splice(targetIndex, 0, movedHeader);
        setTableHeader(updatedHeader);

        const updatedData = tableData.map(row => {
            const newRow = [...row];
            const [movedCell] = newRow.splice(sourceIndex, 1);
            newRow.splice(targetIndex, 0, movedCell);
            return newRow;
        });

        setTableData(updatedData);
    };

    const onDragOver = (e) => {
        e.preventDefault(); // Permite o drop
    };

    const executarValidacao = (selectValue, columnIndex, cb, ddd, formatoOriginal, formatoFinal) => {
        const updatedData = tableData.map((row) => {
            const cellData = row[columnIndex];

            if (cellData) {
                const originalValue = cellData.value;
                const correctedValue = validarCelula(originalValue, selectValue, cb, ddd, formatoOriginal, formatoFinal);

                if (correctedValue === '' && originalValue !== '') {
                    row[columnIndex] = { value: originalValue, style: { backgroundColor: theme.secondaryColor } };
                } else {
                    row[columnIndex] = { value: correctedValue, style: { backgroundColor: theme.primaryColor } };
                }
            }

            return row;
        });

        setTableData(updatedData);
    }

    function updateCellValue(rowIndex, colIndex, cellData) {
        const updatedData = tableData.map((row, rowIdx) => {
            if (rowIdx === rowIndex) {
                return row.map((cell, cellIndex) => {
                    if (cellIndex === colIndex) {
                        return cellData;
                    }
                    return cell;
                });
            }

            return row;
        });

        setTableData(updatedData);
    }

    // Carrega o <th> da table para cada coluna
    const renderHeader = () => {
        if (!tableData || tableData.length === 0) return null;

        return (
            <tr>
                <th></th>
                <th></th>
                {tableHeader.map((_, index) => (
                    <th key={index}
                        draggable onDragStart={(e) => onDragStart(e, index)}
                        onDragOver={onDragOver}
                        onDrop={(e) => onDrop(e, index)}>
                        <div className="botoes-header">
                            <ButtonInserirNovaColuna direction="left" index={index} tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} theme={theme} />
                            <div className="thead-icons-central">
                                <ButtonRemoveColumn index={index} setDelColOpen={setDelColOpen} setColumnIndexAtual={setColumnIndexAtual} />
                                <ButtonExecutarValidacao index={index} executarValidacao={executarValidacao} setTelOpen={setTelOpen} setIsValDataOpen={setIsValDataOpen} setColumnIndexAtual={setColumnIndexAtual} setSelectValueAtual={setSelectValueAtual} />
                                <ButtonApagarLinhaVermelha index={index} tableData={tableData} setTableData={setTableData} />
                                <ButtonLocalizarSubstituir setLocalSubstOpen={setLocalSubstOpen} />
                                <ButtonOrdenarAlfabetico index={index} tableData={tableData} setTableData={setTableData} />
                            </div>
                            <ButtonInserirNovaColuna direction="right" index={index} tableData={tableData} setTableData={setTableData} tableHeader={tableHeader} setTableHeader={setTableHeader} theme={theme} />
                        </div>
                        <div className="selectAtual">
                            <SelectTipoPlanilha index={index} tableHeader={tableHeader} setTableHeader={setTableHeader} tipoPlanilha={tipoPlanilha} />
                        </div>
                    </th>
                ))}
            </tr>
        );
    };
    // Carrega o body da table
    const renderBody = () => {
        return (
            <>
                {tableData.map((row, rowIndex) => (
                    <tr
                        key={rowIndex}>
                        <td>
                            <button onClick={() => removeRow(rowIndex)}>X</button>
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

    // Carrega toda a table
    const renderTable = () => {
        if (!tableData || tableData.length === 0) return null;

        return (
            <>
                <table className="minha-tabela">
                    <thead>
                        {renderHeader()}
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
                <ModalDeleteColumn
                    isDelColOpen={isDelColOpen}
                    setDelColOpen={setDelColOpen}
                    columnIndexAtual={columnIndexAtual || 0}
                    tableData={tableData}
                    setTableData={setTableData}
                    tableHeader={tableHeader}
                    setTableHeader={setTableHeader}
                />
                <ModalLocalizarSubstituir
                    isLocalSubstOpen={isLocalSubstOpen}
                    setLocalSubstOpen={setLocalSubstOpen}
                    columnIndexAtual={columnIndexAtual || 0}
                    tableData={tableData}
                    setTableData={setTableData}
                    selectedCell={selectedCell}
                    setSelectedCell={setSelectedCell}
                    updateCellValue={updateCellValue}
                />
                <ModalRemoveLinhas
                    removeRowsOpen={removeRowsOpen}
                    setRemoveRowsOpen={setRemoveRowsOpen}
                    tableData={tableData}
                    setTableData={setTableData}
                    tableHeader={tableHeader}
                    setTableHeader={setTableHeader}
                />
                <ModalValidaTelefone
                    isTelOpen={isTelOpen}
                    setTelOpen={setTelOpen}
                    executarValidacao={executarValidacao}
                    columnIndexAtual={columnIndexAtual || 0}
                />
                <ModalValidaData
                    isValDataOpen={isValDataOpen}
                    setIsValDataOpen={setIsValDataOpen}
                    executarValidacao={executarValidacao}
                    columnIndexAtual={columnIndexAtual || 0}
                    selectedValueAtual={selectedValueAtual}
                />
            </>
        );
    };

    return (
        <div id="table-excel" className="table-excel">
            {isLoaded ? (
                <>
                    {renderTable()}
                </>
            ) : (
                <RenderFileUploadScreen
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    isLoaded={isLoaded} XLSX={XLSX}
                    setFirstSheetName={setFirstSheetName}
                    setWorkbookName={setWorkbookName}
                    theme={theme}
                    setTableData={setTableData}
                    setTableHeader={setTableHeader}
                    setIsLoaded={setIsLoaded}
                />
            )}
        </div>
    );
}

export default CarregaPlanilha;

CarregaPlanilha.propTypes = {
    tableHeader: PropTypes.array.isRequired,
    setTableHeader: PropTypes.func.isRequired,
    tableData: PropTypes.array.isRequired,
    setTableData: PropTypes.func.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    setIsLoaded: PropTypes.func.isRequired,
    selectedFile: PropTypes.any,
    setSelectedFile: PropTypes.func.isRequired,
    setFirstSheetName: PropTypes.func.isRequired,
    setWorkbookName: PropTypes.func.isRequired,
    removeRowsOpen: PropTypes.bool.isRequired,
    setRemoveRowsOpen: PropTypes.func.isRequired,
    tipoPlanilha: PropTypes.string.isRequired,
}