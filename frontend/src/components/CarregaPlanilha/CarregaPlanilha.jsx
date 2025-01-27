import { useState } from "react";
import PropTypes from "prop-types";

// Biblioteca para manipulação de arquivos excel
import * as XLSX from "xlsx";

import CarregaPlanilhaRenderHeader from "./CarregaPlanilhaRenderHeader.jsx";
import CarregaPlanilhaRenderBody from "./CarregaPlanilhaRenderBody.jsx";

import ModalDeleteColumn from "@ButtonsHeader/ButtonRemoveColumn/ModalDeleteColumn.jsx";
import ModalValidaTelefone from "@ButtonsHeader/ButtonExecutarValidacao/ModalValidaTelefone.jsx";
import ModalValidaData from "@ButtonsHeader/ButtonExecutarValidacao/ModalValidaData.jsx";
import ModalLocalizarSubstituir from "@ButtonsHeader/ButtonLocalizarSubstituir/ModalLocalizarSubstituir.jsx";
import ModalRemoveLinhas from "@ButtonsGerenciador/ButtonRemoveLinhas/ModalRemoveLinhas.jsx";
import ModalBaixarPlanilha from "@ButtonsGerenciador/ButtonBaixarPlanilha/ModalBaixarPlanilha.jsx";

import { validarCelula } from "@utils/validacao.js";

import { theme } from "@theme/theme.js";

import RenderFileUploadScreen from "./FileUploadScreen/RenderFileUploadScreen.jsx";

/**
 * @component
 * 
 * Componente responsável por carregar e exibir planilhas com funcionalidades de validação, remoção de colunas e linhas, 
 * e outros recursos de manipulação de dados.
 * Inclui modals com display: none carregado fora da tabela.
 * 
 * @param {Array} tableHeader - Cabeçalho da tabela.
 * @param {Function} setTableHeader - Função para atualizar o cabeçalho da tabela.
 * @param {Array} tableData - Dados da tabela.
 * @param {Function} setTableData - Função para atualizar os dados da tabela.
 * @param {boolean} isLoaded - Indica se a planilha foi carregada.
 * @param {Function} setIsLoaded - Função para alterar o estado de carregamento da planilha.
 * @param {boolean} isDownloadSheetOpen - Indica se o modal de download da planilha está aberto.
 * @param {Function} setIsDownloadSheetOpen - Função para alterar o estado do modal de download.
 * @param {string} firstSheetName - Nome da primeira planilha.
 * @param {string} workbookName - Nome do arquivo da planilha.
 * @param {any} selectedFile - Arquivo selecionado para upload.
 * @param {Function} setSelectedFile - Função para atualizar o arquivo selecionado.
 * @param {Function} setFirstSheetName - Função para atualizar o nome da primeira planilha.
 * @param {Function} setWorkbookName - Função para atualizar o nome do arquivo da planilha.
 * @param {boolean} removeRowsOpen - Indica se o modal de remoção de linhas está aberto.
 * @param {Function} setRemoveRowsOpen - Função para alterar o estado do modal de remoção de linhas.
 * @param {string} tipoPlanilha - Tipo de planilha.
 * 
 * @returns {JSX.Element} Retorna a tabela completa, junto com modais com display: none.
 */
