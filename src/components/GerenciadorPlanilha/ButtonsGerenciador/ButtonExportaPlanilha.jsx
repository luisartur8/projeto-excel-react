import PropTypes from "prop-types";

/**
 * @component
 * 
 * Componente ButtonExportaPlanilha.
 *
 * Botão que, quando clicado, executa a ação de exportação dos dados da tabela.
 * No momento, o componente apenas exibe os dados da tabela no console e apresenta um alerta indicando que a exportação seria realizada.
 *
 * @param {Array} tableData - Dados da tabela a serem exportados. Deve ser um array contendo os dados da tabela. [[col1, col2, col3][col1, col2, col3]]
 *
 * @returns {JSX.Element} Retorna o botão de exportação de planilha.
 */
function ButtonExportaPlanilha({ tableData }) {

    /**
     * Função que executa a exportação dos dados da tabela.
     * No momento, apenas exibe os dados no console e um alerta informando que a exportação seria realizada.
     */
    function exportSheet() {
        if (!tableData || tableData.length === 0) {
            alert('Nenhuma tabela disponível');
            return;
        }

        alert('Exportar para o sistema!');
    }

    return (
        <button className="button-padrao" onClick={exportSheet}>Exportar planilha</button>
    )

}

ButtonExportaPlanilha.propTypes = {
    tableData: PropTypes.array.isRequired
}

export default ButtonExportaPlanilha;