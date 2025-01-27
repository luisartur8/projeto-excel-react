import PropTypes from "prop-types";

// Biblioteca para manipulação de arquivos Excel.
import * as XLSX from "xlsx";

/**
 * @component
 * 
 * Componente ButtonBaixarPlanilha.
 *
 * Botão que, quando clicado, exporta os dados da tabela para um arquivo Excel (.xlsx).
 * O componente converte os dados da tabela (incluindo o cabeçalho) para uma planilha Excel e permite o download do arquivo.
 *
 * @param {Array} tableData - Dados da tabela a serem exportados. Deve ser uma matriz de objetos ou arrays que contêm os valores das células.
 * @param {Array} tableHeader - Cabeçalho da tabela. Deve ser uma matriz contendo os títulos das colunas.
 * @param {string} firstSheetName - Nome da primeira aba (sheet) do arquivo Excel.
 * @param {string} workbookName - Nome do arquivo Excel que será baixado.
 *
 * @returns {JSX.Element} O botão de exportação para Excel.
 */
function ButtonBaixarPlanilha({ tableData, tableHeader, firstSheetName, workbookName }) {

    /**
     * Função que exporta os dados da tabela para um arquivo Excel.
     * A função verifica se há dados na tabela, estrutura esses dados e gera um arquivo Excel para download.
     */
    function exportarParaExcel() {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

        // Pegar dados da tabela
        const data = tableData.map(row => {
            return row.map(cell => cell.value);
        });

        // Adicionar o select do header à planilha.
        data.unshift(tableHeader);

        // Cria planilha (Workbook)
        const workbook = XLSX.utils.book_new();
        // Cria a primeira aba da planilha com os dados.
        const worksheet = XLSX.utils.aoa_to_sheet(data);

        // Baixa a planilha.
        XLSX.utils.book_append_sheet(workbook, worksheet, firstSheetName);
        XLSX.writeFile(workbook, workbookName);
    }

    return (
        <button id="button-baixar-planilha" className="button-padrao" onClick={exportarParaExcel}>Baixar planilha</button>
    )

}

ButtonBaixarPlanilha.propTypes = {
    tableData: PropTypes.array.isRequired,
    tableHeader: PropTypes.array.isRequired,
    firstSheetName: PropTypes.string.isRequired,
    workbookName: PropTypes.string.isRequired
}

export default ButtonBaixarPlanilha;