function CarregaPlanilha({
    tableHeader, setTableHeader,
    tableData, setTableData,
    isLoaded, setIsLoaded,
    isDownloadSheetOpen, setIsDownloadSheetOpen,
    firstSheetName, workbookName,
    selectedFile, setSelectedFile,
    setFirstSheetName, setWorkbookName,
    removeRowsOpen, setRemoveRowsOpen,
    isDelColOpen, setDelColOpen,
    isLocalSubstOpen, setLocalSubstOpen,
    isTelOpen, setTelOpen,
    isValDataOpen, setIsValDataOpen,
    tipoPlanilha
}) {

    // Table
    const [columnIndexAtual, setColumnIndexAtual] = useState(null);
    const [selectedValueAtual, setSelectValueAtual] = useState('');

    // Cells
    const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
    const [isEditable, setEditable] = useState(false);

     /**
     * Função para executar validação nos dados da célula da tabela.
     * 
     * @param {string} selectValue - O valor selecionado para validação.
     * @param {number} columnIndex - Índice da coluna a ser validada.
     * @param {boolean} cb - Informação para validação de telefone.
     * @param {string} ddd - DDD do telefone.
     * @param {string} formatoOriginal - Formato original de uma data.
     * @param {string} formatoFinal - Formato desejado para data.
     */
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

    /**
     * Função para atualizar o valor de uma célula específica.
     * 
     * @param {number} rowIndex - Índice da linha.
     * @param {number} colIndex - Índice da coluna.
     * @param {Object} cellData - Os dados da célula a serem atualizados.
     */
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

    /**
     * Função para renderizar a tabela.
     * 
     * @returns {JSX.Element|null} - O JSX da tabela, ou null se não houver dados.
     */
    const renderTable = () => {
        if (!tableData || tableData.length === 0) return null;

        return (
            <>
                <table className="minha-tabela">
                    <thead>
                        <CarregaPlanilhaRenderHeader
                            tableData={tableData}
                            setTableData={setTableData}
                            tableHeader={tableHeader}
                            setTableHeader={setTableHeader}
                            executarValidacao={executarValidacao}
                            setDelColOpen={setDelColOpen}
                            setTelOpen={setTelOpen}
                            setIsValDataOpen={setIsValDataOpen}
                            setSelectValueAtual={setSelectValueAtual}
                            setLocalSubstOpen={setLocalSubstOpen}
                            setColumnIndexAtual={setColumnIndexAtual}
                            theme={theme}
                            tipoPlanilha={tipoPlanilha}
                        />
                    </thead>
                    <tbody>
                        <CarregaPlanilhaRenderBody
                            tableData={tableData}
                            setTableData={setTableData}
                            selectedCell={selectedCell}
                            setSelectedCell={setSelectedCell}
                            isEditable={isEditable}
                            setEditable={setEditable}
                            updateCellValue={updateCellValue}
                        />
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
                <ModalRemoveLinhas
                    removeRowsOpen={removeRowsOpen}
                    setRemoveRowsOpen={setRemoveRowsOpen}
                    tableData={tableData}
                    setTableData={setTableData}
                    tableHeader={tableHeader}
                    setTableHeader={setTableHeader}
                />
                <ModalBaixarPlanilha
                    tableData={tableData}
                    tableHeader={tableHeader}
                    isDownloadSheetOpen={isDownloadSheetOpen}
                    setIsDownloadSheetOpen={setIsDownloadSheetOpen}
                    firstSheetName={firstSheetName}
                    workbookName={workbookName}
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
    isDownloadSheetOpen: PropTypes.bool.isRequired,
    setIsDownloadSheetOpen: PropTypes.func.isRequired,
    firstSheetName: PropTypes.string.isRequired,
    workbookName: PropTypes.string.isRequired,
    selectedFile: PropTypes.any,
    setSelectedFile: PropTypes.func.isRequired,
    setFirstSheetName: PropTypes.func.isRequired,
    setWorkbookName: PropTypes.func.isRequired,
    removeRowsOpen: PropTypes.bool.isRequired,
    setRemoveRowsOpen: PropTypes.func.isRequired,
    isDelColOpen: PropTypes.bool.isRequired,
    setDelColOpen: PropTypes.func.isRequired,
    isLocalSubstOpen: PropTypes.bool.isRequired,
    setLocalSubstOpen: PropTypes.func.isRequired,
    isTelOpen: PropTypes.bool.isRequired,
    setTelOpen: PropTypes.func.isRequired,
    isValDataOpen: PropTypes.bool.isRequired,
    setIsValDataOpen: PropTypes.func.isRequired,
    tipoPlanilha: PropTypes.string.isRequired,
}