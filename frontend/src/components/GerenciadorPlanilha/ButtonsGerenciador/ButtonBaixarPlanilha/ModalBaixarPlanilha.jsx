import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Biblioteca para manipulação de arquivos Excel.
import * as XLSX from "xlsx";

import { makeDraggable, centerModal } from "@DragModal/arrastarModais";
import './ModalBaixarPlanilha.css'

/**
 * @component
 * 
 * Componente ModalBaixarPlanilha.
 * 
 * Modal para baixar a tabela em diversos formatos de arquivo (xlsx, xls, csv, ods).
 * Permite ao usuário escolher o nome do arquivo e o formato desejado.
 * 
 * @param {Array} tableData - Dados da tabela que serão exportados.
 * @param {Array} tableHeader - Header da tabela que será exportado.
 * @param {boolean} isDownloadSheetOpen - Estado que controla a visibilidade do modal.
 * @param {function} setIsDownloadSheetOpen - Função para alterar o estado de visibilidade do modal.
 * @param {string} firstSheetName - Nome da primeira aba da planilha exportada.
 * @param {string} workbookName - Nome do arquivo original que foi carregado, usado para pré-definir o nome do arquivo de download.
 * 
 * @return {JSX.Element} Retorna um modal com configurações para exportar o arquivo para um Excel File.
 */
function ModalBaixarPlanilha({ tableData, tableHeader, isDownloadSheetOpen, setIsDownloadSheetOpen, firstSheetName, workbookName, tipoPlanilha }) {

    const [extensionSelectValue, setExtensionSelectValue] = useState('xlsx');
    const [inputNomeValue, setInputNomeValue] = useState('');
    const [extraInfo, setExtraInfo] = useState('ㅤ');

    /**
     * Effect que é executado ao abrir o modal. Define a extensão e o nome do arquivo com base no nome do workbook.
     * 
     * @param {boolean} isDownloadSheetOpen - Indica se o modal de download está aberto.
     * @param {string} workbookName - Nome do arquivo da planilha original.
     */
    useEffect(() => {
        if (isDownloadSheetOpen) {
            const extensionMap = {
                xls: 'xls',
                csv: 'csv',
                ods: 'ods',
                xlsx: 'xlsx'
            };

            const fileExtension = workbookName.split('.').pop().toLowerCase();
            setExtensionSelectValue(extensionMap[fileExtension] || 'xlsx');
            setInputNomeValue(splitByLastDot(workbookName)[0]);

            centerModal('#modalBaixarPlanilha');

            document.getElementById('modalBaixarPlanilha').focus();
        }
    }, [isDownloadSheetOpen, workbookName]);

    /**
     * Effect que verifica se o nome do arquivo digitado no input é válido.
     * O nome deve seguir os padrões de nomenclatura de arquivos.
     */
    useEffect(() => {
        // Caracteres que não podem terminar o nome do arquivo.
        const regex = /[ .\\/:*?"<>|]$/;
        const isInvalidEnd = regex.test(inputNomeValue);

        if (!isValidFileName(inputNomeValue) || inputNomeValue.startsWith('.') || isInvalidEnd) {
            setExtraInfo('Nome inválido!');
        } else {
            setExtraInfo('ㅤ');
        }
    }, [inputNomeValue])

    /**
     * Torna o modal arrastável.
     */
    useEffect(() => {
        makeDraggable("#modalBaixarPlanilha", ".dragHandle");
    }, []);

    /**
     * Valida se o nome do arquivo contém apenas caracteres alfanuméricos, hífens ou underscores.
     * 
     * @param {string} fileName - O nome do arquivo a ser validado, sem a extensão.
     * @returns {boolean} - Retorna true se o nome for válido, caso contrário, false.
     */
    const isValidFileName = (fileName) => {
        const regex = /^[a-zA-Z0-9-_ .,()&+=]+$/;
        return regex.test(fileName);
    };

    /**
     * Separa uma string em um array de acordo com o "." (ponto).
     * 
     * @param {string} str - String que será separada.
     * @returns {Array} - Retorna um array com os dados separados da string.
     */
    function splitByLastDot(str) {
        // Encontrar o índice do último ponto.
        const lastDotIndex = str.lastIndexOf('.');

        // Se houver um ponto, divide a string em duas partes.
        if (lastDotIndex !== -1) {
            return [str.slice(0, lastDotIndex), str.slice(lastDotIndex + 1)];
        }

        // Se não houver ponto, retorna a string inteira como o primeiro elemento do array.
        return [str];
    }

    /**
     * Função chamada ao alterar o valor do input de nome do arquivo.
     * Atualiza o estado de 'inputNomeValue' com o novo valor digitado.
     * 
     * @param {Object} e - O evento de alteração do input.
     * @param {string} e.target.value - O valor do nome do arquivo digitado pelo usuário.
     * @param {Function} setInputNomeValue - Atualiza o valor atual do input.
     */
    function handleInputNome(e) {
        setInputNomeValue(e.target.value);
    }

    /**
     * Função chamada ao alterar a extensão do arquivo no select.
     * Atualiza o estado de 'extensionSelectValue' com a nova extensão selecionada.
     * 
     * @param {Object} e - O evento de alteração do select.
     * @param {string} e.target.value - A extensão selecionada pelo usuário.
     * @param {Function} setExtensionSelectValue - Atualiza o valor atual do select.
     */
    function handleExtensionChange(e) {
        setExtensionSelectValue(e.target.value);
    }

    /**
     * Função chamada para fechar o modal.
     * Altera o estado 'setIsDownloadSheetOpen' para false para esconder o modal.
     */
    function btnCloseDownload() {
        setIsDownloadSheetOpen(false);
    }

    /**
     * Função que exporta os dados da tabela para um arquivo Excel.
     * A função verifica se há dados na tabela, estrutura esses dados e gera um arquivo Excel para download.
     * 
     * @throws {Error} Se a tabela estiver vazia ou o nome do arquivo for inválido, o download não será realizado.
     */
    function exportarParaExcel() {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

        // Se o nome for inválido, não exportar.
        if (extraInfo !== 'ㅤ') {
            return;
        }

        const completeFileName = `${inputNomeValue.trim()}.${extensionSelectValue}`;
        const data = tableData.map(row => row.map(cell => cell.value));

        let sheetHeader = tableHeader;

        if (tipoPlanilha === 'lancamento') {
            sheetHeader = tableHeader.map(head => {
                if (head === 'nome') return 'cliente_nome';
                if (head === 'telefone') return 'cliente_telefone';
                if (head === 'cpf_cnpj') return 'cliente_cpf_cnpj';
                return head
            })
        }

        data.unshift(sheetHeader);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Baixa a planilha.
        XLSX.utils.book_append_sheet(workbook, worksheet, firstSheetName);
        XLSX.writeFile(workbook, completeFileName);

        setIsDownloadSheetOpen(false);
    }

    /**
     * Lida com a tecla pressionada no modal.
     * Baixa a planilha ao pressionar 'Enter'.
     * ou fecha o modal ao pressionar 'Escape'.
     * 
     * @param {KeyboardEvent} e - Evento da tecla pressionada.
     * 
     * @returns {void} Não retorna nada, apenas executa uma ação baseada na tecla pressionada.
     */
    const actionsByKeyPress = (e) => {
        if (e.key === 'Enter') {
            exportarParaExcel();
        } else if (e.key === 'Escape') {
            btnCloseDownload();
        }
    };

    return (
        <div id="modalBaixarPlanilha" tabIndex="-1" onKeyDown={actionsByKeyPress} style={{ display: isDownloadSheetOpen ? "flex" : "none" }}>
            <div className="modalHeaderBaixarPlanilhaConteudo draggable-modal">
                <div className="modalHeaderBaixarPlanilha dragHandle">
                    <p>Baixar planilha</p>
                    <span onClick={btnCloseDownload}>X</span>
                </div>
                <div className="operacoesModalDownload">
                    <div className="personalizacaoDownloadInputs">
                        <input type="text" placeholder="Nome da planilha" value={inputNomeValue} onChange={handleInputNome} />
                        <select value={extensionSelectValue} onChange={handleExtensionChange}>
                            <option value="xlsx">.xlsx ▼</option>
                            <option value="xls">.xls ▼</option>
                            <option value="csv">.csv ▼</option>
                            <option value="ods">.ods ▼</option>
                        </select>
                    </div>
                    <div className="extraInfoDiv">{extraInfo}</div>
                    <div className="downloadModalAgrupaButton">
                        <button className="modalButtonCancelaDownload" onClick={btnCloseDownload}>Cancelar</button>
                        <button className="modalButtonDownload" onClick={exportarParaExcel}>Baixar</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

ModalBaixarPlanilha.propTypes = {
    tableData: PropTypes.array.isRequired,
    tableHeader: PropTypes.array.isRequired,
    isDownloadSheetOpen: PropTypes.bool.isRequired,
    setIsDownloadSheetOpen: PropTypes.func.isRequired,
    firstSheetName: PropTypes.string,
    workbookName: PropTypes.string,
    tipoPlanilha: PropTypes.string.isRequired,
}

export default ModalBaixarPlanilha